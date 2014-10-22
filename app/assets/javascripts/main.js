$( document ).ready(function() {
  console.log( "ready!" );

  if(/iP(hone|ad)/.test(window.navigator.userAgent)) {
      var elements = document.querySelectorAll('button');
      var emptyFunction = function() {};
      for(var i = 0; i < elements.length; i++) {
        elements[i].addEventListener('touchstart', emptyFunction, false);
      }
    }

  $(document).foundation();

  var noteWidget = new Note();

  google.maps.event.addDomListener(window, 'load', initialize(noteWidget));

  // google.maps.event.addDomListener(window, 'load', initialize());

  setSlickCarousel('.center');

}); // end document ready







// //CONTROLLER
// var Controller = function(model, view) {
//   this.model = model;
//   this.view = view;
// };

// Controller.prototype = {

// };
// //MODEL
// var Model = function() {


// };

// Model.prototype = {

// };

// //VIEW
// var View = function() {

// };

// View.prototype = {


// }; // VIEW PROTOTYPE END

// //INSTANTIATE
// var model = new Model();
// var view = new View();
// var controller = new Controller(model, view);
// // controller.bindEvents()


