// ワードリスト: typingWordList.js

// const ------------------------------------------------------------
const TIME_LIMIT = 90
const WORD_POOL_MAX = 6
const SPAWN_BASE_RATE = 95

// getElement ----------------------------------------------------------
const startButton = document.getElementById('start_button')
const timeText = document.getElementById('count')
const wordList = document.getElementById('wordList')
const scoreText = document.getElementById('scoredis')
let targetTypingText
let targetTypingDataText
let targetTypingOriginalDataText

// enum ----------------------------------------------------------------
const SCENE = {
    MENU:   Symbol('menu'),
    READY:  Symbol('ready'),
    GAME:   Symbol('game'),
    RESULT: Symbol('result')
}

// audio ------------------------------------------------------------
const context = new AudioContext();   // Audioコンテキストを作成

// variable ------------------------------------------------------------
let currentScene = SCENE.MENU
let correct
let mistake
let char_num
let word_preChar
let word_char
let word_laterChar
let isLockWord = false
let wordPoolMax
let wordPool

// ---------------------------------------------------------------------
//  Scene
// ---------------------------------------------------------------------
const startScene = (scene) => {
    currentScene = scene
    switch(currentScene){
        case SCENE.MENU:   break
        case SCENE.READY:  readyStart();  break
        case SCENE.GAME:   gameStart();   break
        case SCENE.RESULT: resultStart(); break 
    }
}
const nextSceneTimeInterval = (str, time, scene) => {
    let timer = time
    timeText.innerHTML = `${str}${timer}`
    const timerId = setInterval( () => {
        timer--
        timeText.innerHTML = `${str}${timer}`
        if(timer <= 0){
            clearInterval(timerId)
            startScene(scene)
        }
    }, 1000)
}

// ---------------------------------------------------------------------
//  Start
// ---------------------------------------------------------------------
const readyStart = () => {
    scoreText.innerHTML = ""
    startButton.style.visibility = "hidden"
    nextSceneTimeInterval("", 3, SCENE.GAME)
}
const gameStart = () => {
    mistake = 0
    correct = 0
    char_num = 0
    word_char = 0
    isLockWord = false
    wordPoolMax = WORD_POOL_MAX
    wordPool = 0
    spwanWord()
    spwanWord()
    spwanWord()
    nextSceneTimeInterval("残り時間：", TIME_LIMIT, SCENE.RESULT)
    spwanWordTimeInterval(TIME_LIMIT)
}
const resultStart = () => {
    const score = Math.floor( Math.pow(correct,2) * Math.pow((correct/(correct+mistake)),5) )
    const correctRate = ( correct/(correct+mistake)*100 ).toFixed(1)
    scoreText.innerHTML = `スコア:${score}点<hr>正タイプ数:${correct}<br>ミスタイプ数:${mistake}<br>正答率${correctRate}%`
    timeText.innerHTML = ``
    startButton.style.visibility = "visible"
    resetWordList()
}

// ---------------------------------------------------------------------
//  Update - word
// ---------------------------------------------------------------------
const spwanWordTimeInterval = (time) => {
    let timer = time * 10
    const timerId = setInterval( () => {
        timer--
        const random = getRandomIntInclusive(0, 100)
        const threshold = SPAWN_BASE_RATE - Math.floor(time/(timer/10))
        if(timer % 100 === 0) wordPoolMax++
        if(random > threshold && wordPool < wordPoolMax) spwanWord()
        if(timer <= 10) clearInterval(timerId)
        console.log(`${random} > ${threshold} : ${random > threshold} : ${timer} : ${Math.floor(time/(timer/10))} : ${time/(timer/10)} : ${wordPoolMax} : ${wordPool}`)
    }, 100)
}
const spwanWord = () => {
    let word = document.createElement('div')
    let japanese = document.createElement('div')
    let typing = document.createElement('div')
    word.setAttribute('class', `word`)
    japanese.setAttribute('class', `japanese`)
    typing.setAttribute('class', `typing`)

    const random = Math.floor( Math.random() * wordDataList.length )
    japanese.innerHTML = wordDataList[random].japanese
    typing.innerHTML = wordDataList[random].typing

    word.appendChild(japanese)
    word.appendChild(typing)
    wordList.appendChild(word)

    wordPool++
}
const resetWordList = () => {
    while (wordList.firstChild) wordList.removeChild(wordList.firstChild)
}

