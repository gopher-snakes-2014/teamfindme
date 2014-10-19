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
        position: new google.maps.LatLng(notes[i].longitude, notes[i].latitude),
        icon: icon,
        animation: google.maps.Animation.DROP,
        map: map
      });

      addInfoWindow(marker, notes[i]); // where should this go?

      // google.maps.event.addListener(marker, 'click', function() {
      //   $("#myModalNote").foundation('reveal', 'open');
      // });
    }
  };

//=======================

          function addInfoWindow(marker, note) {

            var info = "<h5>Note</h5>" + note.comment + "<h5>Image</h5>";


            var infoWindow = new google.maps.InfoWindow({
                content: info
            });

            google.maps.event.addListener(marker, 'click', function () {
                infoWindow.open(map, marker);
            });
        }
//========================

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
        $("#myModalNote").foundation('reveal', 'open');
//===========================================
    $('#noteSubmit').click(function() {
      // alert("hi");
      $("#noteForm").ajaxForm({
        success: setCoordinates
      }).submit(function(){
        return false
      });
      // e.preventDefault();
    });
//===========================================
        // $('#noteForm').on('submit', function(e) {
        //   var that = this;
        //   e.preventDefault();
        //   $.ajax({
        //     url: '/notes',
        //     type: 'post',
        //     data: $(that).serialize()
        //   }).done(function(data){
        //     setCoordinates(data.id);
        //   });
        // });
        var setCoordinates = function(noteId) {
          var noteMarker = new google.maps.Marker({
            position: pos,
            icon: icon,
            animation: google.maps.Animation.DROP,
            map: map
          });

          addInfoWindow(noteMarker, noteId);

          var userLongitude = noteMarker.position.k;
          var userLatitude = noteMarker.position.B;
// ========================================
          $.ajax({
            url: "/notes/"+ noteId.id +"/edit" ,
            type: 'get',
// ========================================
            data: {longitude: userLongitude, latitude: userLatitude, note_id: noteId.id}
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

      // $("#noteSubmit").on('click',function(e){
      //   e.preventDefault();
      //   console.log("hi")
      //   // console.log($("#noteForm").forms.2.form.2.value)
      // });





        // google.maps.event.addListener(noteMarker, 'click', function(e) {
        //   e.preventDefault();
        //   console.log("you clicked a marker");
        //     // go to notes controller
        //     // find note by location
        //     // return here with note
        //     // $("#myModalNote").foundation('reveal', 'open');
        //   });

    }); // ends "#leaveANote"

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
