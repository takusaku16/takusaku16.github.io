---
layout: page
title: pwn
toc: true
---

## Pwn
　Pwn に取り組む上で押さえておきたい情報をまとめていく

### なんかまとめ🖼
<iframe width=740 height=164 src="https://docs.google.com/spreadsheets/d/e/2PACX-1vRqDBFhjvY-47Fx5QtCpGmICwyEfqhI9l26iXxPoe6gOyNTf6yL6wYPRjZ0s5_kIyIGv_iJ967kmtxI/pubhtml?widget=true&amp;headers=false"></iframe>
<iframe width=740 height=400 src="https://docs.google.com/spreadsheets/d/e/2PACX-1vRqDBFhjvY-47Fx5QtCpGmICwyEfqhI9l26iXxPoe6gOyNTf6yL6wYPRjZ0s5_kIyIGv_iJ967kmtxI/pubhtml?widget=true&amp;headers=false"></iframe>

※チェックマークは分かった気がするやつ。ただし、表の情報を信じてはいけない。

### 考え方
　前提として何らかの脆弱性が必ずある。かつ、セキュリティでその脆弱性をカバー出来ていない。この2点を総合して、有効な攻撃手段が必ずある。

　手の付け所が分からない場合は、

- 未知の脆弱性
- 未知のセキュリティ
- 未知の攻撃

　のいずれかを疑うことで先に進める（と思われる）。未知というのは自分にとっての未知。

### 思考と手順

1. セキュリティ状態の確認
2. 脆弱性の探索
3. 攻撃計画の立案・実行

## 1. セキュリティ状態の確認

- NX/XDビット(No eXecute / eXecute Disable)
- ASCII Armor
- ASLR(Address Space Layout Randomization)
- PIE(Position-Independent Executable)
- SSP(Stack Smashing Protection / StackGuard / canary)
- RELRO(RELocation Read-Only)

| 名称 | サポート |
|---|---|
| NX/XDビット | OS, コンパイラ(GCC) |
| ASCII Armor | OS |
| ASLR | OS |
| PIE | コンパイラ(GCC) |
| SSP | コンパイラ(GCC) |
| RELRO | コンパイラ(GCC) |

### 1.1 概念

#### NX/XDビット(No eXecute / eXecute Disable)

プログラムが使用する各領域（data/bss, heap, stack）でのコード実行を不可能にする機能。

- Windows
  - DEP(Data Execution Prevention)
    - ハードウェアDEP
    - ソフトウェアDEP(SafeSEH)
- Linux
  - Exec shield
  - Pax

※Exec shield には ASCII Armor の機能も含まれている。

※Exec shield/Pax には ASLR機能も含まれている。

#### ASCII Armor

32bit版 Linux OS で共有ライブラリをメモリ上に配置する際に、最上位バイトが0x00である 0x00FFFFFF 以下のアドレスへ配置する。NULL文字(\0x00)を終端とみなす strcpy 等の攻撃の対策となる。

#### ASLR(Address Space Layout Randomization)

プログラムが使用する各領域（heap, stack, 共有ライブラリ）の規定アドレスをランダム化する機能。

※heap領域以降をランダム化

#### PIE(Position-Independent Executable)

プログラムが使用する各領域（text, data/bss）の規定アドレスをランダム化する機能。

#### SSP(Stack Smashing Protection / StackGuard / canary)

スタック領域を保護するための機能。canaryの値が改ざんされているかどうかを判断する。坑道のカナリア。

```c
// スタック領域への展開を示すための例
int hoge(int a, int b){
  int c;
  int d;
}

int main(){
  hoge();
}
```

```
    +---------------+
    |               |
    |               |     | 7. ローカル変数2(d)
    |               |     | 6. ローカル変数1(c)
    |               |     | 5. canary(SSP)  // コレ。勝手に積まれる。
    |     stack     |     | 4. ebp値
    |               |     | 3. call戻り先(リターンアドレス)
    |               |     | 2. 引数1(a)
    |               |     | 1. 引数2(b)
    |               |
    +---------------+ ↓ 0xFFFFFFFF
```

#### RELRO(RELocation Read-Only)

共有ライブラリ関数のアドレスを保持する GOT(Global Offset Table) 領域を読み取り専用にする機能。

PLT(Procedure Linkage Table)

| 種類 | lazy binding | .got | .got.plt | GOT overwrite |
|---|---|---|---|---|
| No RELRO | - | rw-p | rw-p | 〇 |
| Partial RELRO | 有効 | r--p | r--p, rw-p | 〇 |
| Full RELRO | 無効 | r--p | - | ✖ |

共有ライブラリ関数の呼び出し(Partial RELRO)

1. .text セクションで関数呼び出し
2. .plt セクションで関数呼び出し
3. .got.plt セクションで関数呼び出し
   1. 初回は動的リンカでアドレス解決
   2. 2回目以降はキャッシュを利用
4. shard-object セクションで関数呼び出し

共有ライブラリ関数の呼び出し(Full RELRO)

1. .text セクションで関数呼び出し
2. .plt セクションで関数呼び出し
3. .got セクションで関数呼び出し
4. shard-object セクションで関数呼び出し

※ライブラリの種別

| 名称 | Linux, Windows	| 概要 |
|---|---|---|
| 静的ライブラリ | `.a`,  `.lib` | プログラム作成時にリンク |
| 共有ライブラリ | `.so`, `.dll` | プログラム起動時 or 実行時(lazy)にリンク(binding) |
| 動的ライブラリ | `dlopen()`, `LoadLibrary()` | プログラム動作中にリンク |


### 1.2 有効化/無効化

`gcc -v` の `Configured with` が標準状態

#### NX/XDビット　設定

- 有効: gcc 標準で有効
- 無効: `gcc -z execstack`

#### ASCII Armor　設定

- 32bit OS
  - 有効: `kernel.exec-shield = 1`
  - 無効: `kernel.exec-shield = 0`
- 64bit OS
  - 有効: 標準で有効？
  - 無効: 設定ファイルをいじってサーバーを立ち上げ直すっぽい？

※Exec shield が有効なら ASCII armor も有効

#### ASLR　設定

- 有効: `sudo sysctl -w kernel.randomize_va_space=2`
- 無効: `sudo sysctl -w kernel.randomize_va_space=0`

#### PIE　設定

- 有効: gcc 標準で有効
- 無効: `gcc -no-pie`

#### SSP　設定

- 有効: gcc 標準で有効
- 無効: `gcc -fno-stack-protector`

#### RELRO　設定

- デフォルト: Full RELRO
- No RELRO: `gcc -Wl, -z, norelro`
- Partial RELRO: `gcc -Wl, -z, relro`
- Full RELRO: `gcc -Wl, -z, relro, -z, now`

※`-z, relro` がRELRO有効、`-z, now` が遅延バインド無効を意味する

### 1.3 確認方法

`checksec` を使うと簡単。

- `git clone https://github.com/slimm609/checksec.sh`
- `./checksec --file=<file name>`

↓ オリジナル checksec (絶対抜けがあるので非推奨)

```sh
FILE="q4";\
echo "--- 1: NX";           readelf -l $FILE | grep GNU_STACK;\
echo "--- 2: RELRO";        readelf -l $FILE | grep GNU_RELRO;\
echo "--- 3: Lazy binding"; readelf -d $FILE | grep BIND_NOW;\
echo "--- 4: SSP, canary";  readelf -s $FILE | grep -e __stack_chk_fail -e __intel_security_cookie;\
echo "--- 5: PIE";  file $FILE | grep shared;\
echo "--- 6: ASLR";         sysctl kernel.randomize_va_space | grep 2;
```

※`FILE` は任意のファイル名

↓ 個別に確認する手法

#### NX/XDビット　確認

`readelf -l <file name>` に `GNU_STACK` があれば有効

#### ASCII Armor　確認

32bit版ならば `sysctl kernel.exec-shield` で確認できる。

64bit版は、root権限があれば確認可能？ `dmesg | grep --color '[NX|DX]*protection'` で active なら有効。

#### ASLR　確認

`sysctl kernel.randomize_va_space` or `cat /proc/sys/kernel/randomize_va_space`

- 有効: `2`
- 無効: `0`

#### PIE　確認

`file <file name>`

- PIE有効: `shared object`
- PIE無効: `executable`

#### SSP　確認

`readelf -s <file name>` に `__stack_chk_fail` か `__intel_security_cookie` があれば？

※調査不足。曖昧。

#### RELRO　確認

`readelf -l <file name>` に `GNU_RELRO` があれば RELRO 有効

`readelf -d <file name>` に `BIND_NOW` があれば Full RELRO 有効


### 1.4 実体を見る

#### NX/XDビット　実体

`readelf -S <file name>` の `Flag` の列が NXビット

```
Section Headers:
  [Nr] Name              Type            Addr     Off    Size   ES Flg Lk Inf Al
  [ 0]                   NULL            00000000 000000 000000 00      0   0  0
  [ 1] .interp           PROGBITS        08048134 000134 000013 00   A  0   0  1
  ...
```

#### ASCII Armor　実体

- `gdb <file name>`
- `(gdb) start`
- `(gdb) i proc map`

```
Start Addr   End Addr       Size     Offset objfile
  ...
  0x131000   0x2c2000   0x191000          0     /lib/libc-2.12.so
  0x2c2000   0x2c4000     0x2000   0x191000     /lib/libc-2.12.so
  0x2c4000   0x2c5000     0x1000   0x193000     /lib/libc-2.12.so
  ...
```

共有ライブラリのアドレスが `0x00XXXXXX` に配置されていれば ASCII Armor が機能している。

#### ASLR　実体

#### PIE　実体

#### SSP　実体

#### RELRO　実体


## 2. 脆弱性の探索

データの読み出し・書き換えを意図していない動作として引き起こしてしまう性質（ = 脆弱性）

- BoF(バッファオーバーフロー)
  - スタックバッファオーバーフロー
  - ヒープバッファオーバーフロー
- FSB(Format String Bug)
- UAF(use-after-free)

| 脆弱性 | 読み | 書き |
|---|---|---|
| BoF | - | w |
| FSB | r | w |
| UAF |  |  |

### BoF(バッファオーバーフロー)

用意したバッファサイズよりも大きい入力を受け付けてしまう現象。溢れた部分は値を書き換えてしまう。　

入力値チェックを怠るか、入力幅の制限を指定せずに（or 出来ない）標準関数を利用すると脆弱性を保持していると言える。脆弱性を持つ標準関数をいくつか挙げると、以下。

- get
- scanf
- strcpy
- strcat
- ...

これらが、ローカル変数(stack領域)・malloc等による動的メモリ確保された変数(heap領域)に対して使われた時、（スタック・ヒープ）バッファオーバーフローが発生しうる。

### FSB(Format String Bug)

書式指定のある関数でメモリの内容を読み出せたり書き込めたりする現象。

```c
printf("%d", hoge); // 脆弱性なし
printf(hoge);       // 脆弱性あり
```

#### 原理

- `printf("A: %d", hoge)`

```
    +-------+
    |       |     リターンアドレス
    | stack |     引数1("A: %d")
    |       |     引数2(hoge)
    +-------+ ↓ 0xFFFFFFFF
```

　引数1で指定された `%d` は引数2で指定した `hoge` の値を表示しようとする。即ち、スタックフレームで見れば、引数1から見て `0xFFFFFFFF` 側にある値を表示していることになる。

- `printf("%x")`

```
    +-------+
    |       |     リターンアドレス
    | stack |     引数1("%x")
    |       |     ????
    +-------+ ↓ 0xFFFFFFFF
```

　従って、引数2を渡さずに printf を呼び出した場合、スタックフレームの情報を表示しようとする。これが、C言語の標準関数printfに関する書式文字列の問題と呼ばれる脆弱性である。

　つまり、これまで積まれたスタック（printfが実行される前までの行）に干渉可能である。

#### 利用

```c
fgets(input, 1024, stdin);
printf(input);
```

`input` が `fgets()` 等からの入力を受け付けている変数ならば、`input` に書式トークンを含めることで、メモリ内容の読み書きが可能。

#### 利用（書き込み）
- `%n, %nc, %hhn` はこれまでに出力したバイト数を出力する
- `120(0x78), 376(0x178), 632(0x278)` の時、下2byteだけで判断するので、全て `120(0x78)` 即ち、 `x(120=0x78)` の文字を出力する。

| 書式トークン | 書き込み byte | 例 | 意味 |
|---|---|---|---|
| %n   | 4 | `%120c%4$n`   |  |
| %nc  | 2 | `%120c%4$nc`  |  |
| %hhn | 1 | `%120c%4$hhn` | 4番目の引数(アドレス)に `x(120=0x78)` に書き込む |

先頭に `AAAA` を付与する場合、`AAAA` の 4byte を減らし、`AAAA%116c%4$hhn` とする必要がある。

この時、先頭4バイトを引いた `%116c` で `x(120=0x78)` という文字を書き込める。

#### 利用（読み）: Infromation Leak

| 書式トークン | 例 | 意味 |
|---|---|
| %s | `%s` | 文字列として表示 |
| %x | `%4$x` | 4番目の引数(アドレス)を16進数で表示 |

メモリレイアウトを `%x` 等で探ることが出来る。これを `Information Leak` と呼ぶ。

### UAF(use-after-free)

dangling pointer

## 3. 攻撃計画の立案・実行

### 基本方針
- 実行コード
  - 自作シェルコード
  - 既存の関数を利用する system("/bin/sh")  : Return-to-libc
  - 既存の命令を利用する pop, ret命令 : ROP-gadget
- 書き込み・上書き領域
  - stack
  - heap
  - GOT

セキュリティとの兼ね合いで、どこに何を書きこむかを決める。

## 付録

### 権限関連のコマンド

| コマンド | option | 意味 |
|---|---|---|
| sudo | | スーパーユーザー(root)でコマンドを実行する |
| su | | ユーザーを切り替える(Substitute User) |
| id | | ユーザーの識別情報を表示する |
| whoami | | 現在（自分自身）のユーザー名を表示する |
| groups | | 所属しているグループを表示する |
| passwd | | パスワードを変更する |
| tty | | 標準入出力となっている端末デバイスを表示する |

#### /etc/passwd

`root:x:0:0:root:/root:/bin/bash`

| 対象 | 意味 |
|---|---|
| root | ユーザー名 |
| x | 「x」と言う文字 or 暗号化されたパスワード(shadow) |
| 0 | ユーザーID |
| 0 | グループID |
| root | コメント |
| /root | そのユーザーのホームディレクトリ |
| /bin/bash | そのユーザーのログインシェル名 |

####  /etc/shadow
暗号化されたパスワードが書かれている。 root のリードオンリー

`user00:$6$Z4xEy/1KTCW.rz$Yxkc8XkscDusGWKan621H4eaPRjHc1bkXDjyFtcTtgxzlxvuPiE1rnqdQVO1lYgNOzg72FU95RQut93JF6Deo/:15491:0:99999:7:::`

| 対象 | 意味 |
|---|---|
| user00 | ユーザー名 |
| 6 | ハッシュ方式( `$6` ) |
| Z4xEy/1KTCW.rz | salt ( `$Z4xEy/1KTCW.rz$` の $ で囲まれた部分) |
| Yxkc... | パスワード（ハッシュ） |
| 15491 | 1970/1/1から最後にパスワードが変更された日までの日数 |
| 0 | パスワードが変更可能となるまでの日数 |
| 99999 | パスワードを変更しなくてはならなくなる日までの日数 |
| 7 | パスワード有効期限が来る前に、ユーザが警告を受ける日数 |
| (null) | パスワード有効期限が過ぎてからアカウントが使用不能になるまでの日数 |
| (null) | 1970/1/1からアカウントが使用不能になる日までの日数 |
| (null) | 予約フィールド |

ハッシュ方式の数字の意味は以下。

- 1: md5
- 5: sha-256
- 6: sha-512

`etc/pam.d/system-auth` でハッシュ方式が指定されている。デフォルトでは `sha-512`

crypt コマンドによる例が以下

```sh
# perl -e 'print crypt("password", "\$6\$Z4xEy/1KTCW.rz");'
$6$Z4xEy/1KTCW.rz$Yxkc8XkscDusGWKan621H4eaPRjHc1bkXDjyFtcTtgxzlxvuPiE1rnqdQVO1lYgNOzg72FU95RQut93JF6Deo/
```

#### fd
- 0: 標準入力
- 1: 標準出力
- 2: 標準エラー出力

ファイルディスクリプタ

`/proc/[プロセスID]/fd/`

### 解析関連のコマンド

| コマンド | option | 意味 |
|---|---|---|
| file |  | いろいろ分かる |
| objdump | -d | 逆アセンブル |
| readelf | -l, -d, -s, -S | ELFファイルの情報表示 |
| strings |  | ファイルに含まれる文字列を表示 |
| lld |  | 共有ライブラリへの依存関係を表示 |
| gcc | -v | gcc情報表示 |
| uname | -a | OS情報表示 |

#### gdb

`gdb -q <file name>` : `-q` を付けるとライセンスを表示せず起動する。

- 一覧

| コマンド | 省略記法 | 意味 |
|---|---|---|
| help | h | ヘルプ |
| start |  | main関数で実行を止める |
| run | r | ファイル実行 |
| break | b | ブレークポイント設置 |
| info | i | 情報を表示 |
| delete | d | ブレークポイント削除 |
| continue | c | break終了。プログラム再開 |
| next | n | ステップ実行 |
| step | s | ステップ実行（関数の中に入る） |
| nexti | ni | 機械語をステップ実行 |
| stepi | si | 機械語をステップ実行（関数の中に入る） |
| disassemble | disas | アセンブラ表示 |
| layout asm | lay asm | 常時アセンブラ表示 |
| layout regs | lay regs | 常時レジスタ表示 |
| Ctrl+X Ctrl+A |  | layout の開閉 |
| print | p | 式の結果表示 |
| x |  | アドレスの中身表示 |
| set |  | メモリの中身を書き換える |

- 例

```sh
# disassemble
(gdb) disas main
(gdb) disas 0x80484b4

# break
(gdb) b main
(gdb) b *main+10
(gdb) b *0x80499f0

# print
(gdb) p $eflag

# x
(gdb) x/100x $esp
(gdb) x/xw 0x80499f0

# set
(gdb) set $eax=10 
(gdb) set $pc=*main+10

# info
(gdb) i b
(gdb) i proc map

# ASLR有効化（GDBでは初期で無効）
(gdb) set disable-randomization off

# アセンブリの表示を Intel形式 にする（初期では AT&T形式 ）
(gdb) set disassembly-flavor intel
```

### x86 メモリ配置　概念

| 領域名 |  | 格納対象 |
|---|---|---|
| テキスト領域 | text | 機械語に翻訳されたプログラム |
| 静的領域 | data, bss | グローバル変数などの静的変数 |
| ヒープ領域 | heap | メモリの動的管理(malloc, new) |
| スタック領域 | stack | リターンアドレス<br>ベースポインタ<br>引数<br>ローカル変数 |

```
    +---------------+ ↑ 0x00000000
    |     text      |
    +---------------+
    |   data, bbs   |
    +---------------+
    |     heap      |
    +---------------+     ↓ heap 拡張方向
    :               :
    :               :
    :               :
    +---------------+     ↑ stack 拡張方向
    |     stack     |
    +---------------+ ↓ 0xFFFFFFFF
```

※この概念を踏まえて、ELFの各セクション・攻撃の対象領域を紐づけると分かりやすい。

## 参考
### 強力
- [Return-oriented_programming](https://en.wikipedia.org/wiki/Return-oriented_programming)
  - 歴史が良くまとまってる。自分でまとめているこのページより有用。
- [CTF pwn](https://raintrees.net/projects/a-painter-and-a-black-cat/wiki/CTF_Pwn)
  - 欲しい情報がまとまってた。




### 歴史、基礎



### 補強


