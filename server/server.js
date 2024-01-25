// server.js
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes'); // Import the routes
const cors = require('cors');

const app = express();
const port = 4000;

app.use(cors());
app.use(bodyParser.json());

// Use the routes from routes.js
app.use('/', routes);

// Start the Express server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
