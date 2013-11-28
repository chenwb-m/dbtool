var connCfg = require("./conn_cfg");
var Connection = require("./connection");

module.exports = DBToolAsyn;

function DBToolAsyn(options) {
    var thisDBtool = this;
    thisDBtool._options = new connCfg(options);
};


DBToolAsyn.prototype.getConnection = function(callBack) {
    if(!callBack || typeof callBack !== 'function') {
        throw new Error("this function require a callBack");
    }
    var thisDBtool = this;
    new Connection(thisDBtool._options, callBack);
};
