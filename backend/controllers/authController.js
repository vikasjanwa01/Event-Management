const Attendee = require('../models/attendeeModel');

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const attendee = await Attendee.findOne({ email, password });
    res.status(200).json(attendee);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};