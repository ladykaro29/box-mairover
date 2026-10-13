const Contacto = require('../models/Contacto');

// POST /api/v1/contactos (Público)
exports.createContacto = async (req, res, next) => {
  try {
    const { nombre, telefono, email, servicio, objetivo, mensaje } = req.body;

    if (!nombre || !telefono || !email) {
      return res.status(400).json({
        success: false,
        message: 'Nombre, teléfono y correo electrónico son requeridos.',
      });
    }

    const nuevoContacto = await Contacto.create({
      nombre,
      telefono,
      email,
      servicio: servicio || null,
      objetivo: objetivo || null,
      mensaje: mensaje || null,
    });

    res.status(201).json({
      success: true,
      message: '¡Gracias por contactarnos! Te responderemos muy pronto.',
      data: nuevoContacto,
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/v1/admin/contactos (Admin protegido)
exports.getContactos = async (req, res, next) => {
  try {
    const contactos = await Contacto.findAll({
      order: [['createdAt', 'DESC']],
    });

    res.json({
      success: true,
      data: contactos,
    });
  } catch (error) {
    next(error);
  }
};

// PUT /api/v1/admin/contactos/:id (Admin protegido)
exports.updateContactoStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const contacto = await Contacto.findByPk(id);
    if (!contacto) {
      return res.status(404).json({ success: false, message: 'Contacto no encontrado.' });
    }

    if (status) {
      contacto.status = status;
      await contacto.save();
    }

    res.json({
      success: true,
      message: 'Estado de contacto actualizado.',
      data: contacto,
    });
  } catch (error) {
    next(error);
  }
};
