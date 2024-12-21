const mongoose = require('mongoose');

const attendeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: false},
  event_name: { type: String, required: false },
  task_name: { type: String, required: false },
  task_deadline: { type: Date, required: false },
  task_status: { type: String, enum: ['pending', 'in-progress', 'completed', 'canceled'], default:"pending", required: false },
});

module.exports = mongoose.model('Attendee', attendeeSchema);