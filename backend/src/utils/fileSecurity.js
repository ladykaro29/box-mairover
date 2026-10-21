const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const sharp = require('sharp');

// Directorio privado donde se almacenan las fotografías de evaluación
// Por defecto se encuentra fuera de frontend/dist y no tiene rutas públicas estáticas
const STORAGE_DIR = process.env.PRIVATE_UPLOADS_DIR
  ? path.resolve(process.env.PRIVATE_UPLOADS_DIR)
  : path.resolve(__dirname, '../../storage/evaluaciones_privadas');

// Asegurar existencia del directorio con permisos restringidos
if (!fs.existsSync(STORAGE_DIR)) {
  fs.mkdirSync(STORAGE_DIR, { recursive: true });
}

// Genera un hash anónimo de IP para prevención de abusos sin guardar la IP en texto claro
function hashIp(ip) {
  if (!ip) return null;
  const salt = process.env.JWT_SECRET || 'mairoverfit-ip-salt-2026';
  return crypto.createHmac('sha256', salt).update(String(ip).trim()).digest('hex');
}

// Genera un código de referencia no predecible para la evaluación (ej: MF-EV-7A9B2K)
function generateReferenceCode() {
  const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
  let rand = '';
  const bytes = crypto.randomBytes(6);
  for (let i = 0; i < 6; i++) {
    rand += chars[bytes[i] % chars.length];
  }
  return `MF-EV-${rand}`;
}

/**
 * Valida, remueve metadatos EXIF (GPS, cámara, etc.), optimiza y guarda la imagen de forma privada.
 * @param {Buffer} buffer - Buffer de la imagen recibido en memoria
 * @param {string} originalName - Nombre original del archivo proporcionado por el cliente
 * @param {string} categoria - 'foto_frente' | 'foto_perfil' | 'foto_espalda' | 'foto_extra'
 * @returns {Promise<object>} Metadatos de la imagen almacenada
 */
async function processAndSaveSecureImage(buffer, originalName, categoria = 'foto_frente') {
  if (!buffer || buffer.length === 0) {
    throw new Error('El archivo está vacío.');
  }

  // Límite de tamaño: 10MB máximo
  const MAX_SIZE = 10 * 1024 * 1024;
  if (buffer.length > MAX_SIZE) {
    throw new Error('El archivo excede el límite de 10 MB.');
  }

  // Validar con Sharp analizando los metadatos internos (no fiarse de la extensión)
  const image = sharp(buffer);
  const metadata = await image.metadata();

  const allowedFormats = ['jpeg', 'jpg', 'png', 'webp'];
  if (!metadata.format || !allowedFormats.includes(metadata.format.toLowerCase())) {
    throw new Error('Formato no permitido. Solo se aceptan imágenes JPEG, PNG o WebP.');
  }

  // Generar nombre de almacenamiento aleatorio (UUID + timestamp) para prevenir colisiones y enumeración
  const randomId = crypto.randomUUID();
  const storedFileName = `${Date.now()}-${randomId}.webp`;
  const targetPath = path.join(STORAGE_DIR, storedFileName);

  // Procesamiento seguro:
  // 1. .rotate() orienta automáticamente según EXIF antes de limpiarlo.
  // 2. Redimensionar si supera 2400px en ancho/alto para ahorrar espacio y optimizar carga del admin.
  // 3. Convertir a WebP sin EXIF ni datos de ubicación.
  const processedBuffer = await image
    .rotate()
    .resize({
      width: 2400,
      height: 2400,
      fit: sharp.fit.inside,
      withoutEnlargement: true,
    })
    .webp({ quality: 85, effort: 4 })
    .toBuffer();

  // Guardar en el directorio privado
  await fs.promises.writeFile(targetPath, processedBuffer);

  // Calcular checksum SHA-256 para integridad
  const checksum = crypto.createHash('sha256').update(processedBuffer).digest('hex');
  const processedMeta = await sharp(processedBuffer).metadata();

  return {
    nombreOriginal: path.basename(originalName).slice(0, 250),
    nombreAlmacenado: storedFileName,
    rutaPrivada: targetPath,
    mimeType: 'image/webp',
    sizeBytes: processedBuffer.length,
    checksumSha256: checksum,
    ancho: processedMeta.width || null,
    alto: processedMeta.height || null,
    categoria,
  };
}

/**
 * Obtiene la ruta física segura de un archivo, con protección estricta contra Path Traversal
 */
function getSecureFilePath(storedFileName) {
  if (!storedFileName || typeof storedFileName !== 'string') return null;

  // Sanitizar el nombre para que sea solo el nombre base sin ../ ni barras
  const safeBaseName = path.basename(storedFileName);
  const fullPath = path.resolve(STORAGE_DIR, safeBaseName);

  // Verificar que la ruta resultante esté estrictamente contenida dentro de STORAGE_DIR
  if (!fullPath.startsWith(STORAGE_DIR)) {
    throw new Error('Acceso no autorizado: intento de path traversal detectado.');
  }

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  return fullPath;
}

/**
 * Elimina un archivo físico de forma segura
 */
async function deleteSecureFile(storedFileName) {
  try {
    const fullPath = getSecureFilePath(storedFileName);
    if (fullPath && fs.existsSync(fullPath)) {
      await fs.promises.unlink(fullPath);
      return true;
    }
  } catch (err) {
    console.error('Error al eliminar archivo privado:', err);
  }
  return false;
}

module.exports = {
  STORAGE_DIR,
  hashIp,
  generateReferenceCode,
  processAndSaveSecureImage,
  getSecureFilePath,
  deleteSecureFile,
};
