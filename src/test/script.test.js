'use strict';

require('dotenv').config();

const Script = require('../lib/script');
const profileFile = './src/test/profile.csv';
const scriptFile = './src/test/script.csv';
const script = new Script(profileFile, scriptFile, process.env.VOICETEXT_API_KEY);

test('init', async () => {
  await script.init();

  const profiles = script.profiles;
  const scripts = script.script;

  expect(profiles['Ran']).toMatchObject({
    "Actor": "Ran",
    "Pitch": "80",
    "Speed": "90",
    "Voice": "hikari"
  });

  expect(scripts['8']).toMatchObject({
    Actor: 'Chen',
    Quote: 'らん様ー!',
    Emotion: 'H',
    Level: ''
  });
});

test('summonSpeakers', () => {
  script.summonSpeakers();

  const speakers = script.speakers;

  expect(speakers['Ran'].name).toBe('Ran');
});

// test('play', async () => {
//   jest.setTimeout(30000);
//
//   await script.init();
//
//   let res = await script.play();
//
//   expect(script.buffer.length).toBe(10);
//
//   script.write('./output');
// });