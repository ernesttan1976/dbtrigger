// app.js
const express = require('express');
const createPostgresSubscriber = require('pg-listen');

const app = express();
const port = 3001;

// Create a new listener instance
const listener = createPostgresSubscriber({
    user: 'postgres',
    host: 'localhost',
    database: 'spot',
    password: 'raid2024',
    port: 5432,
  });
  
  // Listen for PostgreSQL notifications
  listener.notifications.on('new_report_event', (payload) => {
    console.log('Received new_report_event:', payload);
    // Perform actions here, e.g., trigger API call
  });
  
  listener.notifications.on('edit_report_event', (payload) => {
    console.log('Received edit_report_event:', payload);
    // Perform actions here, e.g., trigger API call
  });

  // Start listening to PostgreSQL notifications
  listener.connect().then(() => {
    console.log('Listening for PostgreSQL notifications');
    listener.listenTo('new_report_event');
    listener.listenTo('edit_report_event');
  }).catch(err => {
    console.error('Error connecting to PostgreSQL:', err);
  });

// Start the Express.js server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
