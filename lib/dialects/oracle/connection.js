var oracle = require('oracle');


module.exports = Connection;

function Connection(options, callBack) {
    var thisConn = this;
    oracle.connect(options, function(err, connection){
        thisConn._connection = connection;
        callBack(err, thisConn);
    });
    return thisConn;
}

Connection.prototype.query = function(sql, params, callback) {
    this._connection.execute(sql, params, callback);
};