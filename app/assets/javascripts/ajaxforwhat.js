// $(function() {
// // -----------Sign In-------------------
//   $("#signIn").on("click", function(e){
//     e.preventDefault();
//     $.ajax({
//       url: this.action,
//       type: this.method,
//       data: $(this).serialize()
//     }).done(function(data){
//       console.log("successful")
//     }).fail(function(){
//       console.log("failed")
//     })
//   });

//   $(".signin").on("submit", function(e){
//     e.preventDefault();
//     $.ajax({
//       url: this.action,
//       type: this.method,
//       data: $(this).serialize()
//     }).done(function(data){
//       $("#myModalIn").foundation('reveal', 'close')
//     }).fail(function(){
//       console.log("did not create new session for user")
//     })
//   });
// // -----------Sign Up-------------------
//   $("#signUp").on("click", function(e){
//     e.preventDefault();
//     $.ajax({
//       url: this.action,
//       type: this.method,
//       data: $(this).serialize()
//     }).done(function(data){
//       console.log("successful")
//     }).fail(function(){
//       console.log("failed")
//     })
//   });

//   $(".signup").on("submit", function(e){
//     e.preventDefault();
//     $.ajax({
//       url: this.action,
//       type: this.method,
//       data: $(this).serialize()
//     }).done(function(data){
//       $("#myModalUp").foundation('reveal', 'close');
//       hideSignin();
//       hideSignup();
//       showSignout();
//       showViewProfile();
//     }).fail(function(){
//       console.log("didn't sign up")
//     })
//   });
// // -----------Sign Out-------------------
//   $("#signOut").on("click", function(e){
//     $.ajax({
//       url: '/signout',
//       type: 'get'
//     }).done(function(data){
//       console.log("successful")
//     }).fail(function(){
//       console.log("failed")
//     })
//   });

var append_info = function(notes){
    for (var i = 0; i < notes.length; i++)
      $("#myModalAll").append("<h4>"+notes.comment+"</h4><br>" )
  };

var loadPins = function () {
  $.ajax({
    url: "/notes/1",
    type: "get"
    // dataType: "json",
  }).done(function(data){
    place_pins(data);
    append_info(data);
      // place_locations(data);
    }).fail(function(error){
      console.log(error);
    }).always(function(){
      console.log("ajax happened.");
    });
  };






// });
