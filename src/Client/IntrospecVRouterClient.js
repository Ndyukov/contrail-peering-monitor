var async = require('async');
var util = require('util');
var utils = require('../utils');
/**
* Client Module
*
* @module Client
*/

/**
* IntrospecVRouterClient description ...
*
* @class IntrospecVRouterClient
* @constructor
* @param {String} name name
*/
var IntrospecVRouterClient = function(name){
  /**
  * @property name
  * @type String
  */
  this.name = name;
  /**
  * @property path
  * @type Object
  */
  this.path = {};
  this.path['/Snh_AgentXmppConnectionStatusReq']= {
    data : {},
    error : false,
    url : "http://"+name+":8085/Snh_AgentXmppConnectionStatusReq" // localhost --> name
  }
}

/**
* getDataFromPath description
*
* @async
* @method getDataFromPath
* @param {String} path path of something
* @param {Function} callback callback function
*/
IntrospecVRouterClient.prototype.getDataFromPath = function(path, callback){
  var self = this;
  self.path[path].error = false;
  async.waterfall([
    async.apply(utils.requestXML, self.path[path].url),
    utils.xmlToJSON,
    function(objJSON, callback){
      self.path[path].data = objJSON;
      callback(null);
    }
  ],function(err){
    if(err){
      self.path[path].error = true;
    }
    callback(null);
  });
}

/**
* IntrospecVRouterClient get description
*
* @async
* @method get
* @param {Function} callback callback function
*/
IntrospecVRouterClient.prototype.get = function(callback){
  var self = this;
  async.forEachOf(self.path, function(item, key, callback){
    //console.log('ITEM :'+key);
    self.getDataFromPath(key, callback);
  }, function(err){
    callback(null);
  });
}

/**
* IntrospecVRouterClient toString description
*
* @method toString
* @return {String} IntrospecVRouterClient string description
*/
IntrospecVRouterClient.prototype.toString = function(){
  return "##########################\n# IntrospecVRouterClient #\n##########################\nName: "+this.name+"\nData:"+util.inspect(this.path, false, null, true);
}

// main code
var main = function(){
  var introspec = new IntrospecVRouterClient('localhost');
  async.waterfall([
    function(callback){
      introspec.get(callback);
    }
  ],function(err){
    console.log(""+introspec);
  });
}

if (require.main === module) {
  main();
}

module.exports = IntrospecVRouterClient;
