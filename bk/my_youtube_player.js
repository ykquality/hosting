/*
//quality small|medium|large|hd720|hd1080|highres|default
//listtype playlist|search|user_uploads
//para&eventsDOC https://developers.google.com/youtube/js_api_reference?hl=ja#Events
//playerDOC https://developers.google.com/youtube/js_api_reference?hl=ja
//hostingURL https://ffb53aa3ecbc87f152cc84aadc31d7214dac224d.googledrive.com/host/0B7bRq8mWofTuNnk1X0Z4SU03VFk
/**/
 
 
var ytplayer;
var done = false;
var errors = [];
 
window.onload = function() {
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
};
function onYouTubeIframeAPIReady() {
    var initvid;
    var initvids;
    var initplaylist;
    var ele;
     
    if(document.getElementById('initvid')){ //普通の
        ele=document.getElementById('initvid');
        initvid=ele.value;
    }
    else if(document.getElementById('initvids')){ //vid1,vid2,vid3....
        ele=document.getElementById('initvids');
        initvids=ele.value;
    }
    else if(document.getElementById('initplaylist')){ //再生リスト
        ele=document.getElementById('initplaylist');
        initplaylist=ele.value;
    }
    //console.log("onYouTubeIframeAPIReady:"+initvid);
    ytplayer = getYTPlayer(ele,initvid,initvids,initplaylist);
}
function getYTPlayer(ele,initvid,initvids,initplaylist){
    if(!ele){
        return new YT.Player('ytplayer', {
            height: h,
            width: w,
            playerVars: {
                autoplay: 0,
                rel: 1,
                fs: 1,
                showinfo: 1,
                controls: 1,
                modestbranding: 0,
                autohide: 1,
                color: 'red',
                theme: 'light',
                enablejsapi: 1,
                version: 3
            },
            events: {
                'onReady': onPlayerReady,
                'onError': onPlayerError,
                'onStateChange': onPlayerStateChange
            }
        });
    }
    var w = (ele.style.width) ? ele.style.width : 512;
    var h = (ele.style.height) ? ele.style.height : 312;
    //console.log("w:"+w);
    //console.log("h:"+h);
    //console.log("initvid:"+initvid);
    //console.log("initvids:"+initvids);
    //console.log("initplaylist:"+initplaylist);
     
    if(initvid){
        var startsec;
        var quality;
        var protocol=ele.value.match(/ttp:\/\/|http:\/\/|https:\/\//);
        if (protocol){
            var args=getArgsFromURL(ele.value);
            initvid=args["v"];
            startsec=args["t"];
            quality=args["vq"];
        }
        else{
            initvid=ele.value;
            startsec=0;
            quality="default";
        }
        return new YT.Player('ytplayer', {
            height: h,
            width: w,
            videoId: initvid,
            playerVars: {
                autoplay: 0,
                rel: 1,
                fs: 1,
                showinfo: 1,
                controls: 1,
                modestbranding: 0,
                autohide: 1,
                color: 'red',
                theme: 'light',
                enablejsapi: 1,
                version: 3
            },
            events: {
                'onReady': onPlayerReady,
                'onError': onPlayerError,
                'onStateChange': onPlayerStateChange
            }
        });
    }
    else if(initvids){
        return new YT.Player('ytplayer', {
            height: h,
            width: w,
            playerVars: {
                playlist: initvids,
                autoplay: 0,
                rel: 1,
                fs: 1,
                showinfo: 1,
                controls: 1,
                modestbranding: 0,
                autohide: 1,
                color: 'red',
                theme: 'light',
                enablejsapi: 1,
                version: 3
            },
            events: {
                'onReady': onPlayerReady,
                'onError': onPlayerError,
                'onStateChange': onPlayerStateChange
            }
        });
    }
    else if(initplaylist){
        var args=initplaylist.split(',');
        return new YT.Player('ytplayer', {
            height: h,
            width: w,
            playerVars: {
                list: args[0],
                listType:args[1],
                autoplay: 0,
                rel: 1,
                fs: 1,
                showinfo: 1,
                controls: 1,
                modestbranding: 0,
                autohide: 1,
                color: 'red',
                theme: 'light',
                enablejsapi: 1,
                version: 3
            },
            events: {
                'onReady': onPlayerReady,
                'onError': onPlayerError,
                'onStateChange': onPlayerStateChange
            }
        });
    }
}
function getVideoUrl() {
    //console.log("getVideoUrl");
    var videoUrl = ytplayer.getVideoUrl();
    updateHTML('playerlog', videoUrl);
}
function onPlayerReady(event) {
    //console.log("onPlayerReady");
    //event.target.playVideo();
}
function onPlayerStateChange(event) {
    //console.log("onPlayerStateChange");
    /*if (event.data == YT.PlayerState.PLAYING && !done) { //6秒後に停止
        setTimeout(stopVideo, 6000);
        done = true;
    }/**/
    getVideoUrl();
    getEmbedCode(false);
     
    var s="";
    switch(event.data){
        case YT.PlayerState.ENDED:
            s+="YT.PlayerState.ENDED";
            break;
        case YT.PlayerState.PLAYING:
            s+="YT.PlayerState.PLAYING";
            break;
        case YT.PlayerState.PAUSED:
            s+="YT.PlayerState.PAUSED";
            break;
        case YT.PlayerState.BUFFERING:
            s+="YT.PlayerState.BUFFERING";
            break;
        case YT.PlayerState.CUED:
            s+="YT.PlayerState.CUED";
            break;
        case -1:
            break;
        default:
            break;
    }
}
function onPlayerError(event) {
    //console.log("onPlayerError:"+event.data);
    var s="";
    switch(event.data){
        case 2:
            s+="リクエストに無効なパラメータ値が含まれています。";
            break;
        case 5:
            s+="HTML5プレーヤーで再生できません。";
            break;
        case 100:
            s+="リクエストした動沿ｫ見つかりません。";
            break;
        case 101:
        case 150:
            s+="リクエストした動画の所有者が、埋め込み動画プレーヤーでの再生を許可していません。";
            break;
        case 160:
            s+="ライブイベントが終了しています。";
            break;
        case -1:
            break;
        default:
            break;
    }
    updateHTML('playerlog', s);
}
 
function stopVideo() {
    //console.log("stopVideo");
    ytplayer.stopVideo();
}
 
function seekTo(seconds, allowSeekAhead) {
    //console.log("seekTo:"+seconds+" "+allowSeekAhead);
    //events.push('seekTo(' + seconds + ', ' + allowSeekAhead + ');');
    ytplayer.seekTo(seconds, allowSeekAhead);
}
function loadVideo(idOrUrl) { //単品
    loadVideo(idOrUrl, "0", "default");
}
function loadVideo(idOrUrl, startSeconds, quality) {
    // console.log("loadVideo:"+idOrUrl+" "+startSeconds+" "+quality);
    var protocol=idOrUrl.match(/ttp:\/\/|http:\/\/|https:\/\//);
    if (protocol) {
        var args=getArgsFromURL(idOrUrl);
        ytplayer.loadVideoById(args['v'], args['t'], args['vq']);
        //events.push('loadVideoById(' + args["v"] + ', ' + args["t"] + ', ' + args["vq"] + ');');
    } else {
        ytplayer.loadVideoById(idOrUrl, parseInt(startSeconds), quality);
        //events.push('loadVideoById(' + idOrUrl + ', parseInt(' + startSeconds + '), ' + quality + ');');
    }
}
function loadVideos(list) { //vid1,vid2,vid3...
    loadVideos(list,"0", "0","default");
}
function loadVideos(list,index, startSeconds,quality) {
    //console.log("loadVideos:"+list+" "+index+" "+startSeconds+" "+quality);
    ytplayer.loadPlaylist(list,parseInt(index),parseInt(startSeconds),quality);
}
function loadPlaylist(list,listtype) { //listtype=playlist|search|user_uploads , list=playlistid|query|user
    loadPlaylist(list,listtype,"0", "0","default");
}
function loadPlaylist(list,listtype ,index, startSeconds,quality) {
    //console.log("loadPlaylist:"+list+" "+listtype+" "+index+" "+startSeconds+" "+quality);
    ytplayer.loadPlaylist(
    {
        list:list,
        listType:listtype,
        index:index,
        startSeconds:startSeconds,
        suggestedQuality:quality
    });
}
function cueVideo(idOrUrl) { //単品
    cueVideo(idOrUrl, "0", "default");
}
function cueVideo(idOrUrl, startSeconds, quality) {
    //console.log("cueVideo:"+idOrUrl+" "+startSeconds+" "+quality);
    var protocol=idOrUrl.match(/ttp:\/\/|http:\/\/|https:\/\//);
    if (protocol) {
        var args=getArgsFromURL(idOrUrl);
        ytplayer.cueVideoById(args['v'], args['t'], args['vq']);
        //events.push('cueVideoById(' + args["v"] + ', ' + args["t"] + ', ' + args["vq"] + ');');
    } else {
        ytplayer.cueVideoById(idOrUrl, parseInt(startSeconds), quality);
        //events.push('cueVideoById(' + idOrUrl + ', parseInt(' + startSeconds + '), ' + quality + ');');
    }
}
function cueVideos(list) { //vid1,vid2,vid3...
    cuePlaylist(list,"0", "0","default");
}
function cuePlaylist(list,index, startSeconds,quality) {
    //console.log("cueVideos:"+list+" "+index+" "+startSeconds+" "+quality);
    ytplayer.cuePlaylist(list,parseInt(index),parseInt(startSeconds),quality);
}
function cuePlaylist(list,listtype) { //listtype=playlist|search|user_uploads , list=playlistid|query|user
    cuePlaylist(list,listtype,"0", "0","default");
}
function cuePlaylist(list,listtype ,index, startSeconds,quality) {
    //console.log("cuePlaylist:"+list+" "+listtype+" "+index+" "+startSeconds+" "+quality);
    ytplayer.cuePlaylist(
    {
        list:list,
        listType:listtype,
        index:index,
        startSeconds:startSeconds,
        suggestedQuality:quality
    });
}
 
function getArgsFromURL(url){
    var args = new Object();
    if(url.indexOf("/embed/")>-1){
        url=url.substring(url.indexOf("/embed/")+"/embed/".length,url.length);
        if(url.indexOf("?")>-1)
            args["v"]=url.substring(0,url.indexOf("?"));
        else
            args["v"]=url.substring(0,url.length);
    }
    else if(url.indexOf("/v/")>-1){
        url=url.substring(url.indexOf("/v/")+"/v/".length,url.length);
        if(url.indexOf("?")>-1)
            args['v']=url.substring(0,url.indexOf("?"));
        else
            args['v']=url.substring(0,url.length);
    }
    else if(url.indexOf("youtu.be/")>-1){
        url=url.substring(url.indexOf("youtu.be/")+"youtu.be/".length,url.length);
        if(url.indexOf("?")>-1)
            args["v"]=url.substring(0,url.indexOf("?"));
        else
            args["v"]=url.substring(0,url.length);
    }
    var pair=url.substring(url.lastIndexOf("?")+"?".length,url.length).split('&');
    for(var i=0;pair[i];i++) {
        var kv = pair[i].split('=');
        args[kv[0]]=kv[1];
    }
    if(args.t){
        var min=0;
        var sec=0;
        var s=args.t;
         
        if(s.indexOf("m")<0&&s.indexOf("s")<0)
            ;
        else{
            if(s.indexOf("m")>-1){
                min=s.split('m')[0];
                s=s.split('m')[1];
            }
            if(s.indexOf("s")>-1){
                sec=s.split('s')[0];
                s=s.split('s')[1];
            }
            args.t=parseInt(min)*60+parseInt(sec);
        }
    }
    else{
        args.t=0;
    }
    //console.log("args[v] = "+args.v);
    //console.log("args[t] = "+args.t);
    //console.log("args[vq] = "+args.vq);
    return args;
}
 
 
 
function updateHTML(elmId, value) {
    //console.log("updateHTML elmId:"+elmId+" value:"+value);
    if(document.getElementById(elmId)){
        if(document.getElementById(elmId).innerHTML != value)
            document.getElementById(elmId).innerHTML = value;
    }
}
function getEmbedCode(updateParams) {
    //console.log("getEmbedCode updateParams:"+updateParams);
    var result = ytplayer.getVideoEmbedCode();
    var resultNode = document.getElementById('embedCode');
    //console.log("getEmbedCode result:"+result);
    //console.log("getEmbedCode resultNode:"+resultNode);
    if (resultNode) {
        while (resultNode.hasChildNodes()) {
                resultNode.removeChild(resultNode.firstChild);
        }
    }
    else
        return;
    if (result) {
        var newNode = document.createElement('textarea');
        newNode.id = 'embed_string';
        newNode.cols = 70;
        newNode.rows = 5;
 
        // Make the embed code easier to read.
        result = result.replace(/><([^\/])/g, '>\n<$1');
        newNode.value = result;
        resultNode.appendChild(newNode); // append code to output node
    }
    updateHTML('ytplayer', result); // show embedded player preview
}
