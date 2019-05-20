#!/usr/bin/env node

'use strict';

const ShikiActor = require('../index');
const commander = require('commander');

commander
  .version('0.1.0', '-v, --version')
  .option('-k, --apikey <value>', 'apikey see: https://cloud.voicetext.jp/webapi')
  .option('-p, --profile <csv>', 'actors profile file path')
  .option('-s, --script <csv>', 'script file path')
  .option('-o, --output <dirname>', 'output dir')
  .action(run)
  .parse(process.argv)

async function run() {
  if (commander.apikey && commander.profile && commander.script && commander.output) {
    const shiki = new ShikiActor(commander.profile, commander.script, commander.apikey);
    await shiki.init();
    await shiki.play();
    shiki.write(commander.output);
  } else {
    console.log('arguments too less.');
  }
}