$(function() {
// -----------Sign In-------------------
  $("#signIn").on("click", function(e){
    e.preventDefault();
    $.ajax({
      url: this.action,
      type: this.method,
      data: $(this).serialize()
    }).done(function(data){
      console.log("successful")
    }).fail(function(){
      console.log("failed")
    })
  });

  $("#signinBtn").on("click", function(e){
    e.preventDefault();
    $.ajax({
      url: this.action,
      type: this.method,
      data: $(this).serialize()
    }).done(function(data){
      console.log("created new session for user")
    }).fail(function(){
      console.log("did not create new session for user")
    })
  });
// -----------Sign Up-------------------
  $("#signUp").on("click", function(e){
    e.preventDefault();
    $.ajax({
      url: this.action,
      type: this.method,
      data: $(this).serialize()
    }).done(function(data){
      console.log("successful")
    }).fail(function(){
      console.log("failed")
    })
  });

  $("#signupBtn").on("click", function(e){
    e.preventDefault();
    $.ajax({
      url: this.action,
      type: this.method,
      data: $(this).serialize()
    }).done(function(data){
      console.log("signed up")
    }).fail(function(){
      console.log("didn't sign up")
    })
  });
// -----------Sign Out-------------------
  $("#signOut").on("click", function(e){
    e.preventDefault();
    $.ajax({
      url: this.action,
      type: this.method,
      data: $(this).serialize()
    }).done(function(data){
      console.log("successful")
    }).fail(function(){
      console.log("failed")
    })
  });








});