var common = require("./common");
var MysqlDBTool = common.mysqlDBTool;


MysqlDBTool.executeQuery("select * from ru_dbtool_col limit 10, 2", [], function(err, rows){
    if(err) {
        throw err;
    }
    console.dir(rows);
});


MysqlDBTool.executeQuery("select * from ru_dbtool_col limit @@, @@", [1, 1], function(err, rows){
    if(err) {
        throw err;
    }
    console.dir(rows);
});

MysqlDBTool.executeQuery("select 1 as time", function(err, rows){
    if(err) {
        throw err;
    }
    console.dir(rows);
});
