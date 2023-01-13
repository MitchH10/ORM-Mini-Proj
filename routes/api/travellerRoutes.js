const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Traveller, Location, Trip } = require('../../models');

// GET all travellers
router.get('/', async (req, res) => {
  try {
    const travellerData = await Traveller.findAll({
      include: [{ model: Trip }, { model: Location }],
      // TODO: Add a sequelize literal to get a count of short books
      attributes: {
        include: [
          [
            sequelize.literal(
              '(SELECT COUNT(id) FROM location)'
            ),
            'totalLocations',
          ],
        ],
      },
    });
    res.status(200).json(travellerData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a single reader
router.get('/:id', async (req, res) => {
  try {
    const travellerData = await Traveller.findByPk(req.params.id, {
      include: [{ model: Trip }, { model: Location }],
      // TODO: Add a sequelize literal to get a count of short books
      attributes: {
        include: [
          [
            sequelize.literal(
              '(SELECT COUNT(id) FROM location)'
            ),
            'totalLocations',
          ],
        ],
      },
    });

    if (!travellerData) {
      res.status(404).json({ message: 'No reader found with that id!' });
      return;
    }

    res.status(200).json(travellerData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE a reader
router.post('/', async (req, res) => {
  try {
    const travellerData = await Traveller.create(req.body);
    res.status(200).json(travellerData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// DELETE a reader
router.delete('/:id', async (req, res) => {
  try {
    const travellerData = await Traveller.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!travellerData) {
      res.status(404).json({ message: 'No reader found with that id!' });
      return;
    }

    res.status(200).json(travellerData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
