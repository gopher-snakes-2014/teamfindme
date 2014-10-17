$(function() {

  $("#signIn").on("click", function(e){
    e.preventDefault();
    $.ajax({
      url: new_session_path,
      type: 'get'
    }).done(function(){
      console.log("successful")
    }).fail(function(){
      console.log("failed")
    })
  });

  $("#signUp").on("click", function(e){
    e.preventDefault();
    $.ajax({
      url: new_user_path,
      type: 'get'
    }).done(function(){
      console.log("successful")
    }).fail(function(){
      console.log("failed")
    })
  });

  $("#signOut").on("click", function(e){
    e.preventDefault();
    $.ajax({
      url: session_path
      type: 'delete'
    }).done(function(){
      console.log("successful")
    }).fail(function(){
      console.log("failed")
    })
  });








});