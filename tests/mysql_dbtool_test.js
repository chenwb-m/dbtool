var common = require("./common");
var MysqlDBTool = common.mysqlDBTool;

var options = {
    params: [1],
    sort : {
        id: 'asc',
        colname: 'desc'},
    skip: 50,
    limit: 10
};
MysqlDBTool.executeQuery("select * from ru_dbtool_col where cannull=@@ ", options, function(err, rows){
    if(err) {
        throw err;
    }
    console.dir(rows);
});


// MysqlDBTool.executeQuery("select * from ru_dbtool_col limit @@, @@", {params:[1, 1]}, function(err, rows){
//     if(err) {
//         throw err;
//     }
//     console.dir(rows);
// });

MysqlDBTool.executeQuery("select 1 as time", function(err, rows){
    if(err) {
        throw err;
    }
    console.dir(rows);
});
