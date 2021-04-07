---
layout: page
title: Memo
permalink: /memo/
toc: true
---

## javascript
　javascript というか想像以上にサーバー関連がわからない。

### 非同期
- Ajax
- XMLHttpRequest
- Fetch api
- axios

### Storage
- Local Storage 
  - 永続的
  - javascript
- Session Storage
  - タブやウィンドウを閉じたら
  - javascript
- Cookie
  - タブやウィンドウを閉じたら or 期限指定可
  - サーバー言語っぽい

## APIサーバー
　自前のAPIサーバーが欲しいがよくわからない。github pages からアクセスできるのがあると便利そうだと思って調べたが迷宮入り。

- httpd
  - apache とか nginx とかで多分やる
- firewall
  - 受信規則で特定ポートを許可する必要が多分ある
- ipAddres（固定/動的）
  - ipconfig -> ipv4 : プライベートIPアドレス(LAN)
  - Router の ipv4 : グローバルIPアドレス(WAN) : from プロバイダ
- 名前解決
  - 127.0.0.1 localhost : ローカル（C:\Windows\System32\drivers\etc\hosts）
  - DNSサーバー様 : グローバル（登録してつかうっぽい）
- ※
  - 自前のAPIサーバーを別で立てる場合はCORSを考慮する必要あり
    - html の script タグで CDN から提供されているライブラリを呼び出す時には CORS を気にしなくて良い。

### CORS
- 概要
  - 自分と異なるオリジン（プロトコル://ドメイン:ポート）にリクエストすることを標準で制限
  - 単純リクエストはCORSの制約を受けず全てのドメインからアクセス出来る(Access-Control-Allow-Origin: *)
  - プリフライトリクエストはCORSの制約を受ける
- 解除
  - サーバー側でクライアントのオリジンを許可するヘッダーを付与すると制約を解除できる
  - CORS の制約を受ける場合は一旦サーバーを経由して解除しないといけない（クライアントだとヘッダー付与できない）
- WebAPI
  - CORS 制約あり（あった）
    - にこにこの api/v2/snapshot
  - CORS 制約なし（なかった）
    - Youtube Data API
      - APIキーを利用。（認証方式は CORS には関係ない、かな）
- おまけ
  - JSONP
    - script タグにコールバックを仕込む荒業。あぶないけどおもしろい。
  - chrome extension
    - CORS を無視できるのがある。あぶない。
  - chrome の security を外す
    - オプションに指定すると外せる。あぶ。

## すとりーみんぐ
　仕組みよくわからないけど視聴してるよね。調べても分からん。

### プロトコル
- RTMP
- HLS
- MPEG-DASH
- SRT
- WebRTC

### 動画形式（映像コンテナ）
- WMV
- FLV

### コーデック
- H.264 (AVC = Advanced Video Coding)
- H.265 (HEVC = High Efficiency Video Coding)
  
### とどけかた
- 1
  - OBS で RTMP
  - 準備:
    - ローカルホストでサーバー立ち上げ
    - ポート開放
  - 送信:
    - ローカルホストに映像を送信
  - 受信:
    - グローバルIPアドレスを直接指定して受信
- 2
  - OBS で
  - 送信: 
    - ライブストリーミングサイトに映像を送信
  - 受信:
    - ユーザーはライブストリーミングサイトを経由して受信

