const express = require('express');
const CarController = require('../controllers/CarController');

const router = express.Router();

router.get('/cars', CarController.index);
router.get('/create', CarController.create);
router.post('/create', CarController.store);
router.get('/cars/edit/:id', CarController.edit);
router.post('/cars/edit/:id', CarController.update);
router.post('/cars/delete', CarController.destroy);

module.exports = router;