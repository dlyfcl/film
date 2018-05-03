var mysql = require('mysql');
var config = require('../conf/config');

var DB={};

module.exports = DB;

DB.exec=function(sqls, values, after) {
	var connection = mysql.createConnection(config);
	connection.connect(function(err) {
		if (err) {
			console.error('error connecting: ' + err.stack);
		}
		console.log('connected as id ' + connection.threadId);

		connection.query(sqls || '', values || [], function(err, rows) {
			after(err, rows);
		});
		connection.end();
	});
	connection.on('error', function(err) {
		if (err.errno != 'ECONNRESET') {
			after("err01", false);
			throw err;
		} else {
			after("err02", false);
		}
	});
};

DB.getConnection=function(callback){
	var connection=mysql.createConnection(config);
	connection.connect(function(err){
		if(err){
			console.error('error connecting: ' + err.stack);
		}
		callback(err,connection);
	});
}

DB.implement = function(sql, parameter, callback) {
	DB.exec(sql, parameter, function(err, rows) {
		if (err) {
			callback(err);
		}
		callback(err, rows);
	});
}
