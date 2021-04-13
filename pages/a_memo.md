---
layout: page
title: Memo
permalink: /memo/
toc: true
---

## Storage
　保存場所

- Local Storage 
  - 永続的
  - javascript
- Session Storage
  - タブやウィンドウを閉じたら
  - javascript
- Cookie
  - タブやウィンドウを閉じたら or 期限指定可
  - サーバー言語っぽい

## Javascript
　謎。

### 非同期
- Ajax(Asynchronous JavaScript + XML)
  - ウェブブラウザ内で非同期通信を行いながらインターフェイスの構築を行うプログラミング手法
  - パーツ
    - XMLHttpRequest: ブラウザ上でサーバーとHTTP通信を行うためのAPI
    - Javascript: XMLHttpRequest が定義済み（組み込みオブジェクト）の言語
    - DOM: 文書の構造をメモリ内に表現, データを「ツリー構造」で持つ
      - HTML: html
      - XML: `<小説>人食いの鬼助</小説>` みたいな構造のやーつ
    - JSON: これを元に Javascript を使って HTML XML をメモリに表現した DOM をいじるのが一般的らしい。
- 種類
  - setTimeout
    - 最も基礎的
  - XMLHttpRequest
    - 標準搭載（原初）
    - コールバック地獄の問題
      - Promise/then によって解決出来る。
      - async/await によってさらに直感的になる。
  - JQuery
    - XMLHttpRequest のラッパー $.ajax
  - Fetch api
    - 標準搭載（Promiseによる実装）
      - XMLHttpRequest のように非同期通信可能
      - Promise による実装のため XMLHttpRequest より簡易に書ける
      - async/await でさらに直感的になる。
  - axios
    - Promiseを返すのラッパー

### Promise（, async/await）とは
XMLHttpRequest などで非同期通信を実装することを考える。

- 非同期通信
  - 非同期通信は実行順が書いた順にならない
  - 非同期通信完了後に実行したい処理はコールバック関数として渡しておくことにする。

ここで重要なのは、非同期通信完了後に実行したい処理が存在するということ。

#### 非同期通信完了後に処理を実行させるには
- コールバック
  - 関数を渡し、処理の最後に渡した関数を呼び出す（これがコールバック関数）
  - ただし、非同期通信を順番に連続して行いたい場合、コールバック地獄（ネストが深くなる）が発生。
  - これを解決するための仕組みが現れる。
- Promise 構文でもっと簡単に書ける！
  - コールバック地獄が見やすいコードになる。安心安全。
  - then: promise 実行
    - 成功(resolve): resolve を実行
    - 失敗(reject): reject を実行
  - ただし、通常のコード（同期通信）と比較すると、やはり見栄えが特殊。
  - これを解決するための仕組みが現れる。
- async/await 構文でもっと簡単に書ける！！
  - async: 非同期関数を定義する関数宣言。
  - await: Promiseの終了を待つようになる。async の中でのみ使える。非同期処理とは一体。
  - async function : 最終的に Promise を返す（これ注意）
    - 成功(戻り値あり): resolve する
    - 失敗(例外, throw): reject する
  - 非同期通信を同期通信の中でも違和感なく使える。非同期通信を同期通信かの如く書ける。

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

## リアルタイム双方向通信
### HTTPプロトコル でがんばる
- ポーリング
  - クライアントが一定間隔でサーバに問い合わせをし続ける
  - デメリット: 画面全部を取得し直してくるため無駄が多い
- Ajax
  - クライアントが一定間隔でサーバに問い合わせをし続ける
  - 画面の更新部分だけ取得してくる。
  - メリット: 無駄が減った
  - デメリット: 更新が無くても問い合わせること
- ロングポーリング（Comet）
  - サーバー側は更新があるまでリクエストに対してレスポンスを返さない
  - 更新があればレスポンスを返し、クライアントは再度リクエストを投げて通信を張る
    - レスポンスを返すとHTTP通信は通信を閉じてしまうため
  - メリット: 更新がない時は更新しない
  - デメリット: サーバーの更新頻度が早いと更新を正しく受け取れない場合がある・通信を張るコスト
