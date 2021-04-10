const apiKey = document.getElementById('apiKey')
const emptyButton = document.getElementById('emptyButton')
const inputText = document.getElementById('inputText')
const searchButton = document.getElementById('searchButton')
const nextButton = document.getElementById('nextButton')
const prevButton = document.getElementById('prevButton')
const eventTypeBox = document.getElementById('eventTypeBox')
const pageNum = document.getElementById('pageNum')
const errorText = document.getElementById('errorText')
const onairList = document.getElementById('onairList')
const getPageNumBox = document.getElementById('getPageNumBox')
const whiteSpaceButton = document.getElementById('whiteSpaceButton')

// ページトークンの初期化
let pageToken = ""
let nextPageToken = ""
let prevPageToken = ""
let currentPageNum = 1
let perPage = 20

// function -------------------------------------------------------------
const update = async (token) => {
    searchButton.disabled = true // 連打対策
    nextButton.disabled = true
    prevButton.disabled = true
    whiteSpaceButton.disabled = true
    // -----------------------------------------
    pageToken = token
    errorText.textContent = ""
    let json = testJson // 疑似構造で初期化

    // リクエスト（待ち）
    if(apiKey.value) json = await getJsonFile()

    // 組み立て
    createTable(json) 

    nextPageToken = json.nextPageToken || ""
    prevPageToken = json.prevPageToken || ""

    const basePageNum = (currentPageNum - 1) * perPage
    const totalResults = json.pageInfo ? json.pageInfo.totalResults : "---"
    pageNum.textContent = `表示 ${basePageNum + 1} ~ ${basePageNum + perPage} : 約 ${totalResults}` 

    // -----------------------------------------
    whiteSpaceButton.disabled = false
    prevButton.disabled = !prevPageToken ? true : false
    nextButton.disabled = !nextPageToken ? true : false
    searchButton.disabled = false
}

// Youtube data api をjsonファイルで取得
const getJsonFile = async () => {
    const url = "https://www.googleapis.com/youtube/v3/search"
    let params = {
        key: apiKey.value,
        part: 'id,snippet',
        q: inputText.value,
        type: 'video',
        maxResults: perPage,
        pageToken: pageToken
    }
    const radioNodeList = eventTypeBox.eventType
    if ( radioNodeList.value === "live" ) params.eventType = 'live' 
    const qs = new URLSearchParams(params)
    
    try {
        const response = await fetch(`${url}?${qs}`)
        if (!response.ok) { // エラーハンドリング
            apiKey.value = ""
            console.warn(`requestlink: ${url}?${qs}`)
            console.warn(response)
            const err = await response.json()
            const code = err.error.code
            const message = err.error.message
            switch (code) {
                case 400: throw new Error(`${code}: INVALID_TOKEN\n${message}`)
                case 401: throw new Error(`${code}: UNAUTHORIZED\n${message}`)
                case 500: throw new Error(`${code}: INTERNAL_SERVER_ERROR\n${message}`)
                case 502: throw new Error(`${code}: BAD_GATEWAY\n${message}`)
                case 403: throw new Error(`${code}: FORBIDDEN\nリクエスト上限に達しました。しばらく経ってからまた来てね\n${message}`)
                case 404: throw new Error(`${code}: NOT_FOUND\n${message}`)
                default:  throw new Error(`${code}: UNHANDLED_ERROR\n${message}`)
            }
        }
        
        return await response.json()

    } catch (err) {
        console.error(err)
        errorText.textContent = err.message
        return []
    }
}

const createTable = (json) => {
    if(isEmpty(json)) return console.warn(`createTable : args is empty.`)

    // 要素初期化
    while (onairList.firstChild) onairList.removeChild(onairList.firstChild)

    // table要素を生成
    let table = document.createElement('table')
    let thead = document.createElement('thead')
    let tbody = document.createElement('tbody')
    tbody.setAttribute('id', `tbody`)

    // th部分の作成
    let tr = document.createElement('tr')
    tr.appendChild( createTag_t('th', 'no', 'No') )
    tr.appendChild( createTag_t('th', 'channelTitle', 'channelTitle') )
    tr.appendChild( createTag_t('th', 'title', 'title') )
    // tr.appendChild( createTag_t('th', 'publishedAt', 'publishedAt') )
    tr.appendChild( createTag_t('th', 'description', 'description') )
    thead.appendChild(tr)
    
    // tr部分のループ
    let number = (currentPageNum - 1) * perPage
    for (const item of json.items) {
        tr = document.createElement('tr')
        tr.setAttribute("data-href", `https://www.youtube.com/watch?v=${item.id.videoId}`)
        tr.appendChild( createTag_t('td', 'no', ++number) )
        tr.appendChild( createTag_t('td', 'channelTitle', item.snippet.channelTitle) )
        tr.appendChild( createTag_t('td', 'title', item.snippet.title) )
        // tr.appendChild( createTag_t('td', 'publishedAt', item.snippet.publishedAt) )
        tr.appendChild( createTag_t('td', 'description', item.snippet.description) )
        tbody.appendChild(tr)
    }

    // テーブルに追加
    table.appendChild(thead)
    table.appendChild(tbody)
    
    // 生成したtable要素を追加する
    onairList.appendChild(table)

    // JQuery 行リンク作成
    jQuery(($) => {
        $('tbody tr[data-href]').addClass('clickable').delegate('*', 'click', function() {
            if ( this.tagName !== 'A' ) {
                window.open( $(this).parents('tr').data('href') , '_blank')
            }
            return false
        })
    })
}

