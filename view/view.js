var blessed = require('blessed');
var contrib = require('blessed-contrib');
var async = require('async');

var utils = require('../src/utils');
var KeyHandler = require('./KeyHandler');
var ViewState = require('./ViewState');
var ContrailSetView = require('./ContrailSetView');
var ClusterView = require('./ClusterView');

var View = function(eventEmitter){
  this.eventEmitter = eventEmitter;
  this.type = 'View';
  this.clusterView = null;
  this.state = new ViewState();
  //this.eventEmitter.on('updated', this.update);
}

var hasChanged = function(self, contrailSet){
  if(self.state.hasChanged(contrailSet)){
    return true;
  }
  return false;
}

var createView = function(self, data){
  // Create the view
  self.clusterView = new ClusterView(data);
  screen.append(self.clusterView.view);
  // Update the view state
  self.state.update(data);
}

var updateView = function(self, data){
  self.clusterView.update(data);
}

var cleanView = function(nodeView){
  kh.clear();
  nodeView.view.destroy();
}

var renderView = function(){
  screen.render();
}

View.prototype.update = function(contrailSet){
  var data = contrailSet;
  if(this.clusterView == null){
    createView(this, data);
  }
  else if(hasChanged(this, data)){
    cleanView(this.clusterView);
    createView(this, data);
  }
  updateView(this, data);
  renderView();
}

// Initiate the screen object
var screen = blessed.screen({
  smartCSR: true,
  //log: 'log/view.log'
});

// Initiate the keyboard handler
var kh = new KeyHandler();
kh.setupHandler(screen);

global.screen = screen;
global.kh = kh;

module.exports = View;
