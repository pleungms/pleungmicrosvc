// ############################################################################
// File Name: routes.js
// Description:
//  Micro-services routes
// Author: Peter Leung (pleungms@hotmail.com)
// Modification history
//  Author         Date       Description
//  -------------- ---------- -------------------------------------------------
//  Peter Leung    23/08/2018 Initial version
// ############################################################################

// routes
// obtain the environment the application will run in
var env = process.env.NODE_ENV || 'dev';
var config = require('./config')[env];
//var mysql = require('mysql');

// process the RESTful call
var appRouter = function(app) {

    // RESTful get: http://xxx:nnn
    app.get("/api/getprofile", function(req, res) {

		// Enable cross server
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type');

        res.send('Hello World! [from pleungmicrosvc] v2!');
    });

    // RESTful post: http://xxx:nnn
    app.post("/api/addprofile", function(req, res) {
        // Do something later
    });
};
module.exports = appRouter;
