// server.js
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes'); // Import the routes

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Use the routes from routes.js
app.use('/', routes);

// Start the Express server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
