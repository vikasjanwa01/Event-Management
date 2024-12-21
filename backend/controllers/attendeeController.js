const Attendee = require('../models/attendeeModel');
const axios = require('axios');
require('dotenv').config();

const mail_service_uri = process.env.MAIL_SERVICE_URI;
const mail_service_psw = process.env.MAIL_SERVICE_PSW;

const generatePassword = () => {
  const length = 8;
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let password = '';
  for (let i = 0; i < length; i++) {
    const at = Math.floor(Math.random() * charset.length);
    password += charset.charAt(at);
  }
  return password;
}

exports.addAttendee = async (req, res) => {
  try {
    const password = generatePassword();
    const attendee = new Attendee({...req.body, password});
    await attendee.save();
    const response = await axios.post(mail_service_uri, {psw: mail_service_psw, mail: attendee.email, service_name: "Event Management System", "otp": password});
    console.log(response)
    if(response.status !== 200) {
      res.status(401).json("Email not sent");
    }
    res.status(201).json("Attendee added successfully");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllAttendees = async (req, res) => {
  try {
    const attendees = await Attendee.find();
    res.status(200).json(attendees);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAttendees = async (req, res) => {
  try {
    const attendees = await Attendee.findById(req.params.id);
    res.status(200).json(attendees);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteAttendee = async (req, res) => {
  try {
    await Attendee.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateAttendee = async (req, res) => {
  const { id } = req.params;
  const { eventId,event_name, task } = req.body; // Access eventId and task from request body

  try {
    const updateData = {};
    if (eventId) updateData.event = eventId;
    if (event_name) updateData.event_name = event_name;
    if (task) updateData.task = task;

    const attendee = await Attendee.findByIdAndUpdate(id, updateData, { new: true });
    if (!attendee) {
      return res.status(404).json({ error: 'Attendee not found' });
    }
    res.status(200).json(attendee);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.addTask = async (req, res) => {
  const { id } = req.params;
  console.log(req.body)

  try {

    const attendee = await Attendee.findByIdAndUpdate(id, req.body, { new: true });
    if (!attendee) {
      return res.status(404).json({ error: 'Attendee not found' });
    }
    res.status(200).json(attendee);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};