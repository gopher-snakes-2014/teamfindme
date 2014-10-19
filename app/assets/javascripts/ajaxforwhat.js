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
  var loadPins = function () {
  $.ajax({
    url: "/notes/1",
    type: "get"
    // dataType: "json",
    }).done(function(data){
      place_pins(data);
      // place_locations(data);
    }).fail(function(error){
    console.log(error);
    }).always(function(){
      console.log("ajax happened.");
    });
  };

  // var setCoordinates = function(id) {
  //   $.ajax({
  //     url: '/notes/update',
  //     type: 'get',
  //     data: {longitude: userLongitude, latitude: userLatitude, id: id},
  //   })
  //   .done(function() {
  //     console.log("success");
  //   })
  //   .fail(function() {
  //     console.log("error");
  //   })
  //   .always(function() {
  //     console.log("complete");
  //   });

  // }








// });
