const apiKey = document.getElementById('apiKey');
const emptyButton = document.getElementById('emptyButton');
const inputText = document.getElementById('inputText');
const searchButton = document.getElementById('searchButton');
const nextButton = document.getElementById('nextButton');
const prevButton = document.getElementById('prevButton');
const eventTypeBox = document.getElementById('eventTypeBox');
const pageNum = document.getElementById('pageNum');
const errorText = document.getElementById('errorText');
const onairList = document.getElementById('onairList')

// ページトークンの初期化
let pageToken = "";
let nextPageToken = "";
let prevPageToken = "";
let currentPageNum = 1;
const perPage = 10;

// function -------------------------------------------------------------
const update = (token) => {
    pageToken = token;

    if(apiKey.value) getJsonFile(); // リクエスト
    else {
        errorText.textContent = ""
        createTable(testJson); // 疑似構造でテスト
    }
}

// Youtube data api をjsonファイルで取得
const getJsonFile = () => {
    const url = "https://www.googleapis.com/youtube/v3/search"
    let params = {
        key: apiKey.value,
        part: 'id,snippet',
        q: inputText.value,
        type: 'video',
        maxResults: perPage,
        pageToken: pageToken
    };
    const radioNodeList = eventTypeBox.eventType ;
    if ( radioNodeList.value === "live" ) params.eventType = 'live' 

    const qs = new URLSearchParams(params);
    fetch(`${url}?${qs}`)
        .then(response => {
            if (response.ok) return response.json();
            switch (response.status) { // エラーハンドリング
                case 400: 
                    apiKey.value = ""
                    throw Error(`${response.status}: INVALID_TOKEN`);
                case 401: throw Error(`${response.status}: UNAUTHORIZED`);
                case 500: throw Error(`${response.status}: INTERNAL_SERVER_ERROR`);
                case 502: throw Error(`${response.status}: BAD_GATEWAY`);
                case 403: throw Error(`${response.status}: FORBIDDEN: リクエスト上限に達しました。しばらく経ってからまた来てね`);
                case 404: throw Error(`${response.status}: NOT_FOUND`);
                default:  throw Error(`${response.status}: UNHANDLED_ERROR`);
            } 
        })
        .then(json => {
            console.log(json)
            createTable(json)

            nextPageToken = json.nextPageToken;
            prevPageToken = json.prevPageToken;
            pageNum.textContent = `表示 ${(currentPageNum - 1) * perPage + 1} ~ ${(currentPageNum - 1) * perPage + perPage} : 約 ${json.pageInfo.totalResults}` 

            if(!nextPageToken) nextButton.disabled = true
            else nextButton.disabled = false
            if(!prevPageToken) prevButton.disabled = true
            else prevButton.disabled = false

            return ;
        })
        .catch(err => {
            console.error(err)
            errorText.textContent = err.message
        });
}

const createTable = (json) => {
    while (onairList.firstChild) onairList.removeChild(onairList.firstChild);

    // table要素を生成
    let table = document.createElement('table');
    let thead = document.createElement('thead');
    let tbody = document.createElement('tbody');

    // th部分の作成
    let tr = document.createElement('tr');
    tr.appendChild( createTag_t('th', 'text', 'channelTitle') );
    tr.appendChild( createTag_t('th', 'text', 'title') );
    tr.appendChild( createTag_t('th', 'text', 'description') );
    tr.appendChild( createTag_t('th', 'text', 'publishedAt') );
    thead.appendChild(tr);

    // tr部分のループ
    for (const item of json.items) {
        console.log(item)
        tr = document.createElement('tr');
        tr.setAttribute("data-href", `https://www.youtube.com/watch?v=${item.id.videoId}`)
        tr.appendChild( createTag_t('td', 'text', item.snippet.channelTitle) );
        tr.appendChild( createTag_t('td', 'text', item.snippet.title) );
        tr.appendChild( createTag_t('td', 'text', item.snippet.description) );
        tr.appendChild( createTag_t('td', 'text', item.snippet.publishedAt) );
        tbody.appendChild(tr);
    }

    // テーブルに追加
    table.appendChild(thead);
    table.appendChild(tbody);
    
    // 生成したtable要素を追加する
    onairList.appendChild(table);
}

const createTag_t = (tag, attr, text) => {
    let t = document.createElement(`${tag}`);
    t.setAttribute('class', `${attr}`);
    t.textContent = `${text}`
    return t;
}

// ===< addEventLister >=========================================================
searchButton.addEventListener('click', () => { currentPageNum = 1; update("") });
nextButton.addEventListener('click', () => { currentPageNum++; update(nextPageToken) });
prevButton.addEventListener('click', () => { currentPageNum--; update(prevPageToken) });
emptyButton.addEventListener('click', () => { apiKey.value = "" });

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
            "kind": "youtube#searchResult",
            "etag": 'etag',
            "id": {
                "kind": 'kind: string',
                "videoId": 'videoId: string',
                "channelId": 'channelId: string',
                "playlistId": 'playlistId: string'
            },
            "snippet": {
                "publishedAt": 'publishedAt: datetime',
                "channelId": 'channelId: string',
                "title": 'title: string',
                "description": 'description: string',
                "thumbnails": {
                    'key': {
                        "url": 'url: string',
                        "width": 'width: unsigned integer',
                        "height": 'height: unsigned integer'
                    }
                },
                "channelTitle": 'channelTitle: string'
            }
        },
        {
            "kind": "youtube#searchResult",
            "etag": 'etag',
            "id": {
                "kind": 'kind: string',
                "videoId": 'videoId: string',
                "channelId": 'channelId: string',
                "playlistId": 'playlistId: string'
            },
            "snippet": {
                "publishedAt": 'publishedAt: datetime',
                "channelId": 'channelId: string',
                "title": 'title: string',
                "description": 'description: string',
                "thumbnails": {
                    'key': {
                        "url": 'url: string',
                        "width": 'width: unsigned integer',
                        "height": 'height: unsigned integer'
                    }
                },
                "channelTitle": 'channelTitle: string'
            }
        }

    ]
}