// ---------------------------------------------------------------------
//  Update - key
// ---------------------------------------------------------------------
const onkeydown = (e) => {
    if(currentScene === SCENE.MENU || currentScene === SCENE.RESULT) {
        if(e.keyCode === 32) startScene(SCENE.READY) // SPACE: ゲームスタート
    }
    if(currentScene !== SCENE.GAME) return
    if(e.keyCode === 16) return // SHIFTキー単体
    if(e.keyCode === 27) { // ESC: ロックオンを解除する
        if(isLockWord) {
            targetTypingText.innerHTML = targetTypingOriginalDataText
            resetChar()
        }
        return
    }

    let keyStr = String.fromCharCode(e.keyCode).toLowerCase()

    if      (e.keyCode === 189) keyStr = "-"
    else if (e.keyCode === 188) keyStr = ","
    else if (e.shiftKey === true && e.keyCode === 49) keyStr = "!"
    else if (e.shiftKey === true && e.keyCode === 63) keyStr = "?"

    console.log(`${e.shiftKey}:${e.keyCode}:${keyStr}`)

    if(!isLockWord){
        typingList = document.getElementsByClassName('typing');
        for (const t of typingList) {
            targetTypingText = t
            targetTypingDataText = t.innerHTML
            charInsort()
            if(matchChar(keyStr)){
                isLockWord = true
                targetTypingOriginalDataText = t.innerHTML
                break
            }
        }
        if(!isLockWord){
            resetChar()
            return
        }
    }

    if(matchChar(keyStr)){
        playSound(440, "square", 40)
        targetTypingText.innerHTML = `<span style='color: red'>${targetTypingDataText.substr(0,char_num+1)}</span>${targetTypingDataText.substr(char_num+1,targetTypingDataText.length)}`
        char_num++
        correct++
        if(char_num === targetTypingDataText.length){
            resetChar()
            wordPool--
            const wordNode = targetTypingText.parentNode;
            wordNode.parentNode.removeChild(wordNode) // 自身を削除
        }
        charInsort()
    } else {
        playSound(260, "square", 40)
        mistake++
    }
}

// ---------------------------------------------------------------------
//  文字
// ---------------------------------------------------------------------
const resetChar = () => {
    isLockWord = false
    word_preChar = ""
    word_char = ""
    word_laterChar = ""
    char_num = 0
}
const charInsort = () => {
    word_preChar = word_char
    word_char = targetTypingDataText.charAt(char_num)
    if(char_num < targetTypingDataText.length){
        word_laterChar = targetTypingDataText.charAt(char_num+1)
    } else word_laterChar = ""
}

