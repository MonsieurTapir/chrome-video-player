var current=0;
var play_list=[];
var src_vid =$("#source-vid");
var src_sub=$("#track-sub");
var playing=false;
var ready=false;
function handler_one_time(e){
	    e.target.removeEventListener(e.type, arguments.callee);
	    current++;
	    play();
}
function play(){
    console.log(current);
    if(current < play_list.length){
	var video_url=play_list[current].video_url;
	var subtitles_url=play_list[current].sub_url;
	console.log(play_list[current].name);
	src_vid.attr('src', video_url);
	if(subtitles_url!=null){
	    src_sub.attr('src',subtitles_url);
	}
	
	$("#vid").removeClass("hide");
	$("#vid").trigger('load');
	$("#vid").trigger('play');
	playing=true;
	ready=true;
	$(".playlist_item").removeClass("active");
	$("#item-"+current).addClass("active");
	var vid=$("#vid")[0];
	vid.addEventListener('ended', handler_one_time, false);

    }
    else{
	playing=false;
	ready=false;
	$("#vid").addClass("hide");
    }
}
$(document).ready(function () {
    var elem = document.querySelector('.sidenav');
    var instance = M.Sidenav.init(elem);

    var subs=[];

    $("#add-playlist").click(function(){
	var added=[];
	var files=$("#playlist-files")[0].files;
	for(k=0; k<files.length; k++){
	    console.log((files[k].name));
	    var name=files[k].name;
	    var pre=name.substring(0,name.lastIndexOf("."));
	    var ext=name.substring(name.lastIndexOf(".")+1);
	    var url=window.URL.createObjectURL(files[k]);
	    console.log(name+", "+pre+", "+ext);
	    if(ext==="vtt"){
		var flag=false;
		for(i=0;i<added.length;i++){
		    if(added[i].name===pre){
			added[i].sub_url=url;
			console.log("associated "+added[i].name+ " with " + name);
			flag=true;
			break;
		    }	
		}
		for(i=0;i<play_list.length;i++){
		    if(play_list[i].name===pre){
			play_list[i].sub_url=url;
			console.log("associated "+play_list[i].name+ " with " + name);
			flag=true;
			break;
		    }	
		}
		if(!flag){
		    subs.push({name:pre,url:url});
		}
	    }
	    else if(ext==="mp4" || ext==="mkv"){
		var item={name:pre,
			  video_url:url,
			  sub_url:null,
			  id:(play_list.length+added.length)}
		for(i=0;i<subs.length;i++){
		    if(subs[i].name===pre){
			item.sub_url=subs[i].url;
			subs.splice(i,1);
			console.log("associated "+subs[i].name+ " with "+ name);
			break;
		    }	
		}
		added.push(item);
	    }

	}
	for(k=0; k<added.length;k++){
	    var sub=added[k].sub_url===null?"":"(subs)";
	    $("#playlist").append("<li ><a class=\"playlist_item\" id=\"item-"+added[k].id+"\">"+added[k].name.substring(0,12)+ sub +" </a></li>");
	    play_list.push(added[k]);
	    $(".playlist_item").click(function(){
		index=this.id.split("-").pop();
		$(".playlist_item").removeClass("active");
		$("#"+this.id).addClass("active");
		current=index;
	    });
	}
    });
    $("#play_playlist").click(play);
    $("#go-btn").click(function(){
	var video = document.getElementById('vid');
	var video_sel=$("#video-file")[0];
	var video_url=null;
	if(video_sel.files.length>0){
	    video_url = window.URL.createObjectURL(video_sel.files[0]);
	}
	var sub_sel=$("#subtitle-file")[0];
	var subtitles_url=null;
	if(sub_sel.files.length>0){
	    subtitles_url=window.URL.createObjectURL(sub_sel.files[0]);
	}

	if(video_url!=null){
	    src_vid.attr('src', video_url);
	    if(subtitles_url!=null){
		src_sub.attr('src',subtitles_url);
	    }
	    $("#go-form").addClass("hide");
	    $("#vid").removeClass("hide");
	    $("#vid").trigger('load');
	    $("#vid").trigger('play');
	    playing=true;
	    ready=true;
	}


    });
    window.addEventListener("keyup", function (event) {
	if (event.defaultPrevented) {
	    return; // Should do nothing if the key event was already consumed.
	}

	switch (event.key) {
	case "Escape":
	    if(playing){
		$("#vid").trigger('pause');
		$("#vid").addClass("hide");
		playing=false;
	    }
	    else{
		if(ready){
		    
		    $("#vid").removeClass("hide");
		    playing=true;
		}
	    }
	    break;
	case "P":
	    instance.open();
	    break;
	default:
	    return; 
	}


	event.preventDefault();
    }, true);

});
