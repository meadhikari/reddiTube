function dotAnimation()
{
  $('#main').html('<div id="loading"><h2>Loading</h2></div>')
  //this feels stupid
  var originalText = $("h2").text(),
  i  = 0;
  setInterval(function() 
  {

      $("h2").append(".");
      i++;
      
      if(i == 4)
      {
          $("h2").html(originalText);
          i = 0;
      }

  }, 500);
}

// Fires whenever a player has finished loading
function onPlayerReady(event) {
    event.target.playVideo();
}

// Fires when the player's state changes.
function onPlayerStateChange(event) {
    // Go to the next video after the current one is finished playing
    if (event.data === 0) {
        $.fancybox.next();
    }
}

// The API will call this function when the page has finished downloading the JavaScript for the player API
function onYouTubePlayerAPIReady() {
    
    // Initialise the fancyBox after the DOM is loaded
    $(document).ready(function() {
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