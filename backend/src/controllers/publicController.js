const Clase = require('../models/Clase');

// GET /api/v1/horarios (Público)
exports.getPublicHorarios = async (req, res, next) => {
  try {
    const { day } = req.query;
    const where = {};

    if (day && day !== 'all') {
      where.day = day;
    }

    const clases = await Clase.findAll({
      where,
      order: [['time', 'ASC']],
    });

    res.json({
      success: true,
      data: clases,
    });
  } catch (error) {
    next(error);
  }
};
