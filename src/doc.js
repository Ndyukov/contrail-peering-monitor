var exec = require('child_process');

var YUI_CONFIG = './config/yuidoc.json'
var YUI = './node_modules/yuidocjs/lib/cli.js'
var OUTPUT_DIR = './doc'

var run = function(){
  var args = ['--config', YUI_CONFIG, '--outdir', OUTPUT_DIR, '.'];
  exec.execFile(YUI, args, {}, function(){
    console.log("Documentation generation done.");
  });
}

exports.run = run;
