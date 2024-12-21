import React, { useState } from 'react';
import axios from '../axiosConfig';

const ManageTask = ({ data }) => {
    const [status, setStatus] = useState(data.task_status);
    const [message, setMessage] = useState('');

    const handleStatusChange = (e) => {
        setStatus(e.target.value);
    };

    const updateTaskStatus = async () => {
        try {
            const response = await axios.put(`/attendees/task/${data._id}`, {
                task_status: status,
            });
            setMessage('Task status updated successfully!');
            console.log(response.data);
        } catch (error) {
            console.error('Error updating task status:', error);
            setMessage('Failed to update task status.');
        }
        setTimeout(() => {
            setMessage('');
        }, 2000);
    };

    return (
        <div className="task-container">
        <h2 className="task-title">Event: {data.event_name}</h2>
        <div className="task-details">
          <p><strong>Task Name:</strong> {data.task_name}</p>
          <p><strong>Deadline:</strong> {new Date(data.task_deadline).toLocaleDateString()}</p>
        </div>
        
        <div className="status-container">
          <p><strong>Status:</strong></p>
          <select 
            value={status} 
            onChange={handleStatusChange} 
            className="status-dropdown"
          >
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      
        <button onClick={updateTaskStatus} className="btn-update">
          Update Status
        </button>
      
        {message && <p className="message">{message}</p>}
      </div>
      
    );
};

export default ManageTask;