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
