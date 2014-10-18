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








// });