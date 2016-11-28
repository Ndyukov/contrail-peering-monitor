/**
 * Entity Module
 *
 * @module Entity
 */

 /**
 * XmppPeer description ...
 *
 * @class XmppPeer
 * @constructor
 */

var XmppPeer = function(){
  this.type = 'XmppPeer';
  this.active = '';
  this.backup = '';
}

var parseIntrospecXmppPeer = function(introspecJSON){
  var xmpp = {
    active: null,
    backup: null
  };
  var status = null;
  var xmppPeer = introspecJSON['AgentXmppConnectionStatus']['peer'][0]['list'][0]['AgentXmppData'];
  for(i in xmppPeer){
    status = 'Backup';
    if(xmppPeer[i]['cfg_controller'][0]['_'] == 'Yes'){
      xmpp.active = xmppPeer[i]['controller_ip'][0]['_'];
      continue;
    }
    if(xmppPeer[i]['cfg_controller'][0]['_'] == 'No'){
      xmpp.backup = xmppPeer[i]['controller_ip'][0]['_'];
      continue;
    }
  }
  return xmpp;
}

var ipToHostnameXmpp = function(xmppPeer, controlList){
  for(i in controlList){
    if(xmppPeer.active == controlList[i].ipAddress){
      xmppPeer.active = controlList[i].name;
    }
    if(xmppPeer.backup == controlList[i].ipAddress){
      xmppPeer.backup = controlList[i].name;
    }
  }
  return xmppPeer;
}

var updateXmpp = function(introspecJSON, controlList){
  var xmppPeer = parseIntrospecXmppPeer(introspecJSON);
  xmppPeer = ipToHostnameXmpp(xmppPeer, controlList);
  return xmppPeer;
}

XmppPeer.prototype.update = function(introspecJSON, controlList){
  var xmpp = updateXmpp(introspecJSON, controlList);
  this.active = xmpp.active;
  this.backup = xmpp.backup;
}

module.exports = XmppPeer;
