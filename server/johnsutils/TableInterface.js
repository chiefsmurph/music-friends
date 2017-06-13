var pg = require('pg');
var SQL = require("./SQL.js");

var databaseUrl = process.env.DATABASE_URL + "?ssl=true";
console.log('using ' + databaseUrl);

function TableInterface(tableName, fieldObj, methods) {

  var sql = new SQL(tableName, fieldObj);

  this.executeQuery = function() {
    var args = Array.prototype.slice.call(arguments);
    var callback = (typeof args[args.length - 1] === 'function') ? args.pop() : function() {};
    var sql = args[0];
    console.log(sql);
    pg.connect(databaseUrl, function(err, client, done) {
      console.log(err);
      if (!client) {
        return;
      }
      console.log('all good');
      client.query.apply(client, args.concat([function(err, result) {
        done();
        if (err) {
          return console.log(err);
        }
        console.log('executed query ' + args[0]);
        console.log(result);
        return callback((result && result.rows) ? result.rows : null);
      }]));
    });
  },

  this.create = function(callback) {
    this.executeQuery(sql.create(), function(data) {
      console.log('created table ' + tableName);
      if (callback) callback(data);
    });
  };
  this.create();  // if already exists will be ignored

  this.select = function(options, callback) {
    //console.log('selecting ', JSON.stringify(options));
    var query = sql.select(options);
    //console.log(query);
    this.executeQuery(query, function(response) {
      //console.log('selected table ' + tableName);
      if (callback) callback(response);
    });
  };

  this.update = function(options, callback) {
    this.executeQuery(sql.update(options), function(response) {
      if (callback) callback(response);
    });
  };

  this.insert = function(data, callback) {
    //console.log(JSON.stringify(data));
    var vals = Object.keys(data).map(function(key) {
      return data[key];
    });
    this.executeQuery(sql.insert(Object.keys(data)), vals, function(response) {
      //console.log('inserted to  ' + tableName);
      if (callback) callback(response[0]);
    });
  };

  if (methods) {
    methods.call(this);
  }

}

module.exports = TableInterface;