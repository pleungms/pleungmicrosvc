// ############################################################################
// File Name: server.js
// Description:
//  Micro-services
// Author: Peter Leung (pleungms@hotmail.com)
// Modification history
//  Author         Date       Description
//  -------------- ---------- -------------------------------------------------
//  Peter Leung    23/08/2018 Initial version
//  Peter Leung    09/09/2018 Updated subscription deployment
// ############################################################################

// Using the express package to start the application server
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// obtain the environment the application will run in
var env = process.env.NODE_ENV || 'dev';
var config = require('./config')[env];

// using RESTful API's
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// RESTful calls in another js file
var routes = require('./routes.js')(app);

// Listen on port for http requests
app.listen(config.server.port, function () {
  console.log('pleungmicrosvc node app listen on ' + config.server.port);
});

// end server.js ///////////////////////////
