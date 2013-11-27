var Connection       = require('./lib/connection');
var ConnectionConfig = require('./lib/conn_cfg');
var DBTool           = require("./lib/dbtool");

module.exports = {
    createDBTool: function(options, callBack) {
        return new DBTool(options, callBack);
    }
};