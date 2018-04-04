$(document).ready(function () {
    var src_vid =$("#source-vid");
    var src_sub=$("#track-sub");
    var playing=false;
    var ready=false;
    
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
		$("#go-form").removeClass("hide");
		playing=false;
	    }
	    else{
		if(ready){
		    
		    $("#vid").removeClass("hide");
		    $("#go-form").addClass("hide");
		    playing=true;
		}
	    }
	    break;
	default:
	    return; 
	}


	event.preventDefault();
    }, true);

});
