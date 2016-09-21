var blessed = require('blessed');
var contrib = require('blessed-contrib');
var util = require('util');

var common = require('./common');
var utils = require('../src/utils');
var ContrailSetView = require('./ContrailSetView');
var ErrorsView = require('./ErrorsView');

var ClusterView = function(contrailSet){
  this.data = contrailSet;
  this.type = 'ClusterView';
  this.view = initView();
  this.children = [];
  this.init();
}

var initView = function(){
  var box = blessed.box({
    width: '100%',
    height: '100%',
    style: {
      fg: 'white',
      border: {
        fg: '#f0f0f0'
      }
    }
  });
  return box;
}

ClusterView.prototype.init = function(){
  var offset = (100/3);
  var width = 100;

  // check disco
  if(this.data.error){
    this.view.content = this.data.error;
    return 0;
  }

  // check nodes in error
  if(common.parsevRoutersInError(this.data.vRouterSet).data.length){
    width = 70;
    var errorView = new ErrorsView(this.data.vRouterSet, 99-width, width+1);
    this.children.push(errorView);
  }

  this.children.push(new ContrailSetView(this.data, width, 0));

  for(i in this.children){
    this.view.append(this.children[i].view);
  }
}

ClusterView.prototype.update = function(data){
  this.data = data;
  for(i in this.children){
    if(this.children[i].type == 'ErrorsView'){
      this.children[i].update(this.data.vRouterSet);
    }
    else{
      this.children[i].update(this.data);
    }
  }
}

module.exports = ClusterView;
