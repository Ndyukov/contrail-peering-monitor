var blessed = require('blessed');
var contrib = require('blessed-contrib');
var async = require('async');
var utils = require('../src/utils');
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
  self.clusterView = new ClusterView(data);
  screen.append(self.clusterView.view);
}

var updateView = function(self, data){
  //self.clusterView = new ClusterView(data);
  self.clusterView.update(data);
  //screen.append(self.clusterView.view);
}

var cleanView = function(nodeView){
  nodeView.view.destroy();
}

var renderView = function(){
  screen.render();
}

View.prototype.update = function(contrailSet){
  var data = contrailSet;
  if(this.clusterView == null){
    global.screen.log('View Null');
    createView(this, data);
  }
  else if(hasChanged(this, data)){
    global.screen.log('Has changed');
    cleanView(this.clusterView);
    createView(this, data);
  }
  global.screen.log('update');
  updateView(this, data);
  renderView();
}

var screen = blessed.screen({
  smartCSR: true,
  log: 'log/view.log'
});

global.screen = screen;

screen.key(['escape', 'q', 'C-c'], function(ch, key) {
   return process.exit(0);
});

module.exports = View;
