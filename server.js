// import express framework and body-parser helper and fs core module
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const appRouter = require('./routes/appRoute');

// create an instance of express to serve our end points
const app = express();
const port = process.env.PORT || 8000 ;

app.use(cors()); // enable cors
// configure our express instance with some body-parser settings

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// this is where we'll handle our various routes from

appRouter(app,fs);

// finally, launch our server on port 3001.
const server = app.listen(port, () => {
    console.log('listening on port %s...', server.address().port);
  });