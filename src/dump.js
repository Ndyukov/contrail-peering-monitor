var async = require('async');
var util = require('util');

var ContrailSet = require('./Set/ContrailSet');

var init = function(){
  global.contrailSet = new ContrailSet(global.config.discovery);
}

var update = function(callback){
  async.waterfall([
    function(callback){
      global.contrailSet.update(callback);
    }
  ], function(err){
    //console.log('UPDATE');
    callback(null);
  });
}

var run = function(sets){
  async.waterfall([
    function(callback){
      init();
      callback(null);
    },
    function(callback){
      update(callback);
    }
  ],function(err, res){
    //global.contrailSet.configSet;
    for(s in sets){
      console.log(JSON.stringify(global.contrailSet[sets[s]]));
    }
  });
}

exports.run = run;
