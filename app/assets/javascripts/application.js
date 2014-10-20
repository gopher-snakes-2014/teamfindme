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

var mapStyle =
[{"featureType":"water","stylers":[{"color":"#19a0d8"}]},{"featureType":"administrative","elementType":"labels.text.stroke","stylers":[{"color":"#ffffff"},{"weight":6}]},{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#e85113"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#efe9e4"},{"lightness":-40}]},{"featureType":"road.arterial","elementType":"geometry.stroke","stylers":[{"color":"#efe9e4"},{"lightness":-20}]},{"featureType":"road","elementType":"labels.text.stroke","stylers":[{"lightness":100}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"lightness":-100}]},{"featureType":"road.highway","elementType":"labels.icon"},{"featureType":"landscape","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"landscape","stylers":[{"lightness":20},{"color":"#efe9e4"}]},{"featureType":"landscape.man_made","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels.text.stroke","stylers":[{"lightness":100}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"lightness":-100}]},{"featureType":"poi","elementType":"labels.text.fill","stylers":[{"hue":"#11ff00"}]},{"featureType":"poi","elementType":"labels.text.stroke","stylers":[{"lightness":100}]},{"featureType":"poi","elementType":"labels.icon","stylers":[{"hue":"#4cff00"},{"saturation":58}]},{"featureType":"poi","elementType":"geometry","stylers":[{"visibility":"on"},{"color":"#f0e4d3"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#efe9e4"},{"lightness":-25}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#efe9e4"},{"lightness":-10}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"simplified"}]}];

function initialize() {
  var mapOptions = {
    zoom: 18,
    styles: mapStyle
  };

  filterAll = function(notes, url, username) {
    for (var i = 0; i < notes.length; i++) {
      $('#myModalAll').append("<h4>" + notes[i].comment + "</h4>");
      $('#myModalAll').append("<img src=" + url[i] + ">");
      $('#myModalALl').append("<h3>" + username[i] + "</h3>");
    }
  };

  place_pins = function(notes, url, username) {
    var icon = {
      url: "http://i.imgur.com/ZIpm27k.png"
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
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = new google.maps.LatLng(position.coords.latitude,
       position.coords.longitude);

      var currentLocation = new google.maps.Marker({
        position: pos,
        animation: google.maps.Animation.DROP,
        map: map
      });

      var longitudeMax = currentLocation.position.k + 0.000085;
      var longitudeMin = currentLocation.position.k - 0.000085;
      var latitudeMax = currentLocation.position.B + 0.000085;
      var latitudeMin = currentLocation.position.B - 0.000085;

      $.ajax({
        url: '/notes/radius_search',
        type: 'get',
        data: {longitudeMax: longitudeMax, longitudeMin: longitudeMin, latitudeMax: latitudeMax, latitudeMin: latitudeMin },
      })
      .done(function(data) {
        place_pins(data[0], data[1], data[2]);
        filterAll(data[0], data[1], data[2]);
      })
      .fail(function() {
        console.log("error");
      })
      .always(function() {
        console.log("complete");
      });

      var circle = new google.maps.Circle({
        center: pos,
        radius: 10,
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
