const express = require('express');
const eventController = require('../controllers/eventController');

const router = express.Router();

router.post('/', eventController.createEvent);
router.get('/', eventController.getAllEvents);
router.put('/:id', eventController.updateEvent);
router.delete('/:id', eventController.deleteEvent);
router.get('/task/:eventId', eventController.getTasksByEvent);

module.exports = router;