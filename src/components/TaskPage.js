import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig';

export default function TaskPage({id}) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`/events/task/${id}`); // Replace with your API endpoint
        console.log(response.data);
        setTasks(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching tasks');
        setLoading(false);
      }
    };

    fetchTasks();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="tasks-container">
  <h1 className="tasks-title">Tasks for Event</h1>
  {tasks.length === 0 ? (
    <p className="no-tasks-message">No tasks found for this event.</p>
  ) : (
    <ul className="task-list">
      {tasks.map((task, index) => (
        <li key={index} className="task-card">
          <p><strong>Attendee Name:</strong> {task.name}</p>
          <p><strong>Task Name:</strong> {task.task_name || 'N/A'}</p>
          <p><strong>Deadline:</strong> {task.task_deadline ? new Date(task.task_deadline).toLocaleDateString() : 'N/A'}</p>
          <p><strong>Status:</strong> {task.task_status}</p>
        </li>
      ))}
    </ul>
  )}
</div>

  );
}
