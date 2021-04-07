$(function(){
    //ページトークンの初期化
    var pageToken = "";
    var nextPageToken = "";
    var prevPageToken = "";
    //Youtube data api をjsonファイルで取得
    function getJsonFile(){
    $.getJSON(
        'https://www.googleapis.com/youtube/v3/search?key=AIzaSyBpVvu-lRJpV1glTDMQ0G7mH2gvUYwJAy0&part=id,snippet',
        {q:$('#inputText').val(),
        type:'video',
        maxResults:50,
        pageToken:pageToken
    },
        function(data){
            $.each(data['items'],function(i,item){
                console.log(item)
                $("#result").append('<li data-theme="c"><div><a href=https://www.youtube.com/watch?v=' + item.id.videoId + '>' + item.snippet.title + '</a></div></li>');
            });
            nextPageToken = data.nextPageToken;
            prevPageToken = data.prevPageToken;
    });
    }
    $('#searchButton').on('click',function(){
        $('li').remove();
        pageToken = "";
        getJsonFile();
    })
    $('#nextButton').on('click',function(){
        $('li').remove();
        pageToken = nextPageToken;
        getJsonFile();
    })
    $('#prevButton').on('click',function(){
        $('li').remove();
        pageToken = prevPageToken;
        getJsonFile();
    })
});

// https://qiita.com/yasutomo99/items/1b7f1173c95d39c4db22