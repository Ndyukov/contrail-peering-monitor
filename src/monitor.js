var async = require('async');
var util = require('util');
var EventEmitter = require('events').EventEmitter;

var ContrailSet = require('./Set/ContrailSet');
var View = require('../view/view.js');

var eventEmitter = new EventEmitter();
var init = function(){
  global.contrailSet = new ContrailSet(global.config.discovery, eventEmitter);
  global.view = new View(eventEmitter);
}

var update = function(callback){
  async.waterfall([
    function(callback){
      global.contrailSet.update(callback);
    },
    function(callback){
      global.view.update(global.contrailSet);
      callback(null);
    }
  ], function(err){
    //console.log('UPDATE');
    callback(null);
  });
}

var run = function(){
  async.waterfall([
    function(callback){
      init();
      callback(null);
    },
    function(callback){
      update(callback);
    },
    function(callback){
      setInterval(function(){
        update(callback);
      },
      global.config.refreshTime);
    }
  ],function(err, res){
    //console.log(JSON.stringify(global.contrailSet.configSet));
  });
}

exports.run = run;
