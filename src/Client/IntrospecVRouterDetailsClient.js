var async = require('async');
var util = require('util');
var utils = require('../utils');
/**
* Client Module
*
* @module Client
*/

/**
* IntrospecVRouterDetailsClient description ...
*
* @class IntrospecVRouterDetailsClient
* @constructor
* @param {String} name name
*/
var IntrospecVRouterDetailsClient = function(name){
  var url_pattern = "http://"+name+":8085/"; // localhost --> name
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
  this.path['Snh_VrfListReq']= {
    data : {},
    error : false,
    url : url_pattern+"Snh_VrfListReq"
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
IntrospecVRouterDetailsClient.prototype.getDataFromPath = function(path, callback){
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
* IntrospecVRouterDetailsClient get description
*
* @async
* @method get
* @param {Function} callback callback function
*/
IntrospecVRouterDetailsClient.prototype.get = function(callback){
  var self = this;
  async.forEachOf(self.path, function(item, key, callback){
    //console.log('ITEM :'+key);
    self.getDataFromPath(key, callback);
  }, function(err){
    callback(null);
  });
}

/**
* IntrospecVRouterDetailsClient toString description
*
* @method toString
* @return {String} IntrospecVRouterDetailsClient string description
*/
IntrospecVRouterDetailsClient.prototype.toString = function(){
  return "##########################\n# IntrospecVRouterDetailsClient #\n##########################\nName: "+this.name+"\nData:"+util.inspect(this.path, false, null, true);
}

// main code
var main = function(){
  var introspec = new IntrospecVRouterDetailsClient('localhost');
  async.waterfall([
    function(callback){
      introspec.get(callback);
    }
  ],function(err){
    console.log(JSON.stringify(introspec));
  });
}

if (require.main === module) {
  main();
}

module.exports = IntrospecVRouterDetailsClient;
