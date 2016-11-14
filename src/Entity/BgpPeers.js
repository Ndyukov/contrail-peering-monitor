var BgpPeers = function(source, introspec){
  this.type = 'BgpPeers';
  this.source = source;
  this.peers = [];
}

var BgpPeer = function(name, asn, type, state){
  this.name = name;
  this.asn = asn;
  this.type = type;
  this.state = state;
}

var parseIntrospecBgpPeer = function(introspecJSON){
  var peers = [];
  var bgpJSON = introspecJSON['ShowBgpNeighborSummaryResp']['neighbors'][0]['list'][0]['BgpNeighborResp'];
  for(var i in bgpJSON){
    if(bgpJSON[i].encoding[0]._ == 'BGP'){
      peers.push(new BgpPeer(bgpJSON[i].peer[0]._, bgpJSON[i].peer_asn[0]._, bgpJSON[i].peer_type[0]._, bgpJSON[i].state[0]._));
    }
  }
  return peers;
}

BgpPeers.prototype.update = function(introspecJSON){
  var bgp = parseIntrospecBgpPeer(introspecJSON.data);
  this.peers = bgp;
}

module.exports = BgpPeers;
