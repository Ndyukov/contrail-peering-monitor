var common = require('./common.js');

var ViewState = function(){
  this.type = 'ViewState';
  this.error = null;
  this.nbFrames = 0;
  this.vRoutersInError = 0;
}

ViewState.prototype.update = function(contrailSet){
  this.error = contrailSet.error;
  this.nbFrames = contrailSet.configSet.nodes.length+
  contrailSet.controlSet.nodes.length*2;
  this.vRoutersInError = common.parsevRoutersInError(contrailSet.vRouterSet)
  .data.length;
};

ViewState.prototype.hasChanged = function(contrailSet){
  if((this.error != contrailSet.error) ||
  (this.nbFrames != contrailSet.configSet.nodes.length+
  contrailSet.controlSet.nodes.length*2) ||
  (this.vRoutersInError != common.parsevRoutersInError(contrailSet.vRouterSet)
  .data.length)){
    return true;
  }
  return false;
};

module.exports = ViewState;
