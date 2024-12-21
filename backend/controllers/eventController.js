const Event = require('../models/eventModel');
const Attendee = require('../models/attendeeModel');
const attendeeModel = require('../models/attendeeModel');

exports.createEvent = async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(event);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);

    if (!deletedEvent) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.status(200).json(deletedEvent);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getTasksByEvent = async (req, res) => {
  try {
    const attendees = await attendeeModel.find({ event: req.params.eventId });

    // Extract task details for each attendee
    const tasks = attendees.map(attendee => ({
      name: attendee.name,
      task_name: attendee.task_name,
      task_deadline: attendee.task_deadline,
      task_status: attendee.task_status,
    }));

    res.status(200).json(tasks);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
