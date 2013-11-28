var Connection       = require('./lib/connection');
var ConnectionConfig = require('./lib/conn_cfg');
var DBTool           = require("./lib/dbtool");
var DBToolAsyn       = require("./lib/dbtool_asyn");

module.exports = {
    createDBTool: function(options, callBack) {
        return new DBTool(options, callBack);
    },

    createDBToolAsyn: function(options, callBack) {
        return new DBToolAsyn(options, callBack);
    }
};