// Fires whenever a player has finished loading
function onPlayerReady(event) {
    video_id = $(event.target)['0']['a']['src'].replace("http://www.youtube.com/embed/","").replace('?enablejsapi=1&wmode=opaque','')
    parent.location.hash = "v="+video_id;
    event.target.playVideo();
}

// Fires when the player's state changes.
function onPlayerStateChange(event) {
    // Go to the next video after the current one is finished playing
    var counter = 6 ;
    if (event.data === 0) {
      setInterval(function() {
        counter--;
        if (counter >= 0) {
          $('body > div.fancybox-overlay.fancybox-overlay-fixed > div > div > div.fancybox-title.fancybox-title-float-wrap > span').text("Next Video in: "+counter)
        }
        // Display 'counter' wherever you want to display it.
        if (counter === 0) {
            if (isActive)
            {
                $.fancybox.next();
                clearInterval(counter);    
            }
            
        }
        
      }, 1000);
    }
    
}
$.urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null){
       return null;
    }
    else{
       return results[1] || 0;
    }
}
// The API will call this function when the page has finished downloading the JavaScript for the player API
function onYouTubePlayerAPIReady() {
    
    // Initialise the fancyBox after the DOM is loaded
    $(document).ready(function() {
        video_id = window.location.hash.substr(1).split('v=')[1]
        if (video_id)
        {
            anchor = '<a class="fancybox fancybox.iframe" href="http://www.youtube.com/embed/{0}?enablejsapi=1&wmode=opaque" rel="gallery" style="display:nonw;" id="top" name={1}>'.format(video_id)
            $(anchor).appendTo( 'body' );
            $(window).load(function(){
                $('#top').trigger('click'); 
            });            

        }
        dotAnimation()
        REDDITUBE.reddit_url = "https://www.reddit.com/r/videos.json?after=" 
        loadPage()
        $(".fancybox")
            .attr('rel', 'gallery')
            .fancybox({
                openEffect  : 'none',
                closeEffect : 'none',
                nextEffect  : 'none',
                prevEffect  : 'none',
                padding     : 0,
                margin      : 50,
                beforeShow  : function() {
                    // Find the iframe ID
                    var id = $.fancybox.inner.find('iframe').attr('id');
                    // Create video player object and add event listeners
                    var player = new YT.Player(id, {
                        events: {
                            'onReady': onPlayerReady,
                            'onStateChange': onPlayerStateChange
                        }
                    });
                }
            });
    });
    
}