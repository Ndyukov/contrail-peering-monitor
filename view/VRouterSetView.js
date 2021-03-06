var blessed = require('blessed');
var contrib = require('blessed-contrib');
var util = require('util');
var utils = require('../src/utils');
var VRouterListView = require('./VRouterListView');

var VRouterSetView = function(controlData, vRouterData, height, offset){
  this.controlData = controlData;
  this.vRouterData = vRouterData;
  this.type = 'VRouterSetView';
  this.view = initView(height, offset);
  this.children = [];
  this.init();
}

var initView = function(height, offset){
  var box = blessed.box({
    top: offset+'%',
    width: '99%',
    left: '0%',
    height: height+'%',
    style: {
      fg: 'white',
      border: {
        fg: '#f0f0f0'
      }
    }
  });
  return box;
}

var parseData = function(data){

}

VRouterSetView.prototype.init = function(){
  var nodes = this.controlData.nodes;
  var offset = (100/nodes.length);

  for(i in nodes){
    this.children.push(new VRouterListView(nodes[i].name,this.vRouterData,
      offset, i*offset));
    this.view.append(this.children[i].view);
  }
};

VRouterSetView.prototype.append = function(screen){
  screen.append(this.view);
}

VRouterSetView.prototype.update = function(controlData, vRouterData){
  this.controlData = controlData;
  this.vRouterData = vRouterData;
  var nodes = this.controlData.nodes;

  for(i in nodes){
    this.children[i].update(nodes[i].name, this.vRouterData);
  }
}

module.exports = VRouterSetView;
