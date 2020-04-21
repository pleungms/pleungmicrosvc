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
//  Peter Leung    21/04/2020 Added microservice for Computer Vision and
//                            removed DB stuff
// ############################################################################

// routes
// obtain the environment the application will run in
var env = process.env.NODE_ENV || 'dev';
var config = require('./config')[env];
//var http = require("http");
var request = require("request");

/* Remove DB stuff ***********************************************
// variables for connection to SQL Server
var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;
*/

// process the RESTful call
var appRouter = function(app) {

    /* Remove DB stuff ***********************************************
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
	*/

    ///////////////////////////////////////////////////////////////////////////
    // RESTful get: /api/listprofiles
    // Description:
    //  Returns a list of all profiles in the database
    app.get("/api/listprofiles", function(req, res) {

		// Enable cross server
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
		
	    // simple return
		res.send("listing profiles");
		
		/* Remove DB stuff ***********************************************

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
		*/

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

        res.send("get profile");
		
        /* Remove DB stuff ***********************************************
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
		*/

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

    ///////////////////////////////////////////////////////////////////////////
    // RESTful get: /api/7SEreceipt
    // Description:
    //  Returns a list of face id's and locations in the image
    //  using the Microsoft Azure Cognitive Services - Face API's
	// http://127.0.0.1:9080/api/7SEreceipt?urlpic=https://pkpleung.files.wordpress.com/2020/04/7-eleven-receipt.jpeg
    app.get("/api/7SEreceipt", function(req, res) {

		// Enable cross server
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type');

        // Get the parameter
        // NOTE: Need to error checking for parameter not passed in
        var urlpic=req.query.urlpic;
        console.log(urlpic);

        // JSON to be passed to the QPX Express API
        var requestData = {
            'url': urlpic
        };
		
        // First request to "Batch Read File" in Computer Vision API v2.0
		// https://docs.microsoft.com/en-us/azure/cognitive-services/computer-vision/
		// The first step is a POST request to send the image (as an URL image) to the Azure Computer Vision API v2.0
		// The second step (if the first step returns a 202) is to wait and then perform a GET operation on the "Get Read Operation Result"
        request({
            url: 'https://westeurope.api.cognitive.microsoft.com/vision/v2.0/read/core/asyncBatchAnalyze',
            json: true,
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'dataType': 'json',
                'Ocp-Apim-Subscription-Key': 'a46646f10aa24dd594843e1e841530a8',
     	    },
            body: requestData
            }, function (error, response, body) {
				  
				// Check if the return code is 202, if so then wait and perform a GET operation
                // to retrieve the results from Azure Computer Vision API v2.0				
                if (!error && response.statusCode === 202) {
			    	
                    console.log("response.statusCode: " + response.statusCode);
                    console.log("response.statusText: " + response.statusText);
                    console.log("response.statusMessage: " + response.statusMessage);
			    	opLoc = response.headers['operation-location'];
			    	console.log("opLoc: " + opLoc);
					
                    // Wait for the Azure Computer Vision API v2.0 to process the image; should take no longer than 5 seconds,
                    // but this can be performed to check based on a loop on the GET operation			    	
			    	setTimeout(function() {
						
						// Second request, the URL is from the first request
                        console.log('Attempting to GET the result...');
			    		request({
			    		    url: opLoc,
			    		    json: true,
			    		    method: 'GET',
			    		    headers: {
                                'content-type': 'application/json',
                                'dataType': 'json',
                                'Ocp-Apim-Subscription-Key': 'a46646f10aa24dd594843e1e841530a8',
     	                    },
			    	    }, function (error, response, body) {
							// Add in error handling as required
			    		    console.log(body);
							console.log(body.recognitionResults[0].lines[1].text);
							//console.log(body.recognitionResults.lines[1]);
							//console.log(body.recognitionResults.lines[2]);
			    			res.send(body);
			    	    }) // end 2nd request	
			    	
                    }, 5000);
                }
                else {
                    console.log("error: " + error);
                    console.log("response.statusCode: " + response.statusCode);
                    console.log("response.statusText: " + response.statusText);
                    console.log("response.statusMessage: " + response.statusMessage);
                    res.send(body);
                }			   		

        }) // end req
		
    }); // 7SEreceipt ///////////////////////////////////////////////////////

};
module.exports = appRouter;
