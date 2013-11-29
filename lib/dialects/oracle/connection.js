var oracle = require('oracle');
var Const = require('../common/const');

module.exports = Connection;

function Connection(options, callBack) {
    var thisConn = this;
    oracle.connect(options, function(err, connection){
        thisConn._connection = connection;
        callBack(err, thisConn);
    });
}

Connection.prototype.query = function(sql, params, callBack) {
    var sqlTemp = Connection.transSqlStr(sql);
    var paramsTemp = callBack ? params : [];
    var callBackTemp = callBack ? callBack: params;
    //console.log(sqlTemp);
    this._connection.execute(sqlTemp, paramsTemp, callBackTemp);
};


Connection.prototype.close = function(callBack) {
    var thisConn = this;
    thisConn._connection.close();
    if (callBack && typeof callBack ==='function') {
        callBack();
    }
    //delete thisConn._connection;
};

Connection.transSqlStr = function(sql) {
    var inc = 0;
    return sql.replace(Const.PLACE_HOLDER, function(str) {
        return ":" + ++inc;
    });
}