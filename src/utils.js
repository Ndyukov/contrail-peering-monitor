var portscanner = require('portscanner');
var unirest = require('unirest');
var fs = require('fs');
var xml2js = require('xml2js');

if(!global.config){
  global.config = {
    discovery : null,
    analytics : null,
    timeout : 5000,
    refreshTime : 5500
  }
}

//@async
var requestJSON = function(href, callback){
  unirest.get(href)
  .header('Accept','application/json')
  .timeout(global.config.timeout)
  .end(function(response){
    if(response.error){
      callback('Request JSON failed for '+href); // error
    }
    else{
      var objJSON = response.body;
      callback(null, objJSON);
    }
  });
};

//@async
var requestXML = function(href, callback){
  unirest.get(href)
  .header('Accept','application/xml')
  .timeout(global.config.timeout)
  .end(function(response){
    if(response.error){
      callback('Request XML failed for '+href); // error
    }
    else{
      var objXML = response.body;
      callback(null, objXML);
    }
  });
};

//@async
var xmlToJSON = function(objXML, callback){
  xml2js.parseString(objXML, function (err, objJSON) {
    if (err) throw err;
    callback(null, objJSON);
  });
}

//@async
var fileToJSON = function(fileName, callback){
  fs.readFile(fileName, {encoding: 'utf8'}, function(err, data){
    callback(null, JSON.parse(data));
  });
}

//@async
var portScan = function(port, hostname, callback){
  portscanner.checkPortStatus(port, hostname, function(error, status) {
    // Status is 'open' if currently in use or 'closed' if available
    callback(null, status);
  });
}

var clientTypeFilter = function(elem){
  if(this.filter.indexOf(elem[this.field])!=-1){
    return true;
  }
  return false;
}

var setColorTag = function(content){
  for(i in content.data){
    for(j in content.data[i]){
      if(content.data[i][j] == 'UP'){
        content.data[i][j] = '{green-fg}UP{/}';
      }
      if(content.data[i][j] == 'DOWN'){
        content.data[i][j] = '{red-fg}DOWN{/}';
      }
    }
  }
  return content;
}

/**
Return an array with unique element
*/
var uniq = function(tab){
  var res = tab.filter(function(elem, index) {
    return tab.indexOf(elem) == index;
  });
  return res;
}


var stdin = function(fn){
  var data = '';

  process.stdin.setEncoding('utf8');
  process.stdin.on('readable', function() {
    var chunk = process.stdin.read();
    if (chunk !== null) data += chunk;
  });

  process.stdin.on('end', function() {
    fn(null, JSON.parse(data));
  });
}

/////////////////////////////////////////////

var splitClientNameFromService = function(tab){
  var res = [];
  for(i in tab){
    res.push(tab[i].split(':'));
  }
  return res;
}

var extractField = function(tab, field){
  var res = [];
  for(obj in tab){
    res.push(obj[field]);
  }
  return res;
}

exports.portScan = portScan;
exports.requestJSON = requestJSON;
exports.requestXML = requestXML;
exports.xmlToJSON = xmlToJSON;
exports.fileToJSON = fileToJSON;
exports.setColorTag = setColorTag;
exports.uniq = uniq;
exports.extractField = extractField;
exports.clientTypeFilter = clientTypeFilter;
exports.stdin = stdin;
