var blessed = require('blessed');
var contrib = require('blessed-contrib');
var util = require('util');
var utils = require('../src/utils');
var ConfigSetView = require('./ConfigSetView');
var ControlSetView = require('./ControlSetView');
var VRouterSetView = require('./VRouterSetView');

var ContrailSetView = function(contrailSet, width, offset){
  this.data = contrailSet;
  this.type = 'ContrailSetView';
  this.view = initView(width, offset);
  this.children = [];
  this.init();
}

var initView = function(width, offset){
  var box = blessed.box({
    width: width+'%',
    height: '100%',
    left: offset+'%',
    style: {
      fg: 'white',
      border: {
        fg: '#f0f0f0'
      }
    }
  });
  return box;
}

ContrailSetView.prototype.init = function(screen){
  var offset = (100/3);
  this.children.push(new ConfigSetView(this.data.configSet, offset, 0*offset));
  this.children.push(new ControlSetView(this.data.controlSet, offset, 1*offset));
  this.children.push(new VRouterSetView(this.data.controlSet,
    this.data.vRouterSet, offset, 2*offset));
  for(i in this.children){
    this.view.append(this.children[i].view);
  }
}

ContrailSetView.prototype.append = function(screen){
  screen.append(this.view);
}

ContrailSetView.prototype.update = function(data){
  this.data = data;
  for(i in this.children){
    if(this.children[i].type == 'ConfigSetView'){
      this.children[i].update(data.configSet);
    }
    else if(this.children[i].type == 'ControlSetView'){
      this.children[i].update(data.controlSet);
    }
    else if(this.children[i].type == 'VRouterSetView'){
      this.children[i].update(data.controlSet, data.vRouterSet);
    }
  }
}

module.exports = ContrailSetView;
