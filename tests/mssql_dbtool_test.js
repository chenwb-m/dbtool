var common = require("./common");
var MssqlDBTool = common.mssqlDBTool;

setTimeout(function() {
    MssqlDBTool.executeQuery("select top 2 * from RU_DBTOOL_COL", [], function(err, rows){
        if(err) {
            throw err;
        }
        console.dir(rows);
    });
}, 500);
