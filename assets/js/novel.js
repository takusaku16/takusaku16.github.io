// JQuery用
const J_bookTextCover = $('#book-text-cover');// JQuery メソッドを利用する用( animate )

// 全体
const siteHeader = document.getElementsByClassName('site-header')[0];
const wrapper = document.getElementsByClassName('wrapper')[1]; // 1つ目はヘッダー
const pageContent = document.getElementsByClassName('page-content')[0];

// ui-header
const leftButton = document.getElementById('leftButton');
const rightButton = document.getElementById('rightButton');
const pageNumMaxLabel = document.getElementById('pageNumMaxLabel');
const fontFamilyLabel = document.getElementById('fontFamilyLabel');
const fontFamilyBox = document.getElementById('fontFamilyBox');
const fontSizeUpButton = document.getElementById('fontSizeUpButton');
const fontSizeLabel = document.getElementById('fontSizeLabel');
const fontSizeDownButton = document.getElementById('fontSizeDownButton');
const fontSizeDefaultButton = document.getElementById('fontSizeDefaultButton');
const fontSizeBox = document.getElementById('fontSizeBox');
const multiButton = document.getElementById('multiButton');
const spreadButton = document.getElementById('spreadButton');
const halfButton = document.getElementById('halfButton');
const backgroundColorpicker = document.getElementById("backgroundColorpicker");
const fontColorpicker = document.getElementById("fontColorpicker");
const pageTextColorpicker = document.getElementById("pageTextColorpicker");
const pageContentColorpicker = document.getElementById("pageContentColorpicker");
const colorThemeBox = document.getElementById("colorThemeBox");
const deleteSession = document.getElementById("deleteSession");

// ui-middle
const readModeButton = document.getElementById('readModeButton');
const pageNextLink = document.getElementById('page-nextLink');
const pagePrevLink = document.getElementById('page-prevLink');

// ui-footer
const getScroll = document.getElementById('getScroll');
const scrollLeftLabel = document.getElementById('scrollLeftLabel');

// book
const book = document.getElementById('book');
const bookTextCover = document.getElementById('book-text-cover');
const bookHeader = document.getElementById('book-header');
const bookText = document.getElementById('book-text');
const bookPageNum = document.getElementById('book-pageNum');
const bookOverlay = document.getElementById('book-overlay');
const bookUiHeader = document.getElementById('book-ui-header');
const bookUiFooter = document.getElementById('book-ui-footer');

// 定数
const fadeTime = 300
const fadeChangeNumberTime = 100
const bookInitialWidth = 594;
const bookPadding = 36 * 2;

// 初期値 : book関連
let bookWidth = bookInitialWidth;
let bookMoveScroll = bookWidth;
let pageNumMax = 0
let pageNum = 1

// 初期値 : デザイン関連
let fontSize = 18
let fontFamily = ""
let backgroundColor = ""
let fontColor = ""
let pageTextColor = ""
let pageContentColor = ""

