var EventEmitter    = require('events').EventEmitter;
var Util            = require('util');
var path            = require('path');

module.exports = Connection;

function Connection(options, callBack) {
    // EventEmitter.call(this);
    var _thisConn = this;
    _thisConn.config = options.config;
    _thisConn.callBack = callBack;
    var ConnectionProto = require(__dirname+"/dialects/"+options.dialect+"/connection");
    new ConnectionProto(options, function(err, connection) {
        //console.log(connection); //undefined
        //console.log("err:"+err);
        _thisConn._connection = connection;
        if (_thisConn.callBack) {
            _thisConn.callBack(err, connection);
        };
    });
};

Connection.prototype.query = function(sql, params, callBack) {
    this._connection.query(sql, params, callBack);
}