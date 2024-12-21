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
        <div style={{ border: '1px solid #ccc', padding: '16px', borderRadius: '8px', maxWidth: '400px', margin: 'auto' }}>
            <h2>Event: {data.event_name}</h2>
            <p><strong>Task Name:</strong> {data.task_name}</p>
            <p><strong>Deadline:</strong> {new Date(data.task_deadline).toLocaleDateString()}</p>
            <p><strong>Status:</strong></p>
            <select value={status} onChange={handleStatusChange} style={{ padding: '8px', marginBottom: '16px', width: '100%' }}>
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
            </select>
            <button onClick={updateTaskStatus} style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                Update Status
            </button>
            <p>{message}</p>
        </div>
    );
};

export default ManageTask;