// function -------------------------------------------------------------
const updateSetting = () => {
    fontSizeLabel.textContent = `${fontSize}px`
    bookText.style.fontSize = `${fontSize}px`
    fontFamilyLabel.textContent = `${fontFamily}`
    bookText.style.fontFamily = `${fontFamily}`
    book.style.backgroundColor = `${backgroundColor}`
    bookText.style.color = `${fontColor}`
    bookHeader.style.color = `${pageTextColor}`
    pageContent.style.backgroundColor = `${pageContentColor}`
    pageContent.style.color = `${fontColor}`
    pageNumMax = Math.floor( (bookText.clientWidth + bookMoveScroll) / bookMoveScroll )
    pageNumMaxLabel.textContent = `${pageNum} / ${pageNumMax}`
}
const nextPage = () => {
    let bookScrollLeftAfter = bookMoveScroll * ((pageNum - 1) + 1) * -1
    if(bookScrollLeftAfter < (bookText.clientWidth * -1) + (bookMoveScroll) ) {
        bookScrollLeftAfter = (bookText.clientWidth * -1) + (bookMoveScroll)
        if(bookTextCover.scrollLeft === bookScrollLeftAfter) return;
    }
    if(pageNum < pageNumMax) pageNum++
    J_bookTextCover.animate({ scrollLeft: bookScrollLeftAfter }, fadeTime, 'swing');
    bookPageNum.classList.add('left');
    setTimeout(function() { bookPageNum.classList.remove('left');   }, fadeTime);
    setTimeout(function() { bookPageNum.textContent = `${pageNum}`; }, fadeChangeNumberTime);
    updateSetting();
}
const prevPage = () => {
    if(pageNum > pageNumMax) pageNum = pageNumMax
    let bookScrollLeftAfter = bookMoveScroll * ((pageNum - 1) - 1) * -1
    if(bookScrollLeftAfter > 0) {
        bookScrollLeftAfter = 0
        if(bookTextCover.scrollLeft === bookScrollLeftAfter) return;
    }
    if(pageNum > 1) pageNum--
    J_bookTextCover.animate({ scrollLeft: bookScrollLeftAfter }, fadeTime, 'swing');
    bookPageNum.classList.add('right');
    setTimeout(function() { bookPageNum.classList.remove('right');  }, fadeTime);
    setTimeout(function() { bookPageNum.textContent = `${pageNum}`; }, fadeChangeNumberTime);
    updateSetting();
}
const changeReadMode = () => {
    const siteFooter = document.getElementsByClassName('site-footer')[0];

    if(siteHeader.style.display === "none") siteHeader.style.display = "block"
    else siteHeader.style.display = "none"

    if(bookUiHeader.style.display === "none") bookUiHeader.style.display = "block"
    else bookUiHeader.style.display = "none"

    if(bookUiFooter.style.display === "none") bookUiFooter.style.display = "block"
    else bookUiFooter.style.display = "none"

    if(siteFooter.style.display === "none") siteFooter.style.display = "block"
    else siteFooter.style.display = "none"

    if(wrapper.classList.contains("wrapper")) wrapper.classList.remove("wrapper")
    else wrapper.classList.add("wrapper")
}
const changeBookSize = (afterWidth) => {
    bookWidth = afterWidth
    bookMoveScroll = bookWidth
    book.style.width = `${bookWidth + bookPadding}px`
    bookOverlay.style.width = `${bookWidth + bookPadding}px`
    bookTextCover.style.width = `${bookWidth}px`
    updateSetting();
}
const changeColorTheme = (theme) => {
    if(theme === "light"){
        backgroundColor = "#f4e7b8"
        fontColor = "#111111"
        pageTextColor = "#777777"
        pageContentColor = "#fdfdfd"
    } else if(theme === "dark"){
        backgroundColor = "#10100f"
        fontColor = "#cdc6c6"
        pageTextColor = "#777777"
        pageContentColor = "#080808"
    } else if(theme === "blood"){
        backgroundColor = "#10100f"
        fontColor = "#db3939"
        pageTextColor = "#cc7575"
        pageContentColor = "#080808"
    } else { /* null */ }
    backgroundColorpicker.value = backgroundColor
    fontColorpicker.value = fontColor
    pageTextColorpicker.value = pageTextColor
    pageContentColorpicker.value = pageContentColor
    colorThemeBox.value = theme
    updateSetting();
}
const storeSession = () => {
    let isReadMode = 0
    if(siteHeader.style.display === "none") isReadMode = 1
    sessionStorage.setItem('isReadMode', isReadMode);
    sessionStorage.setItem('sessionFontSize', fontSize);
    sessionStorage.setItem('sessionBookWidth', bookWidth);
    sessionStorage.setItem('sessionBackgroundColor', backgroundColor);
    sessionStorage.setItem('sessionFontColor', fontColor);
    sessionStorage.setItem('sessionPageTextColor', pageTextColor);
    sessionStorage.setItem('sessionPageContentColor', pageContentColor);
}

// ===< addEventLister >~~=======================================================
// init ----------------------------------------------------------------
window.addEventListener('load', () => {
    const sessionBookWidth = parseInt(sessionStorage.getItem('sessionBookWidth'),10);
    const sessionFontSize = parseInt(sessionStorage.getItem('sessionFontSize'),10);
    const isReadMode = Boolean(parseInt(sessionStorage.getItem('isReadMode'),10))
    const sessionBackgroundColor = sessionStorage.getItem('sessionBackgroundColor');
    const sessionFontColor = sessionStorage.getItem('sessionFontColor');
    const sessionPageTextColor = sessionStorage.getItem('sessionPageTextColor');
    const sessionPageContentColor = sessionStorage.getItem('sessionPageContentColor');
    
    if(sessionFontSize) fontSize = sessionFontSize
    if(sessionBookWidth) changeBookSize(sessionBookWidth)
    else changeBookSize(bookInitialWidth)
    if(isReadMode) changeReadMode()
    if(sessionBackgroundColor) {
        backgroundColor = sessionBackgroundColor
        fontColor = sessionFontColor
        pageTextColor = sessionPageTextColor
        pageContentColor = sessionPageContentColor
        changeColorTheme("")
    } else changeColorTheme("light")
    bookPageNum.textContent = `${pageNum}`
})

