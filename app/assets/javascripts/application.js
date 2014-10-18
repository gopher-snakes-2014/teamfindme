// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require foundation
//= require turbolinks
//= require_tree .


$(function(){ $(document).foundation(); });
var map;

function initialize() {
  var mapOptions = {
    zoom: 24
  };

  loadPins(); //ajax in ajaxforwhat.js

  place_pins = function(notes) {

    var icon = {
      url: "http://i.imgur.com/ZIpm27k.png"
    };

    for (var i = 0; i < notes.length; i++) {
      marker = new google.maps.Marker({
            position: new google.maps.LatLng(notes[i].longitude, notes[i].userLatitude),
            icon: icon,
            animation: google.maps.Animation.DROP,
            map: map
          });
    }
  };

  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = new google.maps.LatLng(position.coords.latitude,
                                       position.coords.longitude);

      var currentLocation = new google.maps.Marker({
        position: pos,
        animation: google.maps.Animation.DROP,
        map: map
      });

      var icon = {
        url: "http://i.imgur.com/ZIpm27k.png"
      };

      var contentString = "my posts";

        $("#leaveANote").on('click', function() {
          var noteMarker = new google.maps.Marker({
            position: pos,
            icon: icon,
            animation: google.maps.Animation.DROP,
            map: map
          });

          google.maps.event.addListener(noteMarker, 'click', function(e) {
            e.preventDefault();
            // go to notes controller
            // find note by location
            // return here with note
            $("#myModalNote").foundation('reveal', 'open');
          });

        var userLongitude = noteMarker.position.k;
        var userLatitude = noteMarker.position.B;
        $.ajax({
          url: '/notes',
          type: 'POST',
          data: {longitude: userLongitude, latitude: userLatitude}
        }).done(function() {
          console.log("success");
        });
      });
      map.setCenter(pos);
    }, function() {
      handleNoGeolocation(true);
    });
  } else {
    handleNoGeolocation(false);
  }
}



function handleNoGeolocation(errorFlag) {
  if (errorFlag) {
    var content = 'Error: The Geolocation service failed.';
  } else {
    var content = 'Error: Your browser doesn\'t support geolocation.';
  }
}

google.maps.event.addDomListener(window, 'load', initialize);
