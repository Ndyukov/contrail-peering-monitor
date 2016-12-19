var async = require('async');
var utils = require('../utils');
var IntrospecVRouterDetailsClient = require('../Client/IntrospecVRouterDetailsClient');
var VrfList = require('../Entity/VrfList');
/**
 * Node Module
 *
 * @module Node
 */

/**
 * VRouterDetailsNode description ...
 *
 * @class VRouterDetailsNode
 * @constructor
 * @param {String} name name
 */
var VRouterDetailsNode = function(name){
  /**
  * @property name
  * @type String
  */
  this.name = name;
  /**
  * @property type
  * @type String
  */
  this.type = 'VRouterDetailsNode';
  /**
  * @property introspecVRouterDetailsClient
  * @type Object
  */
  this.introspecVRouterDetailsClient = new IntrospecVRouterDetailsClient(name);
  /**
  * @property vrfList
  * @type VrfLists
  */
  this.vrfList = new VrfList();
}

/**
* updateFromIntrospec description
*
* @method updateFromIntrospec
* @param {Object} controlList an object
*/
VRouterDetailsNode.prototype.updateFromIntrospec = function(callback){
  var introspec = this.introspecVRouterDetailsClient.path['Snh_VrfListReq'];
  if(!introspec.error){
    this.vrfList.update(introspec.data);
  }
  callback(null);
}


/**
* getIntrospec description
*
* @async
* @method getIntrospec
* @param {Function} callback callback function
*/
VRouterDetailsNode.prototype.getIntrospec = function(callback){
  var self = this;
  self.introspecVRouterDetailsClient.get(callback);
}

var main = function(){
  var vRouterDetailsNode = new VRouterDetailsNode('localhost');
  vRouterDetailsNode.getIntrospec(function(){
    vRouterDetailsNode.updateFromIntrospec();
    delete vRouterDetailsNode.introspecVRouterDetailsClient;
    console.log(JSON.stringify(vRouterDetailsNode));
  });
}

if (require.main === module) {
  main();
}

module.exports = VRouterDetailsNode;
