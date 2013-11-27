var common = require("./common");
var oracleDBTool = common.oracleDBTool;

setTimeout(function() {
    oracleDBTool.executeQuery("select * from PM_USER where rownum < 3 ", [], function(err, rows){
        if(err) {
            throw err;
        }
        console.dir(rows);
    });
}, 500);
