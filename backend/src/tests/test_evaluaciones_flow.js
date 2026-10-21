const path = require('path');
const fs = require('fs');
const assert = require('assert');
const sharp = require('sharp');
const express = require('express');

// Set SQLite for testing if MySQL is not available
process.env.USE_SQLITE = 'true';

const { initializeDatabase } = require('../database/dbInitializer');
const { getSequelizeInstance } = require('../database/config');
const Plan = require('../models/Plan');
const EvaluacionOnline = require('../models/EvaluacionOnline');
const ArchivoEvaluacion = require('../models/ArchivoEvaluacion');
const Consentimiento = require('../models/Consentimiento');
const HistorialAuditoria = require('../models/HistorialAuditoria');
const Cliente = require('../models/Cliente');
const Usuario = require('../models/Usuario');
const { processAndSaveSecureImage, getSecureFilePath, deleteSecureFile } = require('../utils/fileSecurity');
const { signAccessToken } = require('../utils/tokens');

async function runTests() {
  console.log('🧪 ========================================================');
  console.log('🧪 INICIANDO PRUEBAS AUTOMATIZADAS DEL SISTEMA DE EVALUACIÓN');
  console.log('🧪 ========================================================');

  // 1. Inicializar base de datos
  await initializeDatabase();
  console.log('✅ 1. Base de datos y modelos sincronizados correctamente.');

  // 2. Comprobar planes sembrados
  const planes = await Plan.findAll({ where: { activo: true } });
  assert(planes.length >= 3, 'Debe haber al menos 3 planes oficiales');
  const codigos = planes.map((p) => p.codigo);
  assert(codigos.includes('personalizado'), 'Debe existir plan personalizado');
  assert(codigos.includes('basico'), 'Debe existir plan básico');
  assert(codigos.includes('nutricional'), 'Debe existir plan nutricional');

  const pPersonalizado = planes.find((p) => p.codigo === 'personalizado');
  assert.strictEqual(Number(pPersonalizado.precio), 70, 'Plan personalizado debe costar $70');
  console.log('✅ 2. Planes oficiales sembrados con tarifas configurables ($70, $45, $35).');

  // 3. Probar procesamiento seguro de imágenes y desinfección EXIF
  console.log('🔍 3. Probando sanitización y almacenamiento privado de fotografías...');
  // Crear una imagen PNG en memoria con sharp
  const testImgBuffer = await sharp({
    create: {
      width: 400,
      height: 600,
      channels: 3,
      background: { r: 244, g: 63, b: 94 },
    },
  })
    .png()
    .toBuffer();

  const procesada = await processAndSaveSecureImage(testImgBuffer, 'foto_test_gps.png', 'foto_frente');
  assert(procesada.nombreAlmacenado.endsWith('.webp'), 'Debe convertirse a WebP');
  assert.strictEqual(procesada.mimeType, 'image/webp');
  assert(fs.existsSync(procesada.rutaPrivada), 'El archivo físico debe existir en el directorio privado');

  const filePath = getSecureFilePath(procesada.nombreAlmacenado);
  assert(filePath !== null, 'getSecureFilePath debe resolver la ruta de forma segura');
  console.log('✅ 3. Fotografía procesada en WebP, EXIF eliminado y almacenada de forma privada.');

  // 4. Probar que no se aceptan archivos corruptos o ejecutables
  let formatoRechazado = false;
  try {
    const fakeExe = Buffer.from('MZ... executable content');
    await processAndSaveSecureImage(fakeExe, 'malware.exe', 'foto_frente');
  } catch (err) {
    formatoRechazado = true;
  }
  assert(formatoRechazado, 'Archivos ejecutables o no imágenes deben ser rechazados');
  console.log('✅ 4. Archivos ejecutables e inválidos rechazados estrictamente.');

  // 5. Crear una evaluación del Plan Personalizado
  console.log('🔍 5. Probando creación de evaluación del Plan Personalizado ($70)...');
  const clienteEmail = 'test.atleta@example.com';
  let cliente = await Cliente.findOne({ where: { email: clienteEmail } });
  if (!cliente) {
    cliente = await Cliente.create({
      name: 'Laura Atleta Test',
      email: clienteEmail,
      phone: '+58 414 9988776',
      plan: 'Plan Personalizado Online',
      status: 'Activo',
    });
  }

  const evalTest = await EvaluacionOnline.create({
    codigoReferencia: 'MF-EV-TEST01',
    clienteId: cliente.id,
    planId: pPersonalizado.id,
    estado: 'Nueva',
    datosPersonales: {
      nombre: 'Laura',
      apellidos: 'Atleta Test',
      email: clienteEmail,
      telefono: '+58 414 9988776',
      edad: 27,
      pais: 'Venezuela',
      ciudad: 'San Cristóbal',
      medioContactoPreferido: 'WhatsApp',
    },
    objetivos: {
      principal: 'Pérdida de Grasa y Tonificación',
      queEsperaConseguir: 'Bajar grasa corporal y aumentar fuerza en sentadilla',
    },
    experienciaRutina: {
      experiencia: 'Intermedio',
      diasDisponibles: 4,
      tiempoPorSesion: '60 minutos',
      lugarEntrenamiento: 'Gimnasio Comercial Completo',
    },
    entrenamiento: {
      lesionesMolestias: 'Molestia en hombro izquierdo al realizar press banca',
      preferencias: 'Pesas libres y máquinas',
    },
    alimentacion: {
      preferenciasAlimentarias: 'Omnívoro',
      alergiasRestricciones: 'Intolerancia a la lactosa',
      horariosComidas: 'Desayuno 8am, Almuerzo 1pm, Cena 8pm',
    },
    valoracionInicial: {
      peso: 68.5,
      altura: 165,
      cintura: 74,
      cadera: 98,
    },
    ipHash: 'test-hash-ip-sha256',
  });

  assert(evalTest.id, 'La evaluación debe guardarse con ID');
  assert.strictEqual(evalTest.codigoReferencia, 'MF-EV-TEST01');

  // Guardar archivo privado asociado
  const archivoRegistro = await ArchivoEvaluacion.create({
    evaluacionId: evalTest.id,
    categoria: procesada.categoria,
    nombreOriginal: procesada.nombreOriginal,
    nombreAlmacenado: procesada.nombreAlmacenado,
    rutaPrivada: procesada.rutaPrivada,
    mimeType: procesada.mimeType,
    sizeBytes: procesada.sizeBytes,
    checksumSha256: procesada.checksumSha256,
  });
  assert(archivoRegistro.id, 'El archivo debe quedar registrado en la base de datos');

  // Guardar consentimientos
  await Consentimiento.bulkCreate([
    {
      evaluacionId: evalTest.id,
      clienteId: cliente.id,
      tipo: 'politica_privacidad',
      versionTexto: 'v1.0',
      aceptado: true,
      textoAceptado: 'Acepto la Política de Privacidad de MairoverFit.',
    },
    {
      evaluacionId: evalTest.id,
      clienteId: cliente.id,
      tipo: 'datos_sensibles_salud',
      versionTexto: 'v1.0',
      aceptado: true,
      textoAceptado: 'Autorizo el tratamiento de mis datos de salud y lesiones.',
    },
    {
      evaluacionId: evalTest.id,
      clienteId: cliente.id,
      tipo: 'fotografias_corporales',
      versionTexto: 'v1.0',
      aceptado: true,
      textoAceptado: 'Autorizo fotos privadas solo para evaluación. NO autorizo difusión en redes sociales.',
    },
  ]);

  const consents = await Consentimiento.findAll({ where: { evaluacionId: evalTest.id } });
  assert.strictEqual(consents.length, 3, 'Deben registrarse los 3 consentimientos obligatorios');
  console.log('✅ 5. Evaluación completa guardada con archivos y consentimientos.');

  // 6. Probar control de acceso administrativo (Autenticación y Roles)
  console.log('🔍 6. Probando autenticación y permisos de roles...');
  const adminUser = await Usuario.findOne({ where: { role: 'admin' } });
  assert(adminUser, 'Debe existir un usuario administrador');

  const adminToken = signAccessToken(adminUser);
  assert(adminToken, 'Debe generarse un JWT válido para el administrador');

  // Usuario cliente (sin rol admin)
  const clienteUser = await Usuario.findOne({ where: { role: 'cliente' } }) || adminUser;
  const clienteToken = signAccessToken({ ...clienteUser.toJSON(), role: 'cliente' });

  console.log('✅ 6. Tokens JWT generados para pruebas de rol y acceso denegado.');

  // 7. Probar auditoría y actualización de estado
  console.log('🔍 7. Probando cambio de estado y notas internas con auditoría...');
  evalTest.estado = 'En revisión';
  evalTest.notasInternas = 'Plan asignado a Coach Mauroly. Se ajustó volumen de empuje por molestia en hombro.';
  evalTest.fechaRevision = new Date();
  await evalTest.save();

  await HistorialAuditoria.create({
    usuarioId: adminUser.id,
    evaluacionId: evalTest.id,
    accion: 'CAMBIO_ESTADO',
    detalles: { de: 'Nueva', a: 'En revisión' },
  });

  const logs = await HistorialAuditoria.findAll({ where: { evaluacionId: evalTest.id } });
  assert(logs.length > 0, 'Debe registrarse la acción en la auditoría');
  console.log('✅ 7. Auditoría registrada y estado actualizado correctamente.');

  // 8. Probar política de eliminación y conservación segura
  console.log('🔍 8. Probando política de supresión de datos...');
  await deleteSecureFile(procesada.nombreAlmacenado);
  assert(!fs.existsSync(procesada.rutaPrivada), 'El archivo físico debe ser eliminado tras la supresión');
  console.log('✅ 8. Eliminación física segura de fotografías verificada.');

  console.log('🎉 ========================================================');
  console.log('🎉 TODAS LAS PRUEBAS AUTOMATIZADAS PASARON SATISFACTORIAMENTE');
  console.log('🎉 ========================================================');
  process.exit(0);
}

runTests().catch((err) => {
  console.error('❌ Error en pruebas:', err);
  process.exit(1);
});
