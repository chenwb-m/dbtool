var Mysql = require('mysql');
var Const = require('../common/const');

module.exports = Connection;

function Connection(options, callBack) {
    var thisConn = this;
    var connection = thisConn._connection = Mysql.createConnection(options);
    connection.connect(function(err){
        callBack(err, thisConn);
    });
}

Connection.prototype.query = function(sql, params, callBack) {
    var sqlTemp = Connection.transSqlStr(sql);
    //console.log(sqlTemp);
    this._connection.query(sqlTemp, params, callBack);
};

Connection.prototype.close = function(callBack) {
    var thisConn = this;
    if (callBack && typeof callBack ==='function') {
        thisConn._connection.end(callBack);
    } else {
        thisConn._connection.end();
    }
    delete thisConn._connection;
};

Connection.transSqlStr = function(sql) {
    return sql.replace(Const.PLACE_HOLDER, '?');
}