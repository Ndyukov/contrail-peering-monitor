var utils = require('../utils');

/**
 * Entity Module
 *
 * @module Entity
 */

 /**
 * VrfList description ...
 *
 * @class VrfList
 * @constructor
 */

var VrfList = function(){
  this.type = 'VrfList';
  this.vrfs = [];
}

var parseIntrospecVrfList = function(introspecJSON){
  var vrfs = [];
  vrf_table = introspecJSON['__VrfListResp_list']['VrfListResp'][0]['vrf_list'][0]['list'][0]['VrfSandeshData'];
  for(var i in vrf_table){
    vrfs.push(vrf_table[i]['name'][0]['_']);
  }
  return vrfs;
}

VrfList.prototype.update = function(introspecJSON){
  this.vrfs = parseIntrospecVrfList(introspecJSON);
}

var main = function(){
  var vrfList = new VrfList();
  utils.stdin(function(err, data){
    vrfList.update(data.path['Snh_VrfListReq'].data);
    console.log(JSON.stringify(vrfList));
  });
}

if (require.main === module) {
  main();
}

module.exports = VrfList;
