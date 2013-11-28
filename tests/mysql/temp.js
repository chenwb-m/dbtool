var mysqlDBToolAsyn = require("./common_asyn").MysqlDBToolAsyn;

mysqlDBToolAsyn.getConnection(function(err, connection) {
    if (err) {
        throw err;
    };
        var items = [];
        var table = 'insert_test';
        connection.query([
          'CREATE TEMPORARY TABLE `' + table + '` (',
          '`id` int(11) unsigned NOT NULL AUTO_INCREMENT,',
          '`title` varchar(255),',
          'PRIMARY KEY (`id`)',
          ') ENGINE=InnoDB DEFAULT CHARSET=utf8'
        ].join('\n'));

        for(var i = 0; i < 100; i++)
          items[i] = ['test '+i];
        connection.query('INSERT INTO ' + table + ' (title) VALUES ? ', [items], function(err, _result) {
            console.log(_result);
        });

    connection.close();
});



