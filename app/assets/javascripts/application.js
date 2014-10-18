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

// google maps - no longer needed with places!
// function initialize() {
//   var mapOptions = {
//       center: { lat: 37.7833, lng: -122.4167},
//       zoom: 12
//   };

//   var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
//   }

//   google.maps.event.addDomListener(window, 'load', initialize);

// google places - radar search request
// var map;
// var service;

// function initialize() {
//   map = new google.maps.Map(document.getElementById('map-canvas'), {
//     center: new google.maps.LatLng(37.7833, -122.4167),
//     zoom: 15
//   });

//   infoWindow = new google.maps.InfoWindow();
//   service = new google.maps.places.PlacesService(map);

//   google.maps.event.addListenerOnce(map, 'bounds_changed', performSearch);
// }

// function performSearch() {
//   var request = {
//     bounds: map.getBounds(),
//     keyword: 'dev bootcamp'
//   };
//   service.radarSearch(request, callback);
// }

// function callback(results, status) {
//   if (status != google.maps.places.PlacesServiceStatus.OK) {
//     alert(status);
//     return;
//   }
//   for (var i = 0, result; result = results[i]; i++) {
//     var marker = new google.maps.Marker({
//       map: map,
//       position: result.geometry.location
//     });
//   }
// }

// google.maps.event.addDomListener(window, 'load', initialize);

//geolocation
var map;

function initialize() {
  var mapOptions = {
    zoom: 24
  };
  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

  // Try HTML5 geolocation
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = new google.maps.LatLng(position.coords.latitude,
                                       position.coords.longitude);

      var contentString = "my posts";

      var marker = new google.maps.Marker({
        position: pos,
        map: map
      });

      google.maps.event.addListener(marker, 'click', function() {
        console.log("You clicked this thing");
        console.log(this);
      });

      map.setCenter(pos);
    }, function() {
      handleNoGeolocation(true);
    });
  } else {
    // Browser doesn't support Geolocation
    handleNoGeolocation(false);
  }
}

function handleNoGeolocation(errorFlag) {
  if (errorFlag) {
    var content = 'Error: The Geolocation service failed.';
  } else {
    var content = 'Error: Your browser doesn\'t support geolocation.';
  }

  var options = {
    map: map,
    position: new google.maps.LatLng(60, 105),
    content: content
  };

  var infowindow = new google.maps.InfoWindow(options);
  map.setCenter(options.position);
}

google.maps.event.addDomListener(window, 'load', initialize);
