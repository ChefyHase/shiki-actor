#!/usr/bin/env node

'use strict';

const ShikiActor = require('../index');
const commander = require('commander');
const path = require('path');

commander
  .version('0.1.0', '-v, --version')
  .option('-p, --profile <csv>', 'Actors profile file path.')
  .option('-s, --script <csv>', 'Script file path')
  .option('-k, --apikey [value]', 'Api key. Use env "VOICETEXT_API_KEY" value by default.')
  .option('-o, --output [dirname]', 'Output dir. Default: ./output')
  .action(run)
  .parse(process.argv)

async function run() {
  if (commander.profile && commander.script) {
    let key = (commander.apikey) ? commander.apikey : process.env.VOICETEXT_API_KEY;
    if (key === undefined) {
      console.log('Api key is required.');
      commander.help();
      process.exit(1);
    }
    let output = (commander.output) ? path.resolve(commander.output) : './output';

    try {
      const shiki = new ShikiActor(commander.profile, commander.script, key);
      await shiki.init();
      await shiki.play();
      shiki.write(output);
    } catch (e) {
      throw e;
    }

  } else {
    commander.help();
  }
}