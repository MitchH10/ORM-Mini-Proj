const router = require('express').Router();
const travellerRoutes = require('./travellerRoutes');
const locationRoutes = require('./locationRoutes');
const tripRoutes = require('./tripRoutes');

router.use('/travllers', travellerRoutes);
router.use('/locations', locationRoutes);
router.use('/trips', tripRoutes);

module.exports = router;