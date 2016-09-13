var program = require('commander');
var exec = require('child_process');

var YUI_CONFIG = './config/yuidoc.json'
var YUI = './node_modules/yuidocjs/lib/cli.js'
var OUTPUT_DIR = './doc'

var parse = function(){
  program
  .version('1.2.0');

  program
  .command('monitor')
  .description('Run the monitoring on the Contrail cluster')
  .option('-d, --discovery <hostname>', 'Discovery service address')
  //.option('-a, --analytics <hostname>', 'Analytics address')
  .option('-t, --timeout <time>', 'Request timeout', parseInt)
  .option('-r, --refresh-time <time>', 'Interval to refresh data (in ms)',
  parseInt)
  .action(function(options){
    var init = require('./init');
    var monitor = require('./monitor');

    init.initFromExtConfig();
    init.initFromEnv();
    init.initFromOptions(program);
    init.checkConfig();
    monitor.run();
  });

  program
  .command('dump')
  .description('Dump a json object representing the monitoring information '+
  'cluster at a given time')
  .option('-d, --discovery <hostname>', 'Discovery service address')
  .option('--cnf, --config-set', 'Configuration Nodes')
  .option('--ctl, --control-set', 'Control Nodes')
  .option('--vr, --vrouter-set', 'VRouters')
  .action(function(options){
    var init = require('./init');
    var dump = require('./dump');
    var sets = [];

    init.initFromExtConfig();
    init.initFromEnv();
    init.initFromOptions(program);
    init.checkConfig();

    if(options.configSet) sets.push('configSet');
    if(options.controlSet) sets.push('controlSet');
    if(options.vrouterSet) sets.push('vRouterSet');

    if(!sets) console.log('No options provided !');

    dump.run(sets);
  });

  program
  .command('doc')
  .description('Generate documentations')
  .action(function(){
    var args = ['--config', YUI_CONFIG, '--outdir', OUTPUT_DIR, '.'];
    exec.execFile(YUI, args, {}, function(){
      console.log("Documentation generation done.");
    });
  });

  program.parse(process.argv);
}

exports.parse = parse;
