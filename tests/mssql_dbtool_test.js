var common = require("./common");
var MssqlDBTool = common.mssqlDBTool;


MssqlDBTool.executeQuery("select top 2 * from RU_DBTOOL_COL", [], function(err, rows){
    if(err) {
        throw err;
    }
    console.dir(rows);
});

MssqlDBTool.executeQuery("select top 1 * from RU_DBTOOL_COL where id = @@ ", [1], function(err, rows){
    if(err) {
        throw err;
    }
    console.dir(rows);
});

MssqlDBTool.executeQuery("select 1 as one", function(err, rows){
    if(err) {
        throw err;
    }
    console.dir(rows);
});

