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

        var dbconn = new Connection(dbconfig);

        dbconn.on('connect', function(err) {
            if (err) {
               // error
               console.log(err);
            } else {
                // connected
                console.log('Connected');
            }
		}); // dbconn.on

    // RESTful get: http://xxx:nnn
    app.get("/api/getprofile", function(req, res) {

		// Enable cross server
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type');

		//dbreq = new Request("select pro_id, pro_name, pro_email from tbl_pro_profiles", function(err, rowCount, rows) {
		//	if(err){
		//		// error
		//		console.log(err);
		//	} else {
		//		console.log(rowCount);
		//		console.log(rows);
		//		res.send(rows);
		//	}
		//}); //dbreq

		//dbconn.execSql(dbreq);


        dbconn.execSql(new Request("select pro_id, pro_name, pro_email from tbl_pro_profiles", function(err, rowCount, rows) {
            if(err) {
                throw err;
            }
        })
        .on('doneInProc', function(rowCount, more, rows){
                console.log(rows); // not empty
                res.send(rows);
            })
        );

        //dbconn.on('error', function(err) {
        //    // on error
        //    res.statusCode = 404;
        //    res.end();
        //    return;
        //}); // connection.on

        //res.send('Hello World! [from pleungmicrosvc] v2!');
        //});

    // RESTful post: http://xxx:nnn
    // Do something later
    });
};
module.exports = appRouter;
