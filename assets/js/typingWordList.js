const wordDataList = [
    { "furigana": "ふいうち", "japanese": "不意打ち", "typing": "huiuti" },
    { "furigana": "くまげら", "japanese": "クマゲラ", "typing": "kumagera" },
    { "furigana": "むささび", "japanese": "ムササビ", "typing": "musasabi" },
    { "furigana": "すぺいん", "japanese": "スペイン", "typing": "supein" },
    { "furigana": "ちちのひ", "japanese": "父の日", "typing": "titinohi" },
    { "furigana": "さざなみ", "japanese": "さざなみ", "typing": "sazanami" },
    { "furigana": "しょどう", "japanese": "書道", "typing": "syodou" },
    { "furigana": "たちよみ", "japanese": "立ち読み", "typing": "tatiyomi" },
    { "furigana": "びしょう", "japanese": "微笑", "typing": "bisyou" },
    { "furigana": "おかりな", "japanese": "オカリナ", "typing": "okarina" },
    { "furigana": "ふじさん", "japanese": "富士山", "typing": "huzisan" },
    { "furigana": "しきしゃ", "japanese": "指揮者", "typing": "sikisya" },
    { "furigana": "ぱぱいや", "japanese": "パパイヤ", "typing": "papaiya" },
    { "furigana": "どりあん", "japanese": "ドリアン", "typing": "dorian" },
    { "furigana": "こーひー", "japanese": "コーヒー", "typing": "ko-hi-" },
    { "furigana": "ししゃも", "japanese": "ししゃも", "typing": "sisyamo" },
    { "furigana": "たこやき", "japanese": "たこ焼き", "typing": "takoyaki" },
    { "furigana": "とびっこ", "japanese": "トビッコ", "typing": "tobikko" },
    { "furigana": "やきゅう", "japanese": "野球", "typing": "yakyuu" },
    { "furigana": "おむれつ", "japanese": "オムレツ", "typing": "omuretu" },
    { "furigana": "ぐろーぶ", "japanese": "グローブ", "typing": "guro-bu" },
    { "furigana": "にんじゃ", "japanese": "忍者", "typing": "ninja" },
    { "furigana": "きばせん", "japanese": "騎馬戦", "typing": "kibasen" },
    { "furigana": "わたがし", "japanese": "綿菓子", "typing": "watagasi" },
    { "furigana": "らーめん", "japanese": "ラーメン", "typing": "ra-men" },
    { "furigana": "よーよー", "japanese": "ヨーヨー", "typing": "yo-yo-" },
    { "furigana": "かおもじ", "japanese": "顔文字", "typing": "kaomozi" },
    { "furigana": "こしあん", "japanese": "こしあん", "typing": "kosian" },
    { "furigana": "つぶあん", "japanese": "つぶあん", "typing": "tubuan" },
    { "furigana": "たいふう", "japanese": "台風", "typing": "taihuu" },
    { "furigana": "そぷらの", "japanese": "ソプラノ", "typing": "sopurano" },
    { "furigana": "いのしし", "japanese": "イノシシ", "typing": "inosisi" },
    { "furigana": "ふぃるむ", "japanese": "フィルム", "typing": "firumu" },
    { "furigana": "ぶらんど", "japanese": "ブランド", "typing": "burando" },
    { "furigana": "あぼかど", "japanese": "アボカド", "typing": "abokado" },
    { "furigana": "おれんじ", "japanese": "オレンジ", "typing": "orenzi" },
    { "furigana": "めんせき", "japanese": "面積", "typing": "menseki" },
    { "furigana": "たんぽぽ", "japanese": "たんぽぽ", "typing": "tanpopo" },
    { "furigana": "うめしゅ", "japanese": "梅酒", "typing": "umesyu" },
    { "furigana": "たぴおか", "japanese": "タピオカ", "typing": "tapioka" },
    { "furigana": "かんふー", "japanese": "カンフー", "typing": "kanhu-" },
    { "furigana": "てぬぐい", "japanese": "てぬぐい", "typing": "tenugui" },
    { "furigana": "あいこん", "japanese": "アイコン", "typing": "aikon" },
    { "furigana": "しまうま", "japanese": "シマウマ", "typing": "simauma" },
    { "furigana": "らいおん", "japanese": "ライオン", "typing": "raion" },
    { "furigana": "ろうそく", "japanese": "ろうそく", "typing": "rousoku" },
    { "furigana": "くつした", "japanese": "靴下", "typing": "kutusita" },
    { "furigana": "きんぱつ", "japanese": "金髪", "typing": "kinpatu" },
    { "furigana": "けんだま", "japanese": "けんだま", "typing": "kendama" },
    { "furigana": "かにたま", "japanese": "かに玉", "typing": "kanitama" },
    { "furigana": "ぼくとう", "japanese": "木刀", "typing": "bokutou" },
    { "furigana": "せんしゃ", "japanese": "洗車", "typing": "sensya" },
    { "furigana": "あかがい", "japanese": "赤貝", "typing": "akagai" },
    { "furigana": "あまえび", "japanese": "甘エビ", "typing": "amaebi" },
    { "furigana": "うぐいす", "japanese": "ウグイス", "typing": "uguisu" },
    { "furigana": "いやーん", "japanese": "イヤーン", "typing": "iya-n" },
    { "furigana": "えんがわ", "japanese": "えんがわ", "typing": "engawa" },
    { "furigana": "おおとろ", "japanese": "大トロ", "typing": "ootoro" },
    { "furigana": "かずのこ", "japanese": "数の子", "typing": "kazunoko" },
    { "furigana": "さーもん", "japanese": "サーモン", "typing": "sa-mon" },
    { "furigana": "すーぱー", "japanese": "スーパー", "typing": "su-pa-" },
    { "furigana": "すらいむ", "japanese": "スライム", "typing": "suraimu" },
    { "furigana": "でこぴん", "japanese": "でこピン", "typing": "dekopin" },
    { "furigana": "あざらし", "japanese": "アザラシ", "typing": "azarasi" },
    { "furigana": "ねぎとろ", "japanese": "ネギとろ", "typing": "negitoro" },
    { "furigana": "はんせい", "japanese": "反省", "typing": "hansei" },
    { "furigana": "きんぎょ", "japanese": "金魚", "typing": "kingyo" },
    { "furigana": "ざりがに", "japanese": "ザリガニ", "typing": "zarigani" },
    { "furigana": "みじんこ", "japanese": "ミジンコ", "typing": "mizinko" },
    { "furigana": "しんばし", "japanese": "新橋", "typing": "sinbasi" },
    { "furigana": "はちみつ", "japanese": "蜂蜜", "typing": "hatimitu" },
    { "furigana": "かんぱち", "japanese": "カンパチ", "typing": "kanpati" },
    { "furigana": "しょうゆ", "japanese": "醤油", "typing": "syouyu" },
    { "furigana": "すきやき", "japanese": "スキヤキ", "typing": "sukiyaki" },
    { "furigana": "すずむし", "japanese": "鈴虫", "typing": "suzumusi" },
    { "furigana": "きゃー！", "japanese": "キャー！", "typing": "kya-!" },
    { "furigana": "なまはむ", "japanese": "生ハム", "typing": "namahamu" },
    { "furigana": "ちゃいむ", "japanese": "チャイム", "typing": "tyaimu" },
    { "furigana": "さーかす", "japanese": "サーカス", "typing": "sa-kasu" },
    { "furigana": "きゃべつ", "japanese": "キャベツ", "typing": "kyabetu" },
    { "furigana": "そうじき", "japanese": "掃除機", "typing": "souziki" },
    { "furigana": "あおぞら", "japanese": "青空", "typing": "aozora" },
    { "furigana": "おにぎり", "japanese": "おにぎり", "typing": "onigiri" },
    { "furigana": "ふうりん", "japanese": "風鈴", "typing": "huurin" },
    { "furigana": "ぼーなす", "japanese": "ボーナス", "typing": "bo-nasu" },
    { "furigana": "ちきゅう", "japanese": "地球", "typing": "tikyuu" },
    { "furigana": "きゃんぷ", "japanese": "キャンプ", "typing": "kyanpu" },
    { "furigana": "はくしゅ", "japanese": "拍手", "typing": "hakusyu" },
    { "furigana": "だいこん", "japanese": "大根", "typing": "daikon" },
    { "furigana": "しんかい", "japanese": "深海", "typing": "sinkai" },
    { "furigana": "がっこう", "japanese": "学校", "typing": "gakkou" },
    { "furigana": "ふぁいる", "japanese": "ファイル", "typing": "fairu" },
    { "furigana": "くりっく", "japanese": "クリック", "typing": "kurikku" },
    { "furigana": "ちょきん", "japanese": "貯金", "typing": "tyokin" },
    { "furigana": "にわとり", "japanese": "ニワトリ", "typing": "niwatori" },
    { "furigana": "ごーる！", "japanese": "ゴール！", "typing": "go-ru!" },
    { "furigana": "おまつり", "japanese": "お祭り", "typing": "omaturi" },
    { "furigana": "しゃべる", "japanese": "シャベル", "typing": "syaberu" },
    { "furigana": "すこっぷ", "japanese": "スコップ", "typing": "sukoppu" },
    { "furigana": "はつゆめ", "japanese": "初夢", "typing": "hatuyume" },
    { "furigana": "くっきー", "japanese": "クッキー", "typing": "kukki-" },
    { "furigana": "こーひー", "japanese": "コーヒー", "typing": "ko-hi-" },
    { "furigana": "こうちゃ", "japanese": "紅茶", "typing": "koutya" },
    { "furigana": "せんとう", "japanese": "銭湯", "typing": "sentou" },
    { "furigana": "おはなみ", "japanese": "お花見", "typing": "ohanami" },
    { "furigana": "けしごむ", "japanese": "消しゴム", "typing": "kesigomu" },
    { "furigana": "べてらん", "japanese": "べテラン", "typing": "beteran" },
    { "furigana": "かまくら", "japanese": "かまくら", "typing": "kamakura" },
    { "furigana": "たいまー", "japanese": "タイマー", "typing": "taima-" },
    { "furigana": "ばんぱー", "japanese": "バンパー", "typing": "banpa-" },
    { "furigana": "ながぐつ", "japanese": "長靴", "typing": "nagagutu" },
    { "furigana": "さっかー", "japanese": "サッカー", "typing": "sakka-" },
    { "furigana": "すけーと", "japanese": "スケート", "typing": "suke-to" },
    { "furigana": "ばってら", "japanese": "バッテラ", "typing": "battera" },
    { "furigana": "ぎちょう", "japanese": "議長", "typing": "gityou" },
    { "furigana": "ねくたい", "japanese": "ネクタイ", "typing": "nekutai" },
    { "furigana": "かぼちゃ", "japanese": "かぼちゃ", "typing": "kabotya" },
    { "furigana": "こくばん", "japanese": "黒板", "typing": "kokuban" },
    { "furigana": "わるぢえ", "japanese": "悪知恵", "typing": "warudie" },
    { "furigana": "かんけり", "japanese": "缶蹴り", "typing": "kankeri" },
    
]











































