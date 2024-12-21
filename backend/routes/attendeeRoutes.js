const express = require('express');
const attendeeController = require('../controllers/attendeeController');

const router = express.Router();

router.post('/', attendeeController.addAttendee);
router.get('/', attendeeController.getAllAttendees);
router.get('/:id', attendeeController.getAttendees);
router.delete('/:id', attendeeController.deleteAttendee);
router.put('/:id', attendeeController.updateAttendee); // Ensure this line is present
router.put('/task/:id', attendeeController.addTask); // Ensure this line is present

module.exports = router;