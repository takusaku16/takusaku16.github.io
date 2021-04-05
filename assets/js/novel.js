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

// ui-middle
const readModeButton = document.getElementById('readModeButton');

// ui-footer
const getScroll = document.getElementById('getScroll');
const scrollLeftLabel = document.getElementById('scrollLeftLabel');

// book
const book = document.getElementById('book');
const bookTextCover = document.getElementById('book-text-cover');
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
    bookPageNum.style.color = `${pageTextColor}`
    pageContent.style.backgroundColor = `${pageContentColor}`
    pageContent.style.color = `${fontColor}`
    pageNumMax = Math.floor( (bookText.clientWidth + bookMoveScroll) / bookMoveScroll )
    pageNumMaxLabel.textContent = `${pageNumMax}`
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
        backgroundColor = "#f7f2df"
        fontColor = "#111111"
        pageTextColor = "#777777"
        pageContentColor = "#fdfdfd"
    } else if(theme === "dark"){
        backgroundColor = "#10100f"
        fontColor = "#cdc6c6"
        pageTextColor = "#777777"
        pageContentColor = "#080808"
    }
    backgroundColorpicker.value = backgroundColor
    fontColorpicker.value = fontColor
    pageTextColorpicker.value = pageTextColor
    pageContentColorpicker.value = pageContentColor
    colorThemeBox.value = theme
    updateSetting();
}

// ===< addEventLister >~~=======================================================
// init ----------------------------------------------------------------
window.addEventListener('load', () => {
    changeBookSize(bookInitialWidth)
    changeColorTheme("light")
    bookPageNum.textContent = `${pageNum}`
})

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
    if (event.key === 'm') changeBookSize(bookInitialWidth * 2)
    if (event.key === 's') changeBookSize(bookInitialWidth)
    if (event.key === 'h') changeBookSize(bookInitialWidth / 2)
});

// ui-header------------------------------------------------------------
//    < fontFamily >
fontFamilyBox.addEventListener('change', (event) => { fontFamily = event.currentTarget.value; updateSetting(); });

//    < color >
colorThemeBox.addEventListener('change', (event) => { changeColorTheme(event.currentTarget.value) });
backgroundColorpicker.addEventListener('change', (event) => { backgroundColor = event.currentTarget.value; updateSetting(); });
fontColorpicker.addEventListener('change', (event) => { fontColor = event.currentTarget.value; updateSetting(); });
pageTextColorpicker.addEventListener('change', (event) => { pageTextgroundColor = event.currentTarget.value; updateSetting(); });
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

// ui-footer -----------------------------------------------------------
getScroll.addEventListener('click', () => {
    scrollLeftLabel.textContent = `scrollLeft: ${bookTextCover.scrollLeft} : ${bookText.clientWidth} : ${bookMoveScroll}`
});

