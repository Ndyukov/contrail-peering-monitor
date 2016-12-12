# Contrail Peering Monitor

## Install
    $ apt-get install nodejs
    $ git clone https://github.com/cloudwatt/contrail-peering-monitor
    $ npm install

## Usage
    $ cd ./contrail-peering-monitor
    $ vim samples/contrailrc # Edit the rc files if necessary
    $ . samples/contrailrc
    $ ./contrail-peering-monitor monitor

## Help
    $ ./contrail-peering-monitor --help

    Usage: contrail-peering-monitor [options] [command]


    Commands:

    monitor [options]   Run the monitoring dashboard on the Contrail cluster
    dump [options]      Dump a json object representing the monitoring state of the cluster at a given time
    doc                 Generate documentations

     Options:

    -h, --help     output usage information
    -V, --version  output the version number

## Keyboard
 * **Control + ⇨** : Move to the next frame
 * **Control + ⇦** : Move to the previous frame
 * **⇧** : Go up across the items
 * **⇩** : Go down across the items

## Version
  v.1.3.5

## Prerequisites
 * [nodejs v0.10.25] (https://nodejs.org/dist/v0.10.25/docs/)
 * [async](https://www.npmjs.com/package/async)
 * [commander.js](https://www.npmjs.com/package/commander)
 * [blessed](https://github.com/chjj/blessed)
 * [blessed-contrib](https://github.com/yaronn/blessed-contrib)
 * [unirest](https://www.npmjs.com/package/unirest)
 * [xml2js](https://www.npmjs.com/package/xml2js)
 * [portscanner](https://www.npmjs.com/package/portscanner)
 * [yuidocjs](http://yui.github.io/yuidoc/)
