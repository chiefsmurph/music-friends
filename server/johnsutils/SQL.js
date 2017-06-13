// kind of like a simple ORM
// create sql strings

function SQL(tableName, fieldObj) {

  var delimitedVals = function(mappings, del) {
    var stringVal = function(val) {
      return JSON.stringify(val).replace(/"/g, "'")
    };
    return Object.keys(mappings).map(function(field) {
      var valFormatted = (fieldObj[field][0].indexOf('varchar') !== -1) ? stringVal(mappings[field]) : mappings[field];
      return field + ' = ' + valFormatted;
    }).join(del);
  };

  this.create = function() {
    return 'CREATE TABLE ' + tableName + ' (' + Object.keys(fieldObj).map(function(field) {
      var fieldType = fieldObj[field][0];
      var fieldConstraints = fieldObj[field][1] ? ' ' + fieldObj[field][1] : '';
      return field + ' ' + fieldType + fieldConstraints;
    }).join(', ') + ')';
  };
  this.select = function(options) {
    options = options || {};
    var parts = ['SELECT', options.what || '*', 'FROM', tableName];
    if (options.where) {
      parts.push('WHERE');
      parts.push(delimitedVals(options.where, ' AND '));
    }
    if (options.orderBy) {
      parts.push('ORDER BY');
      parts.push(options.orderBy);
    }
    if (options.extra) {
      parts.push(options.extra);
    }
    return parts.join(' ');
  };
  this.update = function(options) {
    var parts = ['UPDATE', tableName, 'SET'];
    if (!options || !options.data) {
      return console.error('SQL.update needs options.data');
    }
    parts.push(delimitedVals(options.data, ', '));
    if (options.where) {
      parts.push('WHERE');
      parts.push(delimitedVals(options.where, ' AND '));
    }
    if (options.extra) {
      parts.push(options.extra);
    }
    parts.push('RETURNING *');
    return parts.join(' ');
  };
  this.insert = function(fields) {
    var parts = ['INSERT INTO', tableName, '('];
    parts.push(fields.join(', '));
    parts.push(') VALUES (');
    parts.push(new Array(fields.length).fill(undefined).map(function(val, index) {
      return '$' + (index + 1);
    }).join(', '));
    parts.push(')');
    parts.push('RETURNING *');
    //console.log(parts.join(' '));
    return parts.join(' ');
  };
}

module.exports = SQL;
