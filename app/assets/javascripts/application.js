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

// CR the manifest file is for manifest !  NO JS HERE!!!!

// CR - Build objects:  Maps and Notes  The Maps model is a wrapper around Google api

// CR move jquery.form to vendor folder



$(function(){ $(document).foundation(); });

var map;

var mapStyle =
[{"featureType":"water","stylers":[{"color":"#19a0d8"}]},{"featureType":"administrative","elementType":"labels.text.stroke","stylers":[{"color":"#ffffff"},{"weight":6}]},{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#e85113"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#efe9e4"},{"lightness":-40}]},{"featureType":"road.arterial","elementType":"geometry.stroke","stylers":[{"color":"#efe9e4"},{"lightness":-20}]},{"featureType":"road","elementType":"labels.text.stroke","stylers":[{"lightness":100}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"lightness":-100}]},{"featureType":"road.highway","elementType":"labels.icon"},{"featureType":"landscape","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"landscape","stylers":[{"lightness":20},{"color":"#efe9e4"}]},{"featureType":"landscape.man_made","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels.text.stroke","stylers":[{"lightness":100}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"lightness":-100}]},{"featureType":"poi","elementType":"labels.text.fill","stylers":[{"hue":"#11ff00"}]},{"featureType":"poi","elementType":"labels.text.stroke","stylers":[{"lightness":100}]},{"featureType":"poi","elementType":"labels.icon","stylers":[{"hue":"#4cff00"},{"saturation":58}]},{"featureType":"poi","elementType":"geometry","stylers":[{"visibility":"on"},{"color":"#f0e4d3"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#efe9e4"},{"lightness":-25}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#efe9e4"},{"lightness":-10}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"simplified"}]}];

function initialize() {
  var mapOptions = {
    zoom: 20,
    styles: mapStyle,
    scrollwheel: false
  };


  place_pins = function(notes, url, username, notes_out) {
    var icon = {
      url: "http://i.imgur.com/ZIpm27k.png"
    };

    var icon_out = {
      url: "http://i.imgur.com/0opmhTG.png"
    };

    for (var i = 0; i < notes.length; i++) {
      current_marker = new google.maps.Marker({
        position: new google.maps.LatLng(notes[i].longitude, notes[i].latitude),
        icon: icon,
        animation: google.maps.Animation.DROP,
        map: map
      });
      addInfoWindow(current_marker, notes[i], url[i], username[i]);
    }

    for (var j = 0; j < notes_out.length; j++) {
      outside_marker = new google.maps.Marker({
        position: new google.maps.LatLng(notes_out[j].longitude, notes_out[j].latitude),
        icon: icon_out,
        animation: google.maps.Animation.DROP,
        map: map
      });
    }
  };


  function addInfoWindow(marker, note, url, username) {
    var info = "<h6>"+ username +"</h6>" + note.comment + "<br><img src=" + url + ">";

    var infoWindow = new google.maps.InfoWindow({
      content: info
    });

    google.maps.event.addListener(marker, 'click', function () {
      infoWindow.open(map, marker);
    });
  }

  map = new google.maps.Map(document.getElementById('map-canvas'),
    mapOptions);
  if(navigator.geolocation) {

// CR I would expect to see this broken into two methods like
    // CR  Map.setpin()
    // CR Note.create()
      var circle = new google.maps.Circle({
        center: pos,
        radius: 9,
        fillColor: "#00EEEE",
        fillOpacity: 0.5,
        strokeOpacity: 0.0,
        strokeWeight: 0,
        map: map
      });

      var icon = {
        url: "http://i.imgur.com/ZIpm27k.png"
      };

      var contentString = "my posts";

      $("#leaveANote").on('click', function() {
        $("#myModalNote").foundation('reveal', 'open');

// CR this should be .on('submit') for the form
        $('#noteSubmit').click(function() {
          $("#noteForm").ajaxForm({
            success: setCoordinates
          }).submit(function(){
            // return false;
          });
        });

        var setCoordinates = function(note) {
          var noteMarker = new google.maps.Marker({
            position: pos,
            icon: icon,
            animation: google.maps.Animation.DROP,
            map: map
          });

          addInfoWindow(noteMarker, note[0], note[1], note[2]);

          var userLongitude = noteMarker.position.k;
          var userLatitude = noteMarker.position.B;

          $.ajax({
            url: "/notes/"+ note[0].id +"/edit" ,
            type: 'GET',
            data: {longitude: userLongitude, latitude: userLatitude}
          })
          .success(function() {
            $("#noteForm")[0].reset();
            $("#myModalNote").foundation('reveal', 'close');
            console.log("success");
          })
          .fail(function() {
            console.log("error");
          })
          .always(function() {
            console.log("complete");
          });

        };

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
