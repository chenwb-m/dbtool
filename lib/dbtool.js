
var PoolModule = require('generic-pool');

var ConnCfg = require("./conn_cfg");
var PoolCfg = require("./pool_cfg");
var Connection = require("./connection");


module.exports = DBTool;

function DBTool(options) {
    var thisDBtool = this;
    var connCfg = thisDBtool._connCfg = new ConnCfg(options);
    var poolCfg = thisDBtool._poolCfg = new PoolCfg(options);
    var factory = {
        name: poolCfg.name,
        min: poolCfg.min,
        max: poolCfg.max,
        idleTimeoutMillis: poolCfg.idleTimeoutMillis,
        create: function(callBack) {
            new Connection(thisDBtool._connCfg, function(err, connection){
                if (err) {
                    callBack(err);
                } else {
                    callBack(null, connection);
                }
            });
        },
        destroy: function(connection) {
            connection.close();
        }
    };
    thisDBtool._pool = PoolModule.Pool(factory);
};

DBTool.prototype.executeQuery = function(sql, options, callBack) {
    var thisDBtool = this;
    var optionsTemp = callBack ? options : {};
    var rParams = optionsTemp.rParams;
    var callBackTemp = callBack ? callBack: options;
    thisDBtool._pool.acquire(function(err, connection){
        if(err) {
            callBackTemp(err, null);
        } else {
            connection.query(sql, optionsTemp, function(err, results) {
                callBackTemp(err, results, rParams);
                thisDBtool._pool.release(connection);
            });
        }
    });
};

DBTool.prototype.drain = function() {
    var thisDBtool = this;
    thisDBtool._pool.drain(function(){
        thisDBtool._pool.destroyAllNow();
    });
};

DBTool.prototype.getConnection = function(callBack) {
    if(!callBack || typeof callBack !== 'function') {
        throw new Error("this function require a callBack");
    }
    var thisDBtool = this;
    new Connection(thisDBtool._options, callBack);
};

DBTool.prototype.executeQueryOnce = function(sql, params, callBack, rParams) {
    var thisDBtool = this;
    var conn = null;
    var paramsTemp = callBack ? params : [];
    var rParamsTemp = rParams;
    var callBackTemp = callBack ? callBack: params;

    new Connection(thisDBtool._options, function(err, connection){
        if(err) {
            callBackTemp(err, null);
        } else {
            conn = connection;
            conn.query(sql, paramsTemp, function(err, results) {
                callBackTemp(err, results, rParamsTemp);
                conn.close();
            });
        }
    });
};

DBTool.prototype.getPoolSize = function() {
    return this._pool.getPoolSize();
}

DBTool.prototype.getBusyConnsCount = function() {
    return this._pool.getPoolSize() - this._pool.availableObjectsCount();
}

DBTool.prototype.getAvailableConnsCount = function() {
    return this._pool.availableObjectsCount();
}

DBTool.prototype.getWaitingClientsCount = function() {
    return this._pool.waitingClientsCount();
}

// function DBTool(options, callBack) {
//     var thisDBtool = this;
//     thisDBtool._isReady = false;
//     thisDBtool._connection = new Connection(new connCfg(options), function(err, connection){
//         if (!err) {
//             thisDBtool._isReady = true;
//         }
//         if(callBack) {
//             callBack(err, thisDBtool);
//         }
//     });
// };

// DBTool.prototype.executeQuery = function(sql, params, callback) {
//     if (!this._isReady) {
//         throw Error("DBTool is not ready!");
//     };
//     this._connection.query(sql, params, callback);
// }