deleteSession.addEventListener('click', (event) => {
    sessionStorage.removeItem('isReadMode')
    sessionStorage.removeItem('sessionFontSize')
    sessionStorage.removeItem('sessionBookWidth')
    sessionStorage.removeItem('sessionBackgroundColor')
    sessionStorage.removeItem('sessionFontColor')
    sessionStorage.removeItem('sessionPageTextColor')
    sessionStorage.removeItem('sessionPageContentColor')
});

// book, 入力 ----------------------------------------------------------
//    < scroll - mouse >
bookOverlay.addEventListener('click', (event) => {
    if(event.offsetX < bookWidth /2) nextPage();
    else prevPage();
});

//    < key >
document.body.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' || event.key === 'Left') nextPage()
    if (event.key === 'ArrowRight' || event.key === 'Right') prevPage()
    if (event.key === 'ArrowUp' || event.key === 'Up') { fontSize++; updateSetting(); }
    if (event.key === 'ArrowDown' || event.key === 'Down') { fontSize--; updateSetting(); }
    if (event.key === 'f') changeReadMode()
    if (event.key === 'l') changeColorTheme("light")
    if (event.key === 'd') changeColorTheme("dark")
    if (event.key === 'b') changeColorTheme("blood")
    if (event.key === 'm') changeBookSize(bookInitialWidth * 2)
    if (event.key === 's') changeBookSize(bookInitialWidth)
    if (event.key === 'h') changeBookSize(bookInitialWidth / 2)
});

// スワイプ ------------------------------------------------------------
let startX = null;
let startY = null;
let endX = null;
let endY = null;
const logSwipeStart = (event) => {
    event.preventDefault();
    startX = event.touches[0].pageX;
    startY = event.touches[0].pageY;
}
const logSwipe = (event) => {
    event.preventDefault();
    endX = event.touches[0].pageX;
    endY = event.touches[0].pageY;
}
const logSwipeEnd = (event) => {
    event.preventDefault();
    if(Math.abs(endY - startY) - Math.abs(endX - startX) > 0) {
        // 縦方向のスワイプが大きい場合、縦スクロール
        if( 0 < (endY - startY) ) scrollTo(0, readModeButton.getBoundingClientRect().top); // 下向き
        else scrollTo(0, 0); // 上向き
    } else {
        // 横方向のスワイプが大きい場合、ページを進める/戻す
        if( 0 < (endX - startX) ) nextPage(); // 右向き
        else prevPage();   // 左向き
    }
}
bookOverlay.addEventListener('touchmove', logSwipe, { passive: false });
bookOverlay.addEventListener('touchstart', logSwipeStart, { passive: false });
bookOverlay.addEventListener('touchend', logSwipeEnd, { passive: false });

// ui-header------------------------------------------------------------
//    < fontFamily >
fontFamilyBox.addEventListener('change', (event) => { fontFamily = event.currentTarget.value; updateSetting(); });

//    < color >
colorThemeBox.addEventListener('change', (event) => { changeColorTheme(event.currentTarget.value) });
backgroundColorpicker.addEventListener('change', (event) => { backgroundColor = event.currentTarget.value; updateSetting(); });
fontColorpicker.addEventListener('change', (event) => { fontColor = event.currentTarget.value; updateSetting(); });
pageTextColorpicker.addEventListener('change', (event) => { pageTextColor = event.currentTarget.value; updateSetting(); });
pageContentColorpicker.addEventListener('change', (event) => { pageContentColor = event.currentTarget.value; updateSetting(); });

//    < scroll >
leftButton.addEventListener('click', nextPage);
rightButton.addEventListener('click', prevPage);

//    < fontSize >
fontSizeUpButton.addEventListener('click', () => { fontSize++; updateSetting(); });
fontSizeDownButton.addEventListener('click', () => { fontSize--; updateSetting(); });
fontSizeDefaultButton.addEventListener('click', () => { fontSize = 18; updateSetting(); });
fontSizeBox.addEventListener('change', (event) => { fontSize = event.currentTarget.value; updateSetting(); });

//    < bookSize >
multiButton.addEventListener('click', () => { changeBookSize(bookInitialWidth * 2) });
spreadButton.addEventListener('click', () => { changeBookSize(bookInitialWidth) });
halfButton.addEventListener('click', () => { changeBookSize(bookInitialWidth / 2) });

// ui-middle------------------------------------------------------------
//    < readMode >
readModeButton.addEventListener('click', changeReadMode);
pageNextLink.addEventListener('click', storeSession);
pagePrevLink.addEventListener('click', storeSession);


// ui-footer -----------------------------------------------------------
getScroll.addEventListener('click', () => {
    scrollLeftLabel.textContent = `scrollLeft: ${bookTextCover.scrollLeft} : ${bookText.clientWidth} : ${bookMoveScroll}`
});

