---
layout: page
title: web
toc: true
---

## web

- SQLインジェクション
- クロスサイトスクリプティング
- クロスサイトリクエストフォージェリ

### SQLインジェクション
```sql
SELECT * FROM users WHERE name = 't' OR 't' = 't';
```

OR以降が必ず true になる。入力を直接SQLに利用している場合、このように意図しないSQLをユーザーが指定出来てしまう。

### クロスサイトスクリプティング
不適切な入力確認 (CWE-20) によるインジェクション (CWE-74) 

### クロスサイトリクエストフォージェリ
データ認証の不十分な検証 (CWE-345) による脆弱性

## 認可( Authorization )
- OAuth

### OAuth
認証用のトークンを発行する。クライアントからの要求が正当であれば。

現行は OAuth2.0 であり、 OAuth1.0 との後方互換性なし。

アクセストークンは Bearer認証・Form認証・OpenID Connect などで利用できる。

## 認証( Authentication )
- HTML Form認証
- Basic認証
- Digest認証
- Bearer認証

### HTML Form認証
ユーザー名とパスワードをフォームに入力し送信、サーバー側で一致を確認し、認証する方式。

クロスサイトリクエストフォージェリ (cross-site request forgeries) (CSRF, XSRF) 対策が必要。

### Basic認証
ユーザー名とパスワードを Base64 で変換する方式

ユーザ名とパスワードを「:」でつなげて Base64

SSL(HTTPS)を利用すれば平文でパスワード送信するという欠点を補える。

### Digest認証
ユーザー名とパスワードとランダムな文字列を MD5(暗号学的ハッシュ関数) で変換する方式

パスワードと nouce（サーバーから送られてきたランダムな文字列） と cnouce（クライアントが生成したランダムな文字列）を組み合わせて MD5 でハッシュ( response ) を生成する。

Basic認証よりはセキュアだが未だ脆弱。SSL(HTTPS)との併用は欠かせない。

- 認証領域 (realm) 
- サーバーがサポートしている qop (quality of protection)

### Bearer認証
事前に入手したアクセストークンをtoken68形式を送り、サーバー側はそれが有効化を確認する方式

アクセストークンは OAuth で取得した者を使う。トークンはブラウザ( localStorage or session)に保存している。

Bearer認証は OAuth の仕様の一部として定義されているが、HTTPでも利用可能になっている。

1. OAuth(認可): ある個人を特定すること
2. Bearer(認証): 行動やリソースの許可をすること

の順番で利用する。

token68は `a-zA-z0-9` の62文字と `-._~+/` の6文字の計68文字で構成され、末尾には `=` が挿入されることも（パディングかな）

Googleサインインはこれ。

Bearer認証は OpenID Connect に含まれる...と思うのだが、良く分からない。保留。でも、多分、含まれる。含まれるというか等価だと思う。不明。

## HTTP

## curl

## PHP
- Apache Magica (CVE-2012-1823) 攻撃