- SSE(Server-Sent Event)
  - レスポンスを返さず、代わりに chunk を送信する。
  - メリット: 更新頻度が速くても大丈夫・通信を張り直さない
  - デメリット: 
    - HTTP通信を張り続けるため、CPU使用率に影響
    - Server-Clientの構造。

### 現状の代表格二人組
- WebSocket
  - TCP上に構築されたプロトコル（WebSocketプロトコル）（HTTPではない）
  - メリット: 
    - Server-Client方式・Client-Server方式の両方出来る
- WebRTC
  - WebRTCの中の通信規格でP2Pの接続相手と通信を行う javascript のAPI
  - ウェブでUDP通信
    - 映像配信・クラウドゲーミングに良い。
  - メリット:
    - Peer-to-Peer方式（サーバーがいらない）（ブラウザがあれば良い）

### 期待の新人
- WebTransport
  - QUICプロトコル（両方の良いとこ取り）
    - UDPの上に構築されたプロトコル（WebRTC）
    - 到達の保証付き（TCP的）（WebSocket）
  - Server-Client方式・Client-Server方式の両方出来る
  - WebRTCの要件をWebSocket的に扱えるようになる。

## HTTP
- HTTP/2
  - プロトコル: TCP
- HTTP/3
  - プロトコル: QUIC(UDPベース)
  - [7]HTTP/3 > [4.5]QUIC(TLS含) > [4]UDP > [3]IP
    - [7] アプリケーション層
      - HTTP/3
    - [5] セッション層
      - TLS
    - [4.5] ???
      - QUIC(TLS機能も含むので、間にある感じする)
    - [4] トランスポート層
      - UDP
    - [3] ネットワーク層
      - IP

## すとりーみんぐ
　仕組みよくわからないけど視聴してるよね。調べても分からん。

### プロトコル
#### 7. アプリケーション層
HTTP ベース（TCPベース）

- HLS (HTTP Live Streaming)
- MPEG-DASH (Dynamic Adaptive Streaming over HTTP)

#### 4. トランスポート層
TCP/UDP ベース

- RTMP (RealTime Messaging Protocol)
  - TCPベース
  - 再生に専用プラグラインが必要
  - HTTP ではないため、Webサーバーでコンテンツ配信は出来ない。
  - RTMPサーバーが必要。
- WebRTC
  - UDPベース
  - P2P
- FTL
  - UDPベース
  - Mixirが頑張っていた。
- SRT
  - UDPベース
  - TCP的な保証付き。

※RTP: UDPをベースにしたプロトコル。VoIP等の基盤。

### 動画形式（映像コンテナ）
- WMV
- FLV

### コーデック
- H.264 (AVC = Advanced Video Coding)
- H.265 (HEVC = High Efficiency Video Coding)
  
### とどけかた
- 1 友達に届ける
  - 準備:
    - ローカルホストでサーバー立ち上げ
    - ポート開放
  - 送信:
    - ローカルホストに映像を送信
  - 受信:
    - グローバルIPアドレスを直接指定して受信
- 2 ストリーミングサイト
  - 送信: 
    - ライブストリーミングサイトに映像を送信
  - 受信:
    - ユーザーはライブストリーミングサイトを経由して受信

### 構成図🖼
　Flash系列ならRTMPを再生できるので、WindowsMediaPlayerで直接再生するか、ブラウザに搭載されたFlashPlayer（もう死んだが）で見るかが出来る。

　でも、スタンダードはHLS形式。OBSはRTMPで伝送するので、HLSに変換が必要。HLSはCDNとの相性が良いとか。ブラウザで標準で視聴出来るように整備されているので、安心はHLS。YoutubeはRTMPとHLSを選べた気がする。

※図は割と主観による略式が中心で、情報の正確性も保証出来ないので注意（この図以外も全部そう）。

<div class="mermaid">
graph TD

subgraph リスナー
    subgraph 再生媒体
        WindowsMediaPlayer
        subgraph ブラウザ
            FlashPlayer
            subgraph HTML5
                videoタグ
            end
        end
    end
end
subgraph 配信者
    OBS
end
subgraph サーバー
    RTMP形式
    HLS形式
    RTMP形式　--"HLSに変換"--> HLS形式
end

OBS --"push(rtmp)"--> RTMP形式
WindowsMediaPlayer --"pull(rtmp)"--> RTMP形式
FlashPlayer --"pull(rtmp)"--> RTMP形式
videoタグ --"pull(hls)"--> HLS形式
</div>

## ねとらじ🖼
　ストリーミング配信について調べてたんですが、そういやねとらじもあったなぁと思って、簡易に構成をまとめた。想像に身を委ねたので合ってるかは分からない。放送用ソフトのBelugaはWinsock使ってTCPコネクションを作ってるのは分かったけど、詳しく中身見てない。ので、怪しい図。視聴は winamp 一択だ、今でも音楽プレイヤーとして使ってる人は減ったんだろうなと思いを馳せる。

　ところで、Youtube版の Dolphin とか欲しかったんだけど、 Youtube Data API はクオータ制限あるし、番組数が多すぎてオフセット指定する形だし、Youtubeヘッドラインツールは厳しい。一覧が好きなんだがなあ。

<div class="mermaid">
graph TD

subgraph リスナー
    subgraph 再生媒体
        subgraph HTML5
            videoタグ
        end
        winamp
    end
    subgraph 番組一覧
        ブラウザ
        Dolphin
    end
    videoタグ -.-> ブラウザ
    winamp -.-> Dolphin
end
subgraph 配信者
    Beluga
end
subgraph サーバー
    ねとらじ
end

ブラウザ --"pull(http)"--> ねとらじ
Dolphin --"pull(?)"--> ねとらじ
Beluga --"push(tcp)"--> ねとらじ
</div>

## ライセンス
著作権だそうです。

- コピーライト
  - 許可がないと、特定の人でも自由に複製・変更できない
  - 商用系はこれ。お馴染み。
- コピーレフト
  - 許可がなくても、不特定多数の人が自由に複製・変更できる
  - OSSは大体これ。

### OSSライセンス
- コピーレフト
  - GPL 
    - 制作物も GPL
    - 制作過程で組み合わせた他のソフトウェアにも GPL と同等の条件を適応する
- 準コピーレフト
  - LGPL
    - 制作物も LGPL
    - 制作過程で組み合わせた他のソフトウェアには適応されない
      - LGPL は他の OSS ライセンスと安心して組み合わせられる。
- 非コピーレフト
  - BSD, MIT
    - 制作物は BSD, MIT じゃなくても良い
    - 制作過程で組み合わせた他のソフトウェアには適応されない

### GPL 互換性
- GPL と Ms-PL は互換性がない
  - GPL  : 制作物も GPL
  - Ms-PL: 非コピーレフト。ただし、特定条件下では 制作物も Ms-PL (準コピーレフト？)
    - 特定条件下 - コードをソースコードの形で配布する場合
  - 両立出来ない場合が存在する（非互換）

　らしい、っぽい。GPLは自由な制約故に、組み合わせられないOSSが存在する。

## インターネットの基礎
　なんかもう何もかも分からなくなったので基礎からしっかり。

### ネットワークアーキテクチャ
- OSI参照モデル（7層モデル）
  - 層を分け過ぎたとかなんとかで普及せず。
- TCP/IP階層モデル（4層モデル）
  - よく分からんが超普及。
  - TCPとIPを使ったプロトコルが現在のインターネットの標準。
  - 流行った構成がそのまま4層モデルになった。

### 通信
　いろいろ通信について

#### アプリケーションから始まりアプリケーションで終わる
- Webブラウザ(Chrome, Firefox, ...) -> Webサーバーアプリケーション(Apache, IIS, ...)
  - HTTPプロトコル
- メールソフト -> メール？（分からないけどそゆこと）
  - SMTPプロトコル, POP3プロトコル

#### Webブラウザの階層間の関連付け
1. http://www.hello-internet.com/
  - HTTP プロトコル : アプリケーション層
1. ポート番号 80 (Webブラウザはこれと決まっている)
  - TCP プロトコル : トランスポート層
1. IPアドレス( 222.222.222.222 ) 的な
  - IP プロトコル : インターネット層
  - 名前解決でIPアドレスを特定
    - DNSサーバーに http://www.hello-internet.com/ を尋ねると
    - IPアドレスは 222.222.222.222 だよって返してくれる
  - 動的/静的
    - グローバルIPアドレス(LAN側)
      - DHCPが動的にIPアドレスを付与してくれている
      - 固定IPアドレスにしたい場合は自分で設定する
    - プライベートIPアドレス(WAN側)
      - ISP(Internet Service Provider) が割り振ってくれる
      - 動的か静的かは契約プランによる。
1. MACアドレス( 87-16-FF-DA-BB-C4 ) 的な
  - イーサネット プロトコル : ネットワークインターフェース層
  - アドレス解決でMACアドレスを特定
    - ARPサーバーに 222.222.222.222 を尋ねると
    - MACアドレスは 87-16-FF-DA-BB-C4 だよって返してくれる
1. Webサーバーに到達( 87-16-FF-DA-BB-C4 )
  - WebサーバーのWebサーバーアプリケーションでHTTPリクエストを処理
  - HTTPレスポンスとファイルを返す
1. Webブラウザに戻ってくる
  - ページが表示される。

#### プロトコルのヘッダ（識別情報）
1. イーサネット -> IP, ARP : 0x0800(タイプコード)
  - スイッチも参照する
1. IP -> TCP, UDP : 6, 17(プロトコル番号)
  - ルーターも参照する
1. TCP -> HTTP, DNS, FTP : 80, 53, 20/21(ポート番号)
  - ファイアウォールも参照する

※ポート開放について

1. ファイアウォールの許可が必要
1. ルーターでポート変換を設定
   - 外からのリクエスト -> 内へのリクエスト に変換する時、
   - ルーターはどのポートに投げればいいかわからない時は破棄するらしい。
   - ルーターにどのポートに投げればいいかを教えると伝送してくれる。
     - Webは80番を使うと決まっているので、特に設定は必要ない、ということだな？
     - ルーターなしで直刺しなら、2の手順は不要
     - 二重ルーターなら、両方でポート変換しないといけない（まず不可能だが理論的には）

## Webサーバー
- Apache
  - 基礎
- Nginx
  - メモリを効率的に使用できる。処理速度が非常に高速。
- IIS
  - Windowsベース

- Node.js
  - javascript 実行環境

- HTTP: 80
- HTTPS: 443

- ユーザー
- プロキシ
  - ユーザーの代理となるサーバー
  - キャッシュによる高速化が基本
  - 他
    - ユーザー認証（利用制限）
    - 匿名性
- インターネット
- リバースプロキシ
  - キャッシュしたコンテンツを配信する仕組み
    - Webサーバーの代理（身代わり）となって動くサーバー
  - セキュリティ向上、負荷分散の役割も担えるように現在は拡張されている。
    - ロードバランサー
      - 特定宛先のアクセスを複数サーバに分散する仕組み（Webサーバー）
      - ロードバランサー > リバースプロキシ
  - CDN: CloudFlare
- Webサーバー

### プロキシ
### リバースプロキシ
### 負荷分散


- DNSラウンドロビン
- ロードバランサー
  - リクエストの処理はロードバランサーで振り分けられたWebサーバがする
- リバースプロキシ
  - リクエストの処理はリバースプロキシがする。
  - リクエストによる振り分けを実現できる
    - 静的コンテンツ用Webサーバーに振り分け
    - 動的コンテンツ用Webサーバーに振り分け


- 関連項目
  - プロキシ
  - Squid - リバースプロキシとしても使えるプロキシサーバ
  - Apache HTTP Server - リバースプロキシとして使われることもある
  - Lighttpd - 負荷分散機能付きのリバースプロキシとして利用可能
  - Varnish Cache - オープンソースのリバースプロキシ
  - nginx - リバースプロキシ兼Webサーバ
- 外部リンク
  - SwitchFlow Reverse Proxy - Linux 用 C++ リバースプロキシ
  - Perlbal - Perlベースのリバースプロキシ/ロードバランサー/Webサーバ
  - PortFusion - オープンソースのリバースプロキシ
  - Pound - 負荷分散のためのリバースプロキシ
  - YXORP - ファイアウォール兼リバースプロキシ。GPL

- キャッシュサーバー
   - memcached

Webサーバに通す前に処理しておきたいことがある。
- セキュリティ
- 暗号化/SSL高速化
- 負荷分散
- 変化しないコンテンツのキャッシュ
- 圧縮
- 速度の調整
- 仮想的なサーバ統合
https://ja.wikipedia.org/wiki/リバースプロキシ

　つまり位置的にはリバースプロキシである。だが、リバースプロキシだからしなくてはならないということではない。リバースプロキシの位置（Webサーバに通す前）でしておきたいことと考えた方が無理がない。〇〇はリバースプロキシであると表現するよりも、リバースプロキシの位置で〇〇は△△の処理を行うよね、と言ったほうが誤解を少なく出来るだろう。いやうん、どうなんだろう。

　負荷分散がしたい場合には、ロードバランサーか負荷分散機能を持つ多機能Webサーバ（リバースプロキシ）かという選択肢にはなる。本当に負荷分散だけがしたいのならロードバランサーで十分なわけである。

  全然違いました。

- L2スイッチ（MACアドレス）
  - スイッチングハブ
  - リピータハブ
- L3スイッチ（IPアドレス）
  - ルーター
- L4スイッチ（プロトコルヘッダ内のポート番号、セッションシーケンス番号）
  - ロードバランサー
- L7スイッチ
  - リバースプロキシ
  
1. ロードバランサ（LB ）でリバースプロキシへ負荷分散
2. リバースプロキシ(Reverse Proxy)でSSLクライアント認証

ロードバランサが一台、リバースプロキシが複数台、Webサーバーが役割毎にある（？）

負荷分散の仕方
- ロードバランサ（負荷分散の専門家）（L4）
  - L4スイッチというネットワーク機器
- リバースプロキシ（負荷分散以外も出来る）（L7）
  - Webサーバー。
  - HTTPリクエストも見たうえで送信先サーバーを選択できる。
  - HTTPロードバランサ

うまくまとまらない。Webサーバーというかプロキシというか負荷分散というか概念がまあふわふわしてる。そのうちまた調べる。

## Windowsアプリケーション
- WinAPI(C/C++)
- MFC(C/C++)
  - WinAPIのラッパーしたフレームワーク
- Windowsフォームアプリケーション（.NET）
  - C++/CLI or C# で開発可能

### .NET 原初
- .NET Framework
  - 原初
  - 共通言語基盤（CLI）
    - .NET Frameworkの基幹を構成する実行コードや実行環境などについてマイクロソフトが策定した仕様
  - 共通言語ランタイム（CLR）
    - 共通言語基盤 (CLI) の実装の一つ（Microsoft作）。

### .NET 派生
- .NET CORE
  - OSS
  - クロスプラットフォーム
  - Microsoftのサポートが手厚い。.NETの実質的後継
- MONO
  - OSS
  - クロスプラットフォーム
    - WinAPIが元であるためWindows限定だったが、MONOはWindows以外でも使える。
  - CLIの実装の一つでもある
- xamarin
  - iOS/Androidのクロスプラットフォーム開発向け

### XX Studio
- Visual Studio: .NET の開発環境
- XamarinStudio: Mono の開発環境

## グラフィックス API 関連図🖼
　DirectX や OpenGL とかの関係性が分からなかったので図式化。間違いもあるかもしれない。調べた限りではこんな感じらしい。

　点線( - - - )は派生みたいなイメージ。VulkanはOpenGLと密接な関係。WebGPU（現在いろいろ策定中）はWebGLの強い版。

