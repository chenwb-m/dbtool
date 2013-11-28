var mssql = require('mssql');
var Const = require('../common/const');

module.exports = Connection;

function Connection(options, callBack) {
    var thisConn = this;
    var connection = thisConn._connection = new mssql.Connection(options, function(err){
        callBack(err, thisConn);
    });
}

Connection.prototype.query = function(sql, params, callBack) {
    var sqlTemp = Connection.transSqlStr(sql);
    var paramsTemp = callBack ? params : [];
    var callBackTemp = callBack ? callBack: params;
    var request = new mssql.Request(this._connection);
    for (var i = 0; i < paramsTemp.length; i++) {
        request.input(''+ i, paramsTemp[i])
    };
    request.query(sqlTemp, callBackTemp);
};

Connection.prototype.close = function(callBack) {
    var thisConn = this;
    thisConn._connection.close();
    if (callBack && typeof callBack ==='function') {
        callBack();
    }
    delete thisConn._connection;
};

Connection.transSqlStr = function(sql) {
    var inc = 0;
    return sql.replace(Const.PLACE_HOLDER, function(str) {
        return "@" + inc++;
    });
}