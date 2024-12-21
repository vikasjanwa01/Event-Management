import React, { useState, useEffect } from 'react';
import axios from '../axiosConfig';
import { Link } from 'react-router-dom';

const EventManagementPage = ({taskDetail}) => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    name: '',
    description: '',
    location: '',
    date: ''
  });
  const [editingEvent, setEditingEvent] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = () => {
    axios.get('/events')
      .then(response => setEvents(response.data))
      .catch(error => console.error('Error fetching events:', error));
  };

  const handleChange = (e) => {
    setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingEvent) {
      axios.put(`/events/${editingEvent._id}`, newEvent)
        .then(() => {
          fetchEvents();
          setNewEvent({ name: '', description: '', location: '', date: '' });
          setEditingEvent(null);
        })
        .catch(error => console.error('Error updating event:', error));
    } else {
      axios.post('/events', newEvent)
        .then(response => {
          setEvents([...events, response.data]);
          setNewEvent({ name: '', description: '', location: '', date: '' });
        })
        .catch(error => console.error('Error creating event:', error));
    }
  };

  const handleEdit = (event) => {
    setNewEvent(event);
    setEditingEvent(event);
  };

  const handleDelete = (id) => {
    axios.delete(`/events/${id}`)
      .then(() => {
        setEvents(events.filter(event => event._id !== id));
      })
      .catch(error => console.error('Error deleting event:', error));
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div>
      <h1>Event Management</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" value={newEvent.name} onChange={handleChange} required />
        <input type="text" name="description" placeholder="Description" value={newEvent.description} onChange={handleChange} required />
        <input type="text" name="location" placeholder="Location" value={newEvent.location} onChange={handleChange} required />
        <input type="date" name="date" value={newEvent.date} onChange={handleChange} required />
        <button type="submit">{editingEvent ? 'Update Event' : 'Create Event'}</button>
      </form>
      <ul>
        {events.map(event => (
          <li key={event._id}>
            {event.name} - {event.description} - {event.location} - {formatDate(event.date)}
            <button onClick={() => handleEdit(event)}>Edit</button>
            <button onClick={() => handleDelete(event._id)}>Delete</button>
            <button onClick={() => taskDetail(event._id)}>View</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventManagementPage;