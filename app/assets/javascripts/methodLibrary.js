// CR what does this do? You have two document ready's in your js

$(function() {
  $(".signin").on("submit", function(){
    $("#myModalIn").foundation('reveal', 'close')
    console.log('done')
  });

  $(".signup").on("submit", function(){
    $("#myModalUp").foundation('reveal', 'close')
    console.log('done')
  });

  $('#seeAllNotes').on('click', function(){
    loadPins();
  })
});
