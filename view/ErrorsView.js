var blessed = require('blessed');
var contrib = require('blessed-contrib');
var util = require('util');
var utils = require('../src/utils');

var ErrorsView = function(vRouterSet, width, offset){
  this.vRouterSet = vRouterSet;
  this.type = 'ErrorsView';
  this.view = initView(width, offset);
}

var initView = function(width, offset){
  var table = contrib.table({
    keys: true,
    fg: 'white',
    selectedFg: 'white',
    selectedBg: 'blue',
    interactive: false,
    label: 'Nodes in error',
    left: offset+'%',
    width: width+'%',
    height: '100%',
    border: {type: "line", fg: "cyan"},
    columnSpacing: 5, //in chars
    columnWidth: [20, 25] /*in chars*/
  });
  return table;
}

var parsevRoutersInError = function(vRouterSet){
  var result = {
    headers: ['Nodes', 'Status'],
    data:[]
  };
  for(i in vRouterSet.nodes){
    var node = vRouterSet.nodes[i];
    if(node['services'][0]['status'] == 'DOWN'){
      result.data.push([node['name'], node['services'][0]['status']]);
    }
  }
  return result;
}

ErrorsView.prototype.append = function(screen){
  screen.append(this.view);
}

ErrorsView.prototype.isErrors = function(){
  var result = parsevRoutersInError(this.vRouterSet);
  if(result.data.length == 0){
    return false;
  }
  return true;
}

ErrorsView.prototype.update = function(data){
  this.vRouterSet = data;
  var dataSet = parsevRoutersInError(this.vRouterSet);
  dataSet = utils.setColorTag(dataSet);
  this.view.setData(dataSet);
}

var main = function(screen){
  var controlNode = 'd-octclc-0000';
  utils.stdin(function(err, data){
    var result = parsevRoutersInError(data);
    console.log('################\n# Parse Object #\n################\n'+
    require('util').inspect(result, { depth: null }));
  });
}

if (require.main === module) {
  main();
}

module.exports = ErrorsView;
