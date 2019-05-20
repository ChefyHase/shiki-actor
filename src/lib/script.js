'use strict';

const csv = require('csvtojson');
const fs = require('fs');

const Speaker = require('./speaker.js');

class Script {
  constructor(profileFile, scriptFile, apikey) {
    this.profileFile = profileFile;
    this.profiles;
    this.scriptFile = scriptFile;
    this.script;
    this.apikey = apikey;

    this.speakers = {};

    this.buffer = [];
  }

  async init() {
    this.profiles = await this.loadProfile(this.profileFile);
    this.script = await this.loadScript(this.scriptFile);
    this.summonSpeakers();
  }

  summonSpeakers() {
    for (const id in this.profiles) {
      this.speakers[id] = new Speaker(id, this);
    }
  }

  async loadProfile(file) {
    const json = await csv().fromFile(file);
    const obj = {};

    for (const j of json) {
      const actor = j.Actor;
      obj[actor] = j;
    }

    return obj;
  }

  async loadScript(file) {
    const json = await csv().fromFile(file);
    const obj = {};

    for (let i = 0; i < json.length; i++) {
      obj[i] = json[i];
    }

    return obj;
  }

  async play() {
    for (let s in this.script) {
      for (const id in this.speakers) {
        let res = await this.speakers[id].say();
        this.speakers[id].update();

        if (res) this.buffer.push(res);
      }
    }
  }

  write(dir) {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);

    for (let i = 0; i < this.buffer.length; i++) {
      let buffer = this.buffer[i];
      fs.writeFileSync(`${dir}/${i}.wav`, buffer);
    }
  }
}

module.exports = Script;