// ---------------------------------------------------------------------
//  文字一致
// ---------------------------------------------------------------------
const matchChar = (inputChar) => {
    if(inputChar === word_char) return true
    else {
        console.log(`${inputChar} : ${word_preChar} - ${word_char} - ${word_laterChar}`)

        // 異なる文字
        if(inputChar === 'c' && word_char === 'k'){ // ka ku ko -> ca cu co
            if(word_laterChar === 'a' || word_laterChar === 'u' || word_laterChar === 'o') return replaceCharData(inputChar)
        }
        if(inputChar === 'c' && word_char === 's'){ // si se -> ci ce
            if(word_laterChar === 'i' || word_laterChar === 'e') return replaceCharData(inputChar)
        }
        if(inputChar === 'j' && word_char === 'z'){ // zi -> ji
            if(word_laterChar === 'i') return replaceCharData(inputChar)
        }
        if(inputChar === 'c' && word_char === 't'){ // ti -> chi
            if(word_laterChar === 'i') return replaceCharData(inputChar + 'h')
        }
        if(inputChar === 'f' && word_char === 'h'){ // hu -> fu
            if(word_laterChar === 'u') return replaceCharData(inputChar)
        }
        if(inputChar === 'x' && word_char === 'n'){ // nn -> xn
            if(word_laterChar === 'n') return replaceCharData(inputChar)
        }
        if(inputChar === 'x' && word_char === 'l'){
            // la li lu le lo -> xa xi xu xe xo
            if(word_laterChar === 'a' || word_laterChar === 'i' || word_laterChar === 'u' || word_laterChar === 'e' || word_laterChar === 'o') return replaceCharData(inputChar)
            
            // lya lyu lyo -> xya xyu xyo
            if(word_laterChar === 'y') return replaceCharData(inputChar)

            // ltu -> xtu
            if(word_laterChar === 't') return replaceCharData(inputChar)
        }
        if(inputChar === 'x' && word_char === 'l'){ // la li lu le lo -> xa xi xu xe xo
            if(word_laterChar === 'a' || word_laterChar === 'i' || word_laterChar === 'u' || word_laterChar === 'e' || word_laterChar === 'o') return replaceCharData(inputChar)
        }
        if(inputChar === 'h' && word_preChar === 's' && word_char === 'y'){ // sya syu sye syo -> sha shu she sho
            if(word_laterChar === 'a' || word_laterChar === 'u' || word_laterChar === 'e' || word_laterChar === 'o') return replaceCharData(inputChar)
        }
        if(inputChar === 'z' && word_char === 'j'){ // jyi jye -> zyi zye
            if(word_laterChar === 'y') return replaceCharData(inputChar)
        }
        if(inputChar === 'c' && word_char === 't'){ // tya tyi tyu tye tyo -> cya cyi cyu cye cyo
            if(word_laterChar === 'y') return replaceCharData(inputChar)
        }
        if(inputChar === 'h' && word_preChar === 'c' && word_char === 'y'){ // cya cyu cye cyo -> cha chu che cho
            if(word_laterChar === 'a' || word_laterChar === 'u' || word_laterChar === 'e' || word_laterChar === 'o') return replaceCharData(inputChar)
        }

        // あってもなくても良い文字
        if(inputChar === 'h' && word_preChar === 's'){ // si -> shi
            if(word_char === 'i') return insertCharData(inputChar)
        }
        if(inputChar === 's' && word_preChar === 't'){ // tu -> tsu
            if(word_char === 'u') return insertCharData(inputChar)
        }
        if(inputChar === 'h' && word_preChar === 'w'){ // wi we -> whi whe
            if(word_char === 'i' || word_char === 'e') return insertCharData(inputChar)
        }
        if(inputChar === 'y' && word_preChar === 'j'){ // ja ju jo -> jya jyu jyo
            if(word_char === 'a' || word_char === 'u'|| word_char === 'o') return insertCharData(inputChar)
        }
    }
    return false
}
const replaceCharData = (char) => {
    let text = targetTypingDataText.substr(0,char_num) + char + targetTypingDataText.substr(char_num+1,targetTypingDataText.length)
    targetTypingDataText = text
    return true
}
const insertCharData = (char) => {
    let text = targetTypingDataText.substr(0,char_num) + char + targetTypingDataText.substr(char_num,targetTypingDataText.length)
    targetTypingDataText = text
    return true
}

// ---------------------------------------------------------------------
//  Audio
// ---------------------------------------------------------------------
const playSound = (frequency, type, time) => {
    let osc = context.createOscillator();  // オシレーター生成
    osc.frequency.value = frequency;  // 440Hz
    osc.type = type;    // 矩形波にする
    osc.connect(context.destination);   // 接続する
    osc.start();
    const s = setTimeout( () => {
        osc.stop();
    }, time)
}

// ---------------------------------------------------------------------
//  汎用
// ---------------------------------------------------------------------
const getRandomIntInclusive = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// ===< addEventLister >=========================================================
document.addEventListener("keydown", onkeydown)
startButton.addEventListener("click", () => { startScene(SCENE.READY) })


