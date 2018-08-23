// ############################################################################
// File Name: config.js
// Description:
//  Config settings for the application
// Author: Peter Leung (pleungms@hotmail.com)
// Modification history
//  Author         Date       Description
//  -------------- ---------- -------------------------------------------------
//  Peter Leung    23/08/2018 Initial version
// ############################################################################
var config = {
dev: {
    //server details
    server: {
        host: '127.0.0.1',
        port: '80'
    },
    db: {
		host            : 'localhost',
		user            : 'root',
		password        : 'password',
		database        : 'world',
		debug           : false,
        connectionLimit : 3
	},
	debug: {
		level : 3,
		none  : 0,
		normal: 1,
		info  : 2
	}
},
prd: {
    //server details
    server: {
        host: '127.0.0.1',
        port: '80'
    },
    db: {
		host            : 'localhost',
		user            : 'root',
		password        : 'password',
		database        : 'world',
		debug           : false,
        connectionLimit : 100
	},
	debug: {
		level : 3,
		none  : 0,
		normal: 1,
		info  : 2
	}
},
};
module.exports = config;
