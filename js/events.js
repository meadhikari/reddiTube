$('body').on('click','a',function(){
    if ($(this).parent().is( "li" ))
    {
      $('.navbar-nav li.active').removeClass('active');
      $(this).parent().addClass('active');
      dotAnimation()
      REDDITUBE.reddit_url = $(this).attr('id')
      REDDITUBE.after_code = '' 
      loadPage()  
    }
    else if ($(this).attr('id') == 'next') {
        loadPage()

    }
    
  })

  $(window).scroll(function() {
   if($(window).scrollTop() + $(window).height() == $(document).height()) {
        loadPage()
  }
  });