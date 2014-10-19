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

  place_pins = function(notes) {
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

      addInfoWindow(current_marker, notes[i]);
    }
  };


  function addInfoWindow(marker, note) {
    var info = "<h5>Note</h5>" + note.comment;

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
        place_pins(data)
        console.log("success")
        console.log(data);
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
            return false;
          });
        });
        var setCoordinates = function(note) {
          var noteMarker = new google.maps.Marker({
            position: pos,
            icon: icon,
            animation: google.maps.Animation.DROP,
            map: map
          });

          addInfoWindow(noteMarker, note);

          var userLongitude = noteMarker.position.k;
          var userLatitude = noteMarker.position.B;

          $.ajax({
            url: "/notes/"+ note.id +"/edit" ,
            type: 'get',
            data: {longitude: userLongitude, latitude: userLatitude, note_id: note.id}
          })
          .success(function() {
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
