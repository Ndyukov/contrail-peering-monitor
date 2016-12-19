var async = require('async');
var ContrailSet = require('./Set/ContrailSet');

var init = function(){
  global.contrailSet = new ContrailSet(global.config.discovery);
}

var fetchContrailSet = function(callback){
  async.waterfall([
    function(callback){
      global.contrailSet.update(callback);
    }
  ], function(err){
    callback(null);
  });
}

var fetchVRouter = function(hostname, callback){
  var metadata = {
    type : "VRouterDetailsNode",
    args : {
      hostname : hostname
    }
  }
  async.waterfall([
    function(callback){
      global.contrailSet.augment(metadata, callback);
    }
  ], function(err){
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
      if(sets.indexOf("vRouterDetailsNode")==-1){
        callback(null);
      }
      else{
        fetchVRouter(global.config.vrouter, callback);
      }
    },
    function(callback){
      if(sets.indexOf("controlSet")!=-1 || sets.indexOf("vRouterSet")!=-1 || sets.indexOf("configSet")!=-1){
        fetchContrailSet(callback);
      }
      else{
        callback(null);
      }
    }
  ],function(err, res){
    if(sets.indexOf("controlSet")!=-1){
      var controlSet = global.contrailSet["controlSet"].nodes;
      for(var node in controlSet){
        delete controlSet[node].introspecControlClient;
      }
    }
    if(sets.indexOf("vRouterSet")!=-1){
      var vRouterSet = global.contrailSet["vRouterSet"].nodes;
      for(var node in vRouterSet){
        delete vRouterSet[node].introspecVRouterClient;
      }
    }
    if(sets.indexOf("vRouterDetailsNode")!=-1){
      var vRouter = global.contrailSet["vRouterDetailsNode"];
      delete vRouter.introspecVRouterDetailsClient;
    }
    for(s in sets){
      console.log(JSON.stringify(global.contrailSet[sets[s]]));
    }
  });
}

exports.run = run;
