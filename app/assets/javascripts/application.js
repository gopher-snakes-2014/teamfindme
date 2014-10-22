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
//= require slick/slick
//= require_tree .



function initialize(noteWidget) {
  var map = new google.maps.Map(document.getElementById('map-canvas'),
    mapOptions);

// MAP STUFFFFFFFFF ============================

  function placeInMarkers(inNotes, imageUrls, noteUsernames) {

    for (var i = 0; i < inNotes.length; i++) {
      current_marker = setExistingMarker(inNotes[i], inIcon) //global icon
      addInfoWindow(current_marker, inNotes[i], imageUrls[i], noteUsernames[i]);
    }
  };

  function setExistingMarker(note, icon) {
    return new google.maps.Marker({
      position: new google.maps.LatLng(note.longitude, note.latitude),
      icon: icon, //extract into a model att?
      animation: google.maps.Animation.DROP, //extract into a model attr
      map: map //global map object
    });
  };


  function placeOutMarkers(outNotes) {
    for (var j = 0; j < outNotes.length; j++) {
      setExistingMarker(outNotes[j], outIcon) //global icon
    }
  };


  function addInfoWindow(marker, note, imageUrl, username) {
    var info = infoWindowTemplate(note.comment, imageUrl, username);

    var infoWindow = newInfoWindow(info);

    google.maps.event.addListener(marker, 'click', function () {
      infoWindow.open(map, marker); //global map object
    });
  }

function newInfoWindow(info) {
  return new google.maps.InfoWindow({
      content: info
    })
};

function infoWindowTemplate(comment, imageUrl, username) {
  return "<h6>"+ username +"</h6>" + comment + "<br><img src=" + imageUrl + ">";
};

function setUserMarker(pos) {
  return new google.maps.Marker({
        position: pos,
        animation: google.maps.Animation.DROP,
        map: map //global map object
      });
};


function setCircleRadius(pos) {
  return new google.maps.Circle({
        center: pos,
        radius: 9,
        fillColor: "#00EEEE",
        fillOpacity: 0.5,
        strokeOpacity: 0.0,
        strokeWeight: 0,
        map: map //global map object
      });
};

// GEO NAV PARTY ==============

if(navigator.geolocation) {

  navigator.geolocation.getCurrentPosition(function(position) {

    var pos = new google.maps.LatLng(position.coords.latitude,
     position.coords.longitude);

    var currentLocation = setUserMarker(pos)
    var circle = setCircleRadius(pos)

    var longitudeMax = currentLocation.position.k + 0.000088;
    var longitudeMin = currentLocation.position.k - 0.000088;
    var latitudeMax = currentLocation.position.B + 0.000088;
    var latitudeMin = currentLocation.position.B - 0.000088;


    $.ajax({
      url: '/notes/1',
      type: 'get',
      data: {longitudeMax: longitudeMax, longitudeMin: longitudeMin, latitudeMax: latitudeMax, latitudeMin: latitudeMin },
    })
    .success(function(data) {
      placeInMarkers(data[0], data[1], data[2]);
      placeOutMarkers(data[3]);
      noteWidget.addReadableNotes(data[0], data[1], data[2], data[5]);
    })
    .fail(function() {
      console.log("error");
    })
    .always(function() {
      console.log("complete");
    });


      $("#leaveANote").on('click', function() { //controller binding event

        $("#myModalNote").foundation('reveal', 'open'); //view thingy

        $('#noteSubmit').click(function() { // controller binding event

          $("#noteForm").ajaxForm({
            success: setNewMarker
          }).submit(function(){
          });

        });

        function updateNoteLocation(note, marker) {
          var userLongitude = marker.position.k;
          var userLatitude = marker.position.B;

          $.ajax({
            url: "/notes/" + note[0].id,
            type: 'PUT',
            data: {longitude: userLongitude, latitude: userLatitude}
          })
          .success(function() {
            $("#noteForm")[0].reset();
            $("#myModalNote").foundation('reveal', 'close');
            addInfoWindow(marker, note[0], note[1], note[2]);
            console.log("success");
          })
          .fail(function() {
            console.log("error");
          }); //end ajax request

        } //end updateNoteLocation function


        var setNewMarker = function(note) {
          var noteMarker = new google.maps.Marker({
            position: pos,
            icon: inIcon,
            animation: google.maps.Animation.DROP,
            map: map
          });

          updateNoteLocation(note, noteMarker);

        }; //end createNewMarker

      }); // leave note on click function

map.setCenter(pos);
}, function() { // end get current position
  handleNoGeolocation(true);
});

} else { //end of if nav geo
  handleNoGeolocation(false);
} //end else

} // end initalize function

