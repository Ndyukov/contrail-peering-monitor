var program = require('commander');

var parse = function(){
  program
  .version('1.3.6');

  program
  .command('monitor')
  .description('Run the monitoring dashboard on the Contrail cluster')
  .option('-d, --discovery <hostname>', 'Discovery service address')
  //.option('-a, --analytics <hostname>', 'Analytics address')
  .option('-t, --timeout <time>', 'Request timeout (in ms)', parseInt)
  .option('-r, --refresh-time <time>', 'Interval to refresh data (in ms)',
  parseInt)
  .action(function(options){
    var init = require('./init');
    var monitor = require('./monitor');

    init.initFromExtConfig();
    init.initFromEnv();
    init.initFromOptions(options);
    init.checkConfig();
    monitor.run();
  });

  program
  .command('dump')
  .description('Dump a json object representing the monitoring state of the '+
  'cluster at a given time')
  .option('-d, --discovery <hostname>', 'Discovery service address')
  .option('--cnf, --config-set', 'Configuration Nodes')
  .option('--ctl, --control-set', 'Control Nodes')
  .option('--vrs, --vrouter-set', 'VRouters Set')
  .option('--vr, --vrouter <hostname>', 'VRouter address')
  .action(function(options){
    var init = require('./init');
    var dump = require('./dump');
    var sets = [];

    init.initFromExtConfig();
    init.initFromEnv();
    init.initFromOptions(options);
    init.checkConfig();

    if(options.configSet) sets.push('configSet');
    if(options.controlSet) sets.push('controlSet');
    if(options.vrouterSet) sets.push('vRouterSet');
    if(options.vrouter) sets.push('vRouterDetailsNode');

    if(!sets) console.log('No options provided !');

    dump.run(sets);
  });

  program
  .command('doc')
  .description('Generate documentations')
  .action(function(){
    var doc = require('./doc');
    doc.run();
  });

  program.parse(process.argv);
}

exports.parse = parse;
