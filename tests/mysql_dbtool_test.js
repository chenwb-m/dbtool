var common = require("./common");
var MysqlDBTool = common.MysqlDBTool;

setTimeout(function() {
    MysqlDBTool.executeQuery("select * from ru_dbtool_col limit 10, 2", [], function(err, rows){
        if(err) {
            throw err;
        }
        console.dir(rows);
    });
}, 500);
