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

exports.parsevRoutersInError = parsevRoutersInError;
