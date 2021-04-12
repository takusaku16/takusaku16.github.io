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
- HTTPプロトコル でがんばる
  - ロングポーリング
    - クライアントが一定間隔でサーバに問い合わせをし続ける
  - Comet
    - サーバ側から通信を開始するサーバプッシュ機能を疑似的に実現
  - SSE(Server-Sent Event)
    - Comet の発展系。APIが整ってるが、接続性はComet
- WebSocket
  - TCP上に構築されたプロトコル
  - Server-Clientでの接続方式
- WebRTC
  - ウェブでUDP通信
  - Peer-to-Peer（サーバを介さずコンピュータ同士を直接つなぐ）方式
- WebTransport
  - QUICプロトコル
    - UDPの上に構築されたプロトコル
    - 到達の保証付き（TCP的）
  - Server-Clientでの接続方式

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

## グラフィックス API 関連図
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



## Rust

## Rust + ゲームプログラミング


