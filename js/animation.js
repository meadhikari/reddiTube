function dotAnimation()
{
  console.log("Came here")
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