　OpenCL などはGPGPU用の統合開発環境っぽい。煩雑になるので図示はしなかったが、 図示するならDirectXやOpenGLに繋がる。グラフィックスAPIを使うためのまとまった開発環境。

<div style="height: 470px; overflow: hidden;"><div style="margin-top:-260px;"><div class="mermaid">
graph TD

subgraph 実行環境
    Windows
    Linux
    subgraph Apple
        Mac
        iOS
    end
    Android
    PS3
    3DS
    ブラウザ
    Apple製品    
    subgraph IDE[IDE for GPGPU]
        CUDA
        OpenCL
        DirectCompute
    end
end

subgraph プログラミング言語
    javascript
end

subgraph コンピュータグラフィックスAPI
    O_GL[OpenGL]
    O_ES[OpenGL ES]
    DirectX
    WebGL
    WebGPU
    G_API[DirectX, OpenGL, Vulkan, Metal]
    Vulkan
    Metal
    O_ES ---> O_GL
    WebGL ---> O_ES
    WebGL -.-> WebGPU
    WebGPU --> G_API
end

subgraph シェーディング言語
    Cg
    HLSL
    GLSL
    MSL
    SW[SPIR-V, WHLSL]
end

Windows --> DirectX
Windows --> O_GL
Linux --> O_GL
Android --> O_ES
PS3 --> O_ES
3DS --> O_ES
ブラウザ --> javascript
javascript --> WebGL
iOS --> O_ES
Mac --> O_GL
Apple製品 --> Metal

DirectX --> HLSL
DirectX --> Cg
O_GL --> Cg
O_GL --> GLSL
O_GL -.-> Vulkan
Vulkan --> GLSL
Metal --> MSL

G_API --> SW
</div></div></div>

　意味合い

- ①ブラウザで何かしたいな -> javascript で -> WebGL を使えばいいのか -> 内部的には OpenGL ES を使ってるっぽい -> ま、とりあえずシェーディング言語は GLSL を使うことになりそうかな（みたいな感じです）
- ②Rust で何かするか -> なんか vulkan って出てきたけど、何 -> OpenGL に関係した何からしい -> へぇ

　DirectXについての補足ですが、DirectXはWinAPIの一種（なのかな）。WinAPIはWindowsアプリケーションを作るためのもの。なのでグラフィック以外の機能もDirectXは持っている。OpenGLと比較する場合は、DirectXの中の `Direct2D/3D` と比較することになる。

## クラウドサービス

　名称だけざっと一覧が見たかったのでまとめ。GCPってGoogleから始まるんじゃなくて Cloud から始まるのか。把握した。

  `Compute Engine` で `Cloud Functions` を使って `Cloud Storage` に入れたファイルを `Cloud CDN` で保持。という言葉の意味がこれで分かった。良かった。

### コンピュートリソース

|  | AWS | Azure | GCP |
|-|-|-|-|
| 仮想サーバー | Amazon EC2 | Azure Virtual Machine | Compute Engine |
| ベアメタルサーバー | Amazon EC2 Bare Metal Instance | Azure Bare Metal Servers | Bare Metal Solution |
| コンテナ環境 | Amazon Elastic Container Service<br>Amazon Elastic Kubernetes Service<br>AWS Fargate | Azure Container Instance<br>Azure Kubernetes Service | Kubernetes Engine<br>Cloud Run |
| アプリケーション基盤 | AWS Elastic Beanstalk | Azure Web Apps | App Engine |
| サーバーレス | Amazon Lambda | Azure Functions | Cloud Functions |

### ストレージ

|  | AWS | Azure | GCP |
|-|-|-|-|
| ブロックストレージ | Amazon Elastic Block Storage | Azure Disk Storage | Persistent Disk |
| ファイルストレージ | Amazon Elastic File System | Azure Files | FileStore |
| オブジェクトストレージ | Amazon S3<br>Amazon Glacier | Azure Blob Storage<br>Azure Archive Stroage | Cloud Storage |
| 大容量データ移行サービス | AWS Snowball<br>AWS Snowball Edge<br>AWS Snowmobile | Azure Data Box | Transfer Appliance |

### データベースサービス

|  | AWS | Azure | GCP |
|-|-|-|-|
| リレーショナルデータベース | Amazon RDS<br>Amazon Aurora | Azure SQL Database<br>Azure Database for MySQL/PostgreSQL | Cloud SQL<br>Cloud Spanner |
| NoSQL | Amazon DynamoDB | Azure Cosmos DB | Cloud Datastore |
| データウェアハウス | Amazon Redshift | Azure Synapse Analytics | BigQuery |

### ネットワーク

|  | AWS | Azure | GCP |
|-|-|-|-|
| 仮想ネットワーク | Amazon VPC | Virtual Network | Virtual Private Cloud |
| ロードバランサー | Elastic Load Balancing | Azure Load Balancer<br>Azure Application Gateway | Cloud Load Balancing |
| DNS | Amazon Route53 | Azure DNS | Cloud DNS |
| CDN | Amazon CloudFront | Azure CDN | Cloud CDN |
| VPN | Amazon VPN | Azure VPN Gateway | Cloud VPN |
| 専用線接続 | Amazon Direct Connect | Azure Express Route | Cloud InterConnect |

### アプリケーション開発

|  | AWS | Azure | GCP |
|-|-|-|-|
| コード管理 | AWS CodeCommit | Azure Repos | Cloud Source Repositories |
| CI/CD | AWS CodeBuild<br>AWS CodeDeploy<br>AWS Code Pipeline | Azure Pipelines | Cloud Build |
| IDE | AWS Cloud9 | Visual Studio | Cloud Code |
| SDK | AWS SDK | Azure SDK Visual Studio | Cloud SDK |

### 運用管理

|  | AWS | Azure | GCP |
|-|-|-|-|
| サービス管理 | AWS Management Console<br>AWS Command Line Interface | Azure Portal<br>Azure Command Line Interface<br>Azure PowerShell<br>Azure Cloud Shell | Cloud Console<br>Cloud Shell<br>Cloud APIs |
| 監視、ロギング | Amazon CloudWatch | Azure Monitor<br>Log Analytics | Cloud Monitoring<br>Cloud Logging<br>Cloud Trace<br>Error Reporting<br>Cloud Debugger |
| 環境構築自動化 | AWS CloudFormation | Azure Building Blocks | Cloud Deployment Manager |
| 構成管理 | AWS Config | Azure Portal | Cloud Security Scanner<br>Cloud IAM |

### セキュリティ

|  | AWS | Azure | GCP |
|-|-|-|-|
| 権限管理 | AWS Identity and Access Management | Azure Active Directory | Cloud IAM |
| SSL証明書 | AWS Certificate Manager | App Service | Cloud Load Balancing |
| 鍵管理 | AWS Key Management Service<br>AWS CloudHSM | Azure Key Vault | Cloud Key Management Service |
| ネットワークセキュリティ | Security Group<br>ネットワークACL<br>AWS Firewall Manager<br>AWS Shield<br>AWS WAF | Azure Firewall<br>Azure Firewall Manager<br>Azure DDoS Protection<br>Azure WAF | Firewall Rule<br>Cloud Armor |

### 機械学習、IoT、モバイル

|  | AWS | Azure | GCP |
|-|-|-|-|
| 機械学習 | Amazon Lex<br>Amazon Comprehend<br>Amazon Polly<br>Amazon Recognition<br>Amazon Recognition Video<br>Amazon Machine Learning | LUIS<br>Azure Bot Service<br>Azure Speech Recognition API<br>Bing Speech API<br>Emotion API<br>Face API<br>Computer Vision API<br>Azure Machine Learning | Natural Language API<br>Cloud Text-to-Speech<br>Translation API<br>Speech API<br>Vision API<br>Cloud Video Intelligence<br>Cloud Machine Learning Services |
| IoT | AWS IoT Platform<br>AWS IoT Button | Azure IoT Platform<br>Azure Sphere | Google Cloud IoT |
| モバイル | AWS Mobile Hub | Azure Mobile Apps | Firebase |

## Rust

## Rust + ゲームプログラミング


