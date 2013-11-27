var connCfg = require("./conn_cfg");
var Connection = require("./connection");

module.exports = DBTool;

function DBTool(options, callBack) {
    var _thisDBtool = this;
    _thisDBtool._isReady = false;
    _thisDBtool._connection = new Connection(new connCfg(options), function(err, connection){
        if (!err) {
            _thisDBtool._isReady = true;
        }
        if(callBack) {
            callBack(err);
        }
    });
};

DBTool.prototype.executeQuery = function(sql, params, callback) {
    if (!this._isReady) {
        throw Error("DBTool is not ready!");
    };
    this._connection.query(sql, params, callback);
}