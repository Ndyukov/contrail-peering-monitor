/**
 * Entity Module
 *
 * @module Entity
 */

 /**
 * IfmapPeer description ...
 *
 * @class IfmapPeer
 * @constructor
 */

var IfmapPeer = function(){
  this.type = 'IfmapPeer';
  this.current = '';
  this.peer = [];
}

var parseIntrospecIfmap = function(introspecJSON){
  var status = null;
  var ifmapJSON = introspecJSON['IFMapPeerServerInfoResp']['ds_peer_info'][0];
  var ifmap = {
    peer: [],
    current: null
  };
  var ifmapPeer = ifmapJSON['IFMapDSPeerInfo'][0]['ds_peer_list'][0]['list'][0]['IFMapDSPeerInfoEntry'];
  for(i in ifmapPeer){
    status = 'Backup';
    if(JSON.parse(ifmapPeer[i]['in_use'][0]['_'])) status = 'Active';
    ifmap.peer.push({host: ifmapPeer[i]['host'][0]['_'], status: status});
  }
  ifmap.current = ifmapJSON['IFMapDSPeerInfo'][0]['current_peer'][0]['_'].split(':')[0];
  return ifmap;
}

var ipToHostnameIfmap = function(ifmapPeer, configList){
  // Check ifmap.peer
  for(i in ifmapPeer.peer){
    for(j in configList){
      if(ifmapPeer.peer[i].host == configList[j].ipAddress){
        ifmapPeer.peer[i].host = configList[j].name;
        break;
      }
    }
  }
  // Check ifmap.current
  for(j in configList){
    if(ifmapPeer.current == configList[j].ipAddress){
      ifmapPeer.current = configList[j].name;
      break;
    }
  }
  return ifmapPeer;
}

var updateIfmap = function(introspecJSON, configList){
  var ifmapPeer = parseIntrospecIfmap(introspecJSON);
  ifmapPeer = ipToHostnameIfmap(ifmapPeer, configList);
  return ifmapPeer;
}

IfmapPeer.prototype.update = function(introspecJSON, configList){
  var ifmap = updateIfmap(introspecJSON, configList);
  this.current = ifmap.current;
  this.peer = ifmap.peer;
}

module.exports = IfmapPeer;
