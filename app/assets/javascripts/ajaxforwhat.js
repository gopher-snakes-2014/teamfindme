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
