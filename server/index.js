// Main starting point of the application
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors');

// Server Setup
const port = process.env.PORT || 3000;
const server = http.createServer(app);

var io = require('socket.io')(server);

// DB Setup
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/specker');

// App Setup
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json({ type: '*/*' }));
router(app, io);


server.listen(port);
console.log('Server listening on:', port);
