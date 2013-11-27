var mysql            = require('mysql');

var EventEmitter     = require('events').EventEmitter;
var Util             = require('util');

module.exports = Connection;

function Connection(options, callBack) {
    var thisConn = this;
    var connection = thisConn._connection = mysql.createConnection(options);
    connection.connect(function(err){
        callBack(err, thisConn);
    });
    return thisConn;
}

Connection.prototype.query = function(sql, params, callback) {
    this._connection.query(sql, params, callback);
};