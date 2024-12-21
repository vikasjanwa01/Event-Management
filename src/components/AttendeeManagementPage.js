import React, { useState, useEffect } from 'react';
import axios from '../axiosConfig';

const AttendeeManagement = () => {
  const [attendees, setAttendees] = useState([]);
  const [newAttendee, setNewAttendee] = useState({
    name: '',
    email: '',
    eventId: '',
    task_name: "",
    task_deadline: "",
    task_status: "pending",
  });
  const [events, setEvents] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchAttendees();
    fetchEvents();
  }, []);

  const fetchAttendees = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/attendees');
      setAttendees(response.data);
    } catch (error) {
      setMessage('Error fetching attendees');
    } finally {
      setLoading(false);
    }
  };

  const fetchEvents = async () => {
    try {
      const response = await axios.get('/events');
      setEvents(response.data);
    } catch (error) {
      setMessage('Error fetching events');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAttendee({ ...newAttendee, [name]: value });
  };

  const validateForm = () => {
    const errors = {};
    if (!newAttendee.name) errors.name = 'Name is required';
    if (!newAttendee.email) errors.email = 'Email is required';
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAddAttendee = async () => {
    if (!validateForm()) return;
    setLoading(true);
    try {
      await axios.post('/attendees', newAttendee);
      fetchAttendees();
      setMessage('Attendee added successfully and email sent');
      setNewAttendee({ name: '', email: '', eventId: '', task_name: "", task_deadline: "", task_status: "pending" });
    } catch (error) {
      setMessage('Error adding attendee');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAttendee = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`/attendees/${id}`);
      fetchAttendees();
      setMessage('Attendee deleted successfully');
    } catch (error) {
      setMessage('Error deleting attendee');
    } finally {
      setLoading(false);
    }
  };

  const handleAssignToEvent = async (attendeeId, eventId) => {
    setLoading(true);
    const event_name = events.find(event => event._id === eventId).name;
    try {
      await axios.put(`/attendees/${attendeeId}`, { eventId, event_name });
      fetchAttendees();
      setMessage('Attendee assigned to event successfully');
    } catch (error) {
      setMessage('Error assigning attendee to event');
    } finally {
      setLoading(false);
    }
  };

  const handleAssignToTask = async (attendeeId, task_name, task_deadline, task_status) => {
    setLoading(true);
    try {
      const task = { task_name, task_deadline, task_status };
      const response = await axios.put(`/attendees/task/${attendeeId}`, task);
      console.log(response.data);
      fetchAttendees();
      setMessage('Task assigned to attendee successfully');
    } catch (error) {
      setMessage('Error assigning task to attendee');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Attendee Management</h1>
      {message && <p>{message}</p>}
      <input type="text" name="name" placeholder="Name" value={newAttendee.name} onChange={handleInputChange} />
      {errors.name && <p>{errors.name}</p>}
      <input type="email" name="email" placeholder="Email" value={newAttendee.email} onChange={handleInputChange} />
      {errors.email && <p>{errors.email}</p>}
      <button onClick={handleAddAttendee} disabled={loading}>Add Attendee</button>
      {loading && <p>Loading...</p>}
      <ul>
        {attendees.map(attendee => (
          <li key={attendee._id}>
            <p>
              <strong>{attendee.name}</strong> - {attendee.email}
              <br />
              Event: {attendee.event ? attendee.event_name : 'No Event'}
              <br />
              Task: {attendee.task_name || 'No Task Assigned'} (Deadline: {attendee.task_deadline || 'N/A'}, Status: {attendee.task_status})
            </p>
            <button onClick={() => handleDeleteAttendee(attendee._id)} disabled={loading}>Delete</button>
            <div>
              <select
                onChange={(e) =>
                  setNewAttendee({ ...newAttendee, eventId: e.target.value })
                }
              >
                <option value="">Select Event</option>
                {events.map((event) => (
                  <option key={event._id} value={event._id}>
                    {event.name}
                  </option>
                ))}
              </select>
              <button
                onClick={() => handleAssignToEvent(attendee._id, newAttendee.eventId)}
                disabled={!newAttendee.eventId || loading}
              >
                Assign Event
              </button>
            </div>
            <div>
              <input
                type="text"
                name="task_name"
                placeholder="Task Name"
                value={newAttendee.task_name}
                onChange={handleInputChange}
              />
              <input
                type="date"
                name="task_deadline"
                placeholder="Task Deadline"
                value={newAttendee.task_deadline}
                onChange={handleInputChange}
              />
              <button
                onClick={() => handleAssignToTask(
                  attendee._id,
                  newAttendee.task_name,
                  newAttendee.task_deadline,
                  newAttendee.task_status
                )}
                disabled={loading}
              >
                Assign Task
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AttendeeManagement;