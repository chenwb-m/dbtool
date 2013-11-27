var mssql = require('mssql');

module.exports = Connection;

function Connection(options, callBack) {
    var thisConn = this;
    var connection = thisConn._connection = new mssql.Connection(options, function(err){
        callBack(err, thisConn);
    });
    //console.log(connection);

    return thisConn;
}

Connection.prototype.query = function(sql, params, callback) {
    var request = new mssql.Request(this._connection);
    request.query(sql, callback);
};