import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
    const imgStyle = {
        width:"30%",
        Height:"30%",
        objectFit:"contain"
    }
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Streamline Your Event Management</h1>
          <p className="hero-description">
            Revolutionize the way your organization plans and executes events. Create, assign, and track tasks seamlessly on our Event Management Dashboard.
          </p>
          <div className="hero-buttons">
            <Link to={'/adminlogin'} className="admin-login-button">Admin Login</Link>
            <Link to={'/login'} className="attendee-login-button">Attendee Login</Link>
          </div>
        </div>
        <div className="hero-image">
          <img src="/hero-section.png" alt="Event Management Dashboard" />
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="section-title">Why Choose Us?</h2>
        <div className="features-grid">
          <div className="feature-item">
            <img src="/icons/task.png" alt="Task Management" style={imgStyle} />
            <h3>Task Management</h3>
            <p>Assign and prioritize tasks with ease, ensuring nothing falls through the cracks.</p>
          </div>
          <div className="feature-item">
            <img src="/icons/progress.png" alt="Progress Tracking" style={imgStyle} />
            <h3>Progress Tracking</h3>
            <p>Monitor event milestones and progress in real-time with insightful dashboards.</p>
          </div>
          <div className="feature-item">
            <img src="/icons/event.png" alt="Event Planning" style={imgStyle} />
            <h3>Event Planning</h3>
            <p>Plan events with customizable templates to fit your organization’s unique needs.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <h2 className="section-title">What Our Users Say</h2>
        <div className="testimonials-grid">
          <div className="testimonial-item">
            <p className="testimonial-quote">
              "This dashboard transformed how we manage our events. Highly recommend!"
            </p>
            <h4>- Sarah, Event Coordinator</h4>
          </div>
          <div className="testimonial-item">
            <p className="testimonial-quote">
              "Efficient, intuitive, and a game-changer for our team."
            </p>
            <h4>- Mike, Project Manager</h4>
          </div>
        </div>
      </section>
    </div>
  );
}
