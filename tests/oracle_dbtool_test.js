var common = require("./common");
var oracleDBTool = common.oracleDBTool;


oracleDBTool.executeQuery("select * from PM_USER where rownum < @@", [2], function(err, rows){
    if(err) {
        throw err;
    }
    console.dir(rows);
});

oracleDBTool.executeQuery("select * from PM_USER where rownum < 2 ", [], function(err, rows){
    if(err) {
        throw err;
    }
    console.dir(rows);
});

oracleDBTool.executeQuery("select 1 from dual", function(err, rows){
    if(err) {
        throw err;
    }
    console.dir(rows);
});