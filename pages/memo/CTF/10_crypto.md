---
layout: page
title: crypto
toc: true
---

## crypto

　暗号解読とか

## 大分類

- 古典暗号
- 近代暗号（機械式暗号）
- 現代暗号
- 物理暗号

## 古典暗号
　`Hello` を暗号化した例も載せる。

| 古典暗号 | 種別 | 時代 | Hello | キー |
|---|---|---|---|---|
| ポリュビオス<br>の暗号表 | 換字式（単表、単一） | 古代ギリシア | 23 15 31 31 34 | - |
| シーザー暗号 | 換字式（単表、単一） | 古代ローマ | Ebill | 3 |
| ヴィジュネル暗号 | 換字式（多表） | 15,16世紀<br>フランス | Rijvs | key |
| ADFGVX暗号 | ポリュビオス<br>の暗号表 + 転置式 | WWIドイツ | VFFADVFXXG | knowledge |
| ROT13 | 換字式（単表、単一） | 1980年代 | Aryyb | 13 |

### ポリュビオスの暗号表

|   | 1 | 2 | 3 | 4 | 5 |
|:-:|:-:|:-:|:-:|:-:|:-:|
| **1** | A | B | C | D | E |
| **2** | F | G | H | I , J | K |
| **3** | L | M | N | O | P |
| **4** | Q | R | S | T | U |
| **5** | V | W | X | Y | Z |

```
平文　: Hello
鍵　　: -
暗号文: 23 15 31 31 34
```

### シーザー暗号

```
通常　: ABCDEFGHIJKLMNOPQRSTUVWXYZ
暗号化: XYZABCDEFGHIJKLMNOPQRSTUVW
```

　いわゆる ROT3 である。3でなくても良いらしい。

```
平文　: Hello
鍵　　: 3
暗号文: Ebiil
```

### ヴィジュネル暗号

　はみ出したけどしょうがない。

| |A|B|C|D|E|F|G|H|I|J|K|L|M|N|O|P|Q|R|S|T|U|V|W|X|Y|Z|
|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|
|**A**|A|B|C|D|E|F|G|H|I|J|K|L|M|N|O|P|Q|R|S|T|U|V|W|X|Y|Z|
|**B**|B|C|D|E|F|G|H|I|J|K|L|M|N|O|P|Q|R|S|T|U|V|W|X|Y|Z|A|
|**C**|C|D|E|F|G|H|I|J|K|L|M|N|O|P|Q|R|S|T|U|V|W|X|Y|Z|A|B|
|**D**|D|E|F|G|H|I|J|K|L|M|N|O|P|Q|R|S|T|U|V|W|X|Y|Z|A|B|C|
|**E**|E|F|G|H|I|J|K|L|M|N|O|P|Q|R|S|T|U|V|W|X|Y|Z|A|B|C|D|
|**F**|F|G|H|I|J|K|L|M|N|O|P|Q|R|S|T|U|V|W|X|Y|Z|A|B|C|D|E|
|**G**|G|H|I|J|K|L|M|N|O|P|Q|R|S|T|U|V|W|X|Y|Z|A|B|C|D|E|F|
|**H**|H|I|J|K|L|M|N|O|P|Q|R|S|T|U|V|W|X|Y|Z|A|B|C|D|E|F|G|
|**I**|I|J|K|L|M|N|O|P|Q|R|S|T|U|V|W|X|Y|Z|A|B|C|D|E|F|G|H|
|**J**|J|K|L|M|N|O|P|Q|R|S|T|U|V|W|X|Y|Z|A|B|C|D|E|F|G|H|I|
|**K**|K|L|M|N|O|P|Q|R|S|T|U|V|W|X|Y|Z|A|B|C|D|E|F|G|H|I|J|
|**L**|L|M|N|O|P|Q|R|S|T|U|V|W|X|Y|Z|A|B|C|D|E|F|G|H|I|J|K|
|**M**|M|N|O|P|Q|R|S|T|U|V|W|X|Y|Z|A|B|C|D|E|F|G|H|I|J|K|L|
|**N**|N|O|P|Q|R|S|T|U|V|W|X|Y|Z|A|B|C|D|E|F|G|H|I|J|K|L|M|
|**O**|O|P|Q|R|S|T|U|V|W|X|Y|Z|A|B|C|D|E|F|G|H|I|J|K|L|M|N|
|**P**|P|Q|R|S|T|U|V|W|X|Y|Z|A|B|C|D|E|F|G|H|I|J|K|L|M|N|O|
|**Q**|Q|R|S|T|U|V|W|X|Y|Z|A|B|C|D|E|F|G|H|I|J|K|L|M|N|O|P|
|**R**|R|S|T|U|V|W|X|Y|Z|A|B|C|D|E|F|G|H|I|J|K|L|M|N|O|P|Q|
|**S**|S|T|U|V|W|X|Y|Z|A|B|C|D|E|F|G|H|I|J|K|L|M|N|O|P|Q|R|
|**T**|T|U|V|W|X|Y|Z|A|B|C|D|E|F|G|H|I|J|K|L|M|N|O|P|Q|R|S|
|**U**|U|V|W|X|Y|Z|A|B|C|D|E|F|G|H|I|J|K|L|M|N|O|P|Q|R|S|T|
|**V**|V|W|X|Y|Z|A|B|C|D|E|F|G|H|I|J|K|L|M|N|O|P|Q|R|S|T|U|
|**W**|W|X|Y|Z|A|B|C|D|E|F|G|H|I|J|K|L|M|N|O|P|Q|R|S|T|U|V|
|**X**|X|Y|Z|A|B|C|D|E|F|G|H|I|J|K|L|M|N|O|P|Q|R|S|T|U|V|W|
|**Y**|Y|Z|A|B|C|D|E|F|G|H|I|J|K|L|M|N|O|P|Q|R|S|T|U|V|W|X|
|**Z**|Z|A|B|C|D|E|F|G|H|I|J|K|L|M|N|O|P|Q|R|S|T|U|V|W|X|Y|

　鍵は任意のもので良い。今回は key としてみる。

```
平文　: Hello
鍵　　: key
暗号文: Rijvs
```

- H - k -> R
- e - e -> i
- l - y -> j
- l - K -> v
- o - e -> s

　このように鍵(key)が繰り返される。

### ADFGVX暗号

1. ポリュビオスの暗号表と同じ原理による暗号化（第一暗号文）
2. 転置式による暗号化（第二暗号文）

　まず、表を a~z, 0~9 の36文字でランダムに埋める。

|   | A | D | F | G | V | X |
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| **A** | d | h | x | m | u | 4 |
| **D** | p | 3 | j | 6 | a | o |
| **F** | i | b | z | v | 9 | w |
| **G** | 1 | n | 7 | 0 | q | k |
| **V** | f | s | l | y | c | 8 |
| **X** | t | r | 5 | e | 2 | g |

　これを用いて第一暗号文を作る。

```
平文　　　: Hello
鍵　　　　: -
第一暗号文: AFXGVFVFDX( AF XG VF VF DX )
```

　次に転置式暗号化を行うために鍵を定める。今回は鍵を knowledge としてみる。

　knowledge から重複文字を消して knowledg とする。

　アルファベット順に数字を割り振ると knowledg は 46785213 となり、これが転置鍵である。

　そして、第一暗号文を転置鍵サイズ（8文字）で改行して表に書き出す。

|4|6|7|8|5|2|1|3|
|-|-|-|-|-|-|-|-|
|A|F|X|G|V|F|V|F|
|D|X| | | | | | |

　この表の数字の順に縦に読み出すと第二暗号文が得られる。

```
第一暗号文: AFXGVFVFDX( AF XG VF VF DX )
鍵　　　　: knowledg
転置鍵　　: 46785213
第二暗号文: VFFADVFXXG( V F F AD V FX X G )
```

　ややこしいけど、出来た。

### ROT13

```
通常　: ABCDEFGHIJKLMNOPQRSTUVWXYZ
暗号化: NOPQRSTUVWXYZABCDEFGHIJKLM
```

　13個ずれている。

```
平文　: Hello
鍵　　: 13
暗号文: Aryyb
```

## 近代暗号（機械式暗号）

　機械で作る暗号。その根底は古典暗号と変わらない。古典暗号に比べて、複雑な手順かつ高速になっただけとも言える。人力での解読は古典暗号と比較すると困難の極みと言える。

### エニグマ



## 現代暗号


## 物理暗号


-----------------------------------------------------
### 暗号
- 筆記・道具ベースの暗号
  - 換字式暗号
    - シーザー暗号(ROT13)
    - ヴィジュネル暗号
  - 転置式暗号
- 機械式暗号
  - エニグマ暗号機
- 計算機ベースの暗号
  - 共通鍵暗号
    - ブロック暗号
      - DES, AES
    - ストリーム暗号
      - ワンタイムパッド
  - 公開鍵暗号
    - RSA

#### ROT13

- `abcdefghijklmnopqrstuvwxyz`
- `nopqrstuvwxyzabcdefghijklm`

13個ずれてる。

### デジタル署名
- RSA署名

### 暗号学的ハッシュ関数
- MD2/MD4/MD5
- SHA-0/SHA-1/SHA-2/SHA-3

