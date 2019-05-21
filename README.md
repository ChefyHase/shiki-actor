# shiki-actor

VoiceText Web API(https://cloud.voicetext.jp/webapi) を使用して、csvの台本に沿って音声を生成する。

## Requirement

- Node.js (v12.1.0)
- VoiceText Web APIキー (https://cloud.voicetext.jp/webapi/docs/introduction)

## Usage

1.  話者のプロフィール(profile.csv)と台本(script.csv)から音声生成:
  ```console
  $ shiki-actor -p path/to/profile.csv -s path/to/script.csv
  ```

## Installation
```console
$ sudo npm install shiki-actor -g
```
