$(function() {
// -----------Sign In-------------------
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

  $("$signinBtn").on("click", function(e){
    e.preventDefault();
    $.ajax({
      url: sessions_path,
      type: 'post'
    }).done(function(){
      console.log("created new session for user")
    }).fail(function(){
      console.log("did not create new session for user")
    })
  });
// -----------Sign Up-------------------
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

  $("#signupBtn").on("click", function(e){
    e.preventDefault();
    $.ajax({
      url: users_path,
      type: 'post'
    }).done(function(){
      console.log("signed up")
    }).fail(function(){
      console.log("didn't sign up")
    })
  });
// -----------Sign Out-------------------
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