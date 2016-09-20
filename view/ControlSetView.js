var blessed = require('blessed');
var contrib = require('blessed-contrib');
var util = require('util');
var utils = require('../src/utils');
var ControlNodeView = require('./ControlNodeView');

var ControlSetView = function(data, height, offset){
  this.data = data;
  this.type = 'ControlSetView';
  this.view = initView(height, offset);
  this.children = [];
  this.init();
}

var initView = function(height, offset){
  var box = blessed.box({
    top: offset+'%',
    width: '90%',
    left: '5%',
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

ControlSetView.prototype.init = function(){
  var nodes = this.data.nodes;
  var offset = (100/nodes.length);

  for(i in nodes){
    this.children.push(new ControlNodeView(nodes[i], offset, i*offset));
    this.view.append(this.children[i].view);
  }
}

ControlSetView.prototype.update = function(data){
  this.data = data;
  var nodes = this.data.nodes;

  for(i in nodes){
    this.children[i].update(nodes[i]);
  }
}

module.exports = ControlSetView;
