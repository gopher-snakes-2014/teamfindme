  // CR move to Notes model

  filterAll = function(notes, url, username) {
    for (var i = 0; i < notes.length; i++) {
      $('#myModalAll').append("<h4>" + notes[i].comment + "</h4>");
      $('#myModalAll').append("<img src=" + url[i] + ">");
      $('#myModalALl').append("<h3>" + username[i] + "</h3>");
    }
  };
