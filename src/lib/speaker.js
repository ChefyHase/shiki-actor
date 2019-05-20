'use strict';

const Voice = require('voicetext');

class Speaker {
  constructor(name, core) {
    this.core = core;
    this.name = name;

    this.indices = this.getIndices();

    this.quoteIndex = 0;
  }

  getIndices() {
    const script = this.core.script;
    const indices = [];

    for (const id in script) {
      let name = script[id].Actor;
      if (name === this.name) {
        indices.push(id);
      }
    }

    return indices;
  }

  say() {
    return new Promise((resolve, reject) => {
      if (this.indices.indexOf(`${this.quoteIndex}`) > -1) {

        const script = this.core.script[this.quoteIndex];
        const profile = this.core.profiles[this.name];

        const voice = new Voice(this.core.apikey);

        let speaker;
        switch (profile.Voice) {
          case 'hikari':
            speaker = voice.SPEAKER.HIKARI;
            break;
          case 'haruka':
            speaker = voice.SPEAKER.HARUKA;
            break;
          case 'takeru':
            speaker = voice.SPEAKER.TAKERU;
            break;
          default:
            speaker = voice.SPEAKER.HARUKA;
        }

        let emotion;
        switch (script.Emotion) {
          case 'A':
            emotion = voice.EMOTION.ANGER;
            break;
          case 'S':
            emotion = voice.EMOTION.SADNESS;
            break;
          case 'H':
            emotion = voice.EMOTION.HAPPINESS;
            break;
          default:
            emotion = '';
        }

        voice.speaker(speaker)
          .emotion(emotion)
          .emotion_level((script.Level !== '') ? script.Level : 2)
          .pitch(profile.Pitch)
          .speed(profile.Speed)
          .volume(100)
          .speak(script.Quote, (e, buffer) => {
            if (e) reject(e);
            resolve(buffer);
          });
      } else {
        resolve();
      }
    });
  }

  update() {
    this.quoteIndex++;
  }
}

module.exports = Speaker;