const createTag_t = (tag, attr, text) => {
    let t = document.createElement(`${tag}`)
    t.setAttribute('class', `${attr}`)
    t.textContent = `${text}`
    return t
}

const isEmpty = (val) => {
    if ( !val ) { // null, undefined,'', 0, false
        if ( val !== 0 && val !== false ) return true
    }else if( typeof val == "object"){// array or object
        return Object.keys(val).length === 0
    }

    return false//値は空ではない
}
// ===< addEventLister >=========================================================
getPageNumBox.addEventListener('change', (event) => { perPage = event.currentTarget.value })
searchButton.addEventListener('click', () => { currentPageNum = 1; update("") })
nextButton.addEventListener('click', () => { currentPageNum++; update(nextPageToken) })
prevButton.addEventListener('click', () => { currentPageNum--; update(prevPageToken) })
emptyButton.addEventListener('click', () => { apiKey.value = "" })
whiteSpaceButton.addEventListener('click', () => {
    const tbody = document.getElementById('tbody')
    if (tbody.style.whiteSpace === "nowrap" || tbody.style.whiteSpace === "") {
        tbody.style.whiteSpace = "normal";
    } else {
        tbody.style.whiteSpace = "nowrap";
    }
})

// test
const testJson = {
    "kind": "youtube#searchListResponse",
    "etag": 'etag: etag',
    "nextPageToken": 'nextPageToken: string',
    "prevPageToken": 'prevPageToken: string',
    "pageInfo": {
        "totalResults": 'totalResults: integer',
        "resultsPerPage": 'resultsPerPage: intege'
    },
    "items": [
        {
            "id": { "channelId": 'channelId: string',},
            "snippet": {
                "channelTitle": 'たろう',
                "title": '【RTA】走り切ってやるぜ【VTuber】',
                "description": 'こんな感じで表示されます。まあまあ良さそうですかね。人それぞれあると思いますが。',
            }
        },
        {
            "id": { "channelId": 'channelId: string',},
            "snippet": {
                "channelTitle": 'キララ☆ラキ',
                "title": '雑にやる天空ドドメキチャート 32日目',
                "description": '開閉ボタンを押すとDescriptionを全部読めます。',
            }
        },
        {
            "id": { "channelId": 'channelId: string',},
            "snippet": {
                "channelTitle": 'あ',
                "title": '世界記録を出すまで寝ないでやるRTA',
                "description": 'タウンページみたいに一覧で見たいという欲求があるが、どこにもないので、作った。しかし、リクエスト数の制限の話もあるので、気軽に使えない。けど、まあ良いか。',
            }
        },
        {
            "id": { "channelId": 'channelId: string',},
            "snippet": {
                "channelTitle": '名無しさん',
                "title": '賑やかし',
                "description": 'ちなみにクリックするとYoutubeページに飛べます（これだと飛べないですが、飛べます）',
            }
        },
        {
            "id": { "channelId": 'channelId: string',},
            "snippet": {
                "channelTitle": '名無しさん',
                "title": '賑やかし',
                "description": 'RTAありがてえ',
            }
        },
        {
            "id": { "channelId": 'channelId: string',},
            "snippet": {
                "channelTitle": '名無しさん',
                "title": '賑やかし',
                "description": 'わーわー',
            }
        },
        {
            "id": { "channelId": 'channelId: string',},
            "snippet": {
                "channelTitle": '名無しさん',
                "title": '賑やかし',
                "description": 'わーわー',
            }
        },
        {
            "id": { "channelId": 'channelId: string',},
            "snippet": {
                "channelTitle": '名無しさん',
                "title": '賑やかし',
                "description": 'わーわー',
            }
        },
        {
            "id": { "channelId": 'channelId: string',},
            "snippet": {
                "channelTitle": '名無しさん',
                "title": '賑やかし',
                "description": 'わーわー',
            }
        },
    ]
}