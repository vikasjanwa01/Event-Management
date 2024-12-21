# Event Management System Documentation

The Event Management System is a web application designed to streamline the process of organizing and managing events. It provides features for event creation, attendee registration, and real-time updates, making event management efficient and user-friendly.

## Features
- **Event Creation**: Organizers can create events with detailed information, including date, time, location, and description.
- **Attendee Registration**: Participants can register for events, providing necessary details for seamless communication.
- **Real-Time Updates**: Receive instant notifications about event changes, ensuring all parties are informed promptly.

## Technologies Used
- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB

---

## Setup and Installation
Follow these steps to set up and run the project on your local system:

### Prerequisites
Ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/) (running locally or a MongoDB Atlas connection)
- A package manager like npm or yarn

### Steps
1. **Clone the Repository**
   ```bash
   git clone https://github.com/sumeetpatil01/event-management.git
   cd event-management
   ```

2. **Install Dependencies**
   Navigate to the root directory and install backend dependencies:
   ```bash
   npm install
   ```

   Then navigate to the `client` directory and install frontend dependencies:
   ```bash
   cd client
   npm install
   ```

3. **Set Up Environment Variables**
   Create a `.env` file in the root directory and provide the following variables:
   ```env
   PORT=5000
   MONGO_URI=<your_mongodb_connection_string>
   ```

4. **Start the Application**
   Run both the backend and frontend servers simultaneously:
   ```bash
   npm start both
   ```

5. **Access the Application**
   Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

---

## API Documentation
Below is the list of APIs developed for the Event Management System:

### 1. Event Management API
- **Create Event**
  - **Endpoint**: `POST /api/events`
  - **Description**: Create a new event.
  - **Request Body**:
    ```json
    {
      "name": "Event Name",
      "date": "2024-12-25",
      "time": "18:00",
      "location": "Event Location",
      "description": "Event Description"
    }
    ```
  - **Response**:
    ```json
    {
      "message": "Event created successfully",
      "event": { ... }
    }
    ```

- **Get All Events**
  - **Endpoint**: `GET /api/events`
  - **Description**: Retrieve a list of all events.
  - **Response**:
    ```json
    [
      { ... },
      { ... }
    ]
    ```

- **Update Event**
  - **Endpoint**: `PUT /api/events/:id`
  - **Description**: Update details of an existing event.
  - **Request Body**: Similar to create event.
  - **Response**:
    ```json
    {
      "message": "Event updated successfully",
      "event": { ... }
    }
    ```

- **Delete Event**
  - **Endpoint**: `DELETE /api/events/:id`
  - **Description**: Remove an event.
  - **Response**:
    ```json
    {
      "message": "Event deleted successfully"
    }
    ```

### 2. Attendee Management API
- **Add an Attendee**
  - **Endpoint**: `POST /api/attendees`
  - **Description**: Add an attendee to an event.
  - **Request Body**:
    ```json
    {
      "eventId": "<event_id>",
      "name": "Attendee Name",
      "email": "attendee@example.com"
    }
    ```
  - **Response**:
    ```json
    {
      "message": "Attendee added successfully",
      "attendee": { ... }
    }
    ```

- **Get All Attendees**
  - **Endpoint**: `GET /api/attendees/:eventId`
  - **Description**: Retrieve a list of all attendees for a specific event.
  - **Response**:
    ```json
    [
      { ... },
      { ... }
    ]
    ```

- **Delete an Attendee**
  - **Endpoint**: `DELETE /api/attendees/:id`
  - **Description**: Remove an attendee from an event.
  - **Response**:
    ```json
    {
      "message": "Attendee deleted successfully"
    }
    ```

### 3. Task Management API
- **Create a Task**
  - **Endpoint**: `POST /api/tasks`
  - **Description**: Create a new task for an event.
  - **Request Body**:
    ```json
    {
      "eventId": "<event_id>",
      "title": "Task Title",
      "description": "Task Description",
      "status": "pending"
    }
    ```
  - **Response**:
    ```json
    {
      "message": "Task created successfully",
      "task": { ... }
    }
    ```

- **Get Tasks for an Event**
  - **Endpoint**: `GET /api/tasks/:eventId`
  - **Description**: Retrieve all tasks associated with a specific event.
  - **Response**:
    ```json
    [
      { ... },
      { ... }
    ]
    ```

- **Update Task Status**
  - **Endpoint**: `PUT /api/tasks/:id`
  - **Description**: Update the status of a task (e.g., from "pending" to "completed").
  - **Request Body**:
    ```json
    {
      "status": "completed"
    }
    ```
  - **Response**:
    ```json
    {
      "message": "Task status updated successfully",
      "task": { ... }
    }
    ```

---


