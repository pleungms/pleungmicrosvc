// ############################################################################
// File Name: routes.js
// Description:
//  Micro-services routes
// Author: Peter Leung (pleungms@hotmail.com)
// Modification history
//  Author         Date       Description
//  -------------- ---------- -------------------------------------------------
//  Peter Leung    23/08/2018 Initial version
//  Peter Leung    20/09/2018 Added microservice for face detection
// ############################################################################

// routes
// obtain the environment the application will run in
var env = process.env.NODE_ENV || 'dev';
var config = require('./config')[env];
//var http = require("http");
var request = require("request");


// variables for connection to SQL Server
var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;

// process the RESTful call
var appRouter = function(app) {

    // db configuration parameters
    var dbconfig = {
        userName: config.db.user,
        password: config.db.password,
        server:   config.db.host,
        options: {encrypt: true, database: config.db.database, rowCollectionOnDone: true}
    };

    // connect to db
    // note: this should be enhanced to use a connection pool
    var dbconn = new Connection(dbconfig);
    //dbconn.on('connect', function(err) {
    //    if (err) {
    //        // error
    //        console.log(err);
    //    } else {
    //        // connected
    //        console.log('Connected');
    //    }
    //}); // dbconn.on

    ///////////////////////////////////////////////////////////////////////////
    // RESTful get: /api/listprofiles
    // Description:
    //  Returns a list of all profiles in the database
    app.get("/api/listprofiles", function(req, res) {

		// Enable cross server
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type');

        //var dbconn = new Connection(dbconfig);
        dbconn.on('connect', function(err) {
            if (err) {
                // error
                console.log(err);
            } else {
                // connected
                console.log('Connected');
            }
        }); // dbconn.on

        // Execute the SQL
        dbconn.execSql(new Request("select pro_id, pro_name, pro_email from tbl_pro_profiles", function(err, rowCount, rows) {
            if(err) {
                console.log(err);
                res.send(null);
                //throw err;
            }
        })
        .on('doneInProc', function(rowCount, more, rows){
                console.log(rows); // not empty
                res.send(rows);
            })
        ); // execSql

    }); // listprofiles ///////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////
    // RESTful get: /api/getprofile?pro_id=<val>
    // Description:
    //  Returns the profile record with the specific value
    app.get("/api/getprofile", function(req, res) {

        // Enable cross server
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type');

        //var dbconn = new Connection(dbconfig);
        dbconn.on('connect', function(err) {
            if (err) {
                // error
                console.log(err);
            } else {
                // connected
                console.log('Connected');
            }
        }); // dbconn.on

        // Get the parameter
        // NOTE: Need to error checking for parameter not passed in
        var proid=req.query.pro_id;

        // Set the statement
        var sqlStmt = "select pro_id, pro_name, pro_email from tbl_pro_profiles where pro_id = " + proid;

        // Attempt to get the record
        dbconn.execSql(new Request(sqlStmt, function(err, rowCount, rows) {
            if(err) {
                console.log(err);
                res.send(null);
                //throw err;
            }
        })
        .on('doneInProc', function(rowCount, more, rows){
                console.log(rows); // not empty
                res.send(rows);
            })
        ); // execSql

    }); // getprofile /////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////
    // RESTful get: /api/getnumfaces
    // Description:
    //  Returns a list of face id's and locations in the image
    //  using the Microsoft Azure Cognitive Services - Face API's
    app.get("/api/getnumfaces", function(req, res) {

		// Enable cross server
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type');

        // Get the parameter
        // NOTE: Need to error checking for parameter not passed in
        var urlpic=req.query.urlpic;
        //console.log(urlpic);

        // JSON to be passed to the QPX Express API
        var requestData = {
            'url': urlpic
        };

        // fire request
        request({
            url: 'https://westeurope.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=false',
            json: true,
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'dataType': 'json',
                'Ocp-Apim-Subscription-Key': 'b5efa60097254480b312925e2c977f59',
     	    },
            body: requestData
            }, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                //console.log(body)
                //console.log(body.length);
                res.send(body);
            }
            else {
                //console.log(body);
                console.log("error: " + error);
                console.log("response.statusCode: " + response.statusCode);
                console.log("response.statusText: " + response.statusText);
                console.log("response.statusMessage: " + response.statusMessage);
                res.send(body);
            }
        }) // end req

    }); // getnumfaces ///////////////////////////////////////////////////////

};
module.exports = appRouter;
