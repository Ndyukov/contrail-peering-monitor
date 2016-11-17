var async = require('async');

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
    for(s in sets){
      if(sets[s] == "controlSet"){
        var controlSet = global.contrailSet[sets[s]].nodes;
        for(var node in controlSet){
          delete controlSet[node].introspecControlClient;
        }
      }
      if(sets[s] == "vRouterSet"){
        var vRouterSet = global.contrailSet[sets[s]].nodes;
        for(var node in vRouterSet){
          delete vRouterSet[node].introspecVRouterClient;
        }
      }
      console.log(JSON.stringify(global.contrailSet[sets[s]]));
    }
  });
}

exports.run = run;
