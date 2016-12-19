var async = require('async');
var util = require('util');
var unirest = require('unirest');
var externalConfig = require('../config/contrail-peering-monitor.json');

var TIME_DIFF = 500;

global.config = {
  discovery : null,
  analytics : null,
  timeout : 5000,
  refreshTime : 5500,
  vrouter : null
};

var initFromExtConfig = function(){
  global.config.discovery = externalConfig.location["contrail-discovery"];
}

var initFromEnv = function(){
  global.config.discovery = process.env.CONTRAIL_DISCOVERY_URL ||
  process.env.CONTRAIL_DISCOVERY ||
  process.env.CONTRAIL_DISCO_URL ||
  process.env.CONTRAIL_DISCO ||
  process.env.DISCOVERY_URL || global.config.discovery;
}

var initFromOptions = function(program){
  if(program.discovery){
    global.config.discovery = program.discovery;
  }
  if(program.analytics){
    global.config.analytics = program.analytics;
  }
  if(program.timeout && program.refreshTime){
    global.config.timeout = program.timeout;
    global.config.refreshTime = program.refreshTime;
  }
  else if(program.timeout && ! program.refreshTime){
    global.config.timeout = program.timeout;
    global.config.refreshTime = global.config.timeout + TIME_DIFF;
  }
  else if(!program.timeout && program.refreshTime){
    global.config.refreshTime = program.refreshTime;
    global.config.timeout = global.config.refreshTime - TIME_DIFF;
  }
  if(program.vrouter){
    global.config.vrouter = program.vrouter;
  }
}

var checkConfig = function(){
  if(!global.config.discovery){
    console.log('You have to precise DISCOVERY');
    process.exit(1);
  }
  if(global.config.timeout >= global.config.refreshTime){
    console.log('Timeout (default=5000ms) must be smaller than refresh-time (default=5500ms)');
    process.exit(1);
  }
}

exports.initFromExtConfig = initFromExtConfig;
exports.initFromOptions = initFromOptions;
exports.initFromEnv = initFromEnv;
exports.checkConfig = checkConfig;
//global.CONFIG = CONFIG;
