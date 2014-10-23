var Note = function() {
  this.carousel = '.center';
};

Note.prototype = {
  addReadableNotes: function(notes, urls, usernames, userId) {
    for (var i = 0; i < notes.length; i++) {
      this.appendCarouselNote(notes[i], urls[i], usernames[i], userId);
    }
  },

  appendCarouselNote: function(notes, url, username, userId) {
    var votes = notes.voters.length;
    if (userId === undefined || null) {
      $(this.carousel).append(
        this.makeNoteTemplateNoLog(notes, url, username, notes.voters)
        );
    } else if (notes.voters.indexOf(""+userId+"") >= 0){
      $(this.carousel).append(
        this.makeNoteTemplateVoted(notes, url, username, userId, notes.voters)
        );
    } else {
      $(this.carousel).append(
        this.makeNoteTemplate( notes, url, username, userId, notes.voters)
        );
    }
  },


  makeNoteTemplate: function(note, url, username, userId, voters) {
    return "<div class='note_styling'><button class='tiny'>View</button><div><form class='like'><input type='hidden' value="+note.id+"><input type='hidden' value="+userId+"><a href='#'><img class='likesrc' src='/assets/like.png' style='float:right'></form><h4 id='anne'>"+ username +"</h4><img src="+ url +"><p>"+ note.comment +"</p><h5>" + voters + "</h5></div></div>";
  },
  makeNoteTemplateVoted: function(note, url, username, userId, voters){
    return "<div class=note_styling><div><button class='tiny'>View</button><form class=liked><input type=hidden value="+note.id+"><input type=hidden value="+userId+"><a href=#><img class=likedsrc src=/assets/liked.png style=float:right></form><h4>"+ username +"</h4 id='anne'><img src="+ url +"><p>"+ note.comment +"</p><h5>" + voters + "</h5></div></div>";
  },
  makeNoteTemplateNoLog: function(note, url, username, voters){
    return "<div class=note_styling><button class='tiny'>View</button><h4>"+ username +"</h4 id='anne'><img src="+ url +"><p>"+ note.comment +"</p><h5>" + voters + "</h5></div></div>";
  }



}; // prototype end

var changeLike = function(source) {

}



// // CONTROLLER
// var NoteController = function(model, view) {
//   this.model = model;
//   this.view = view;
// };

// NoteController.prototype = {

// };
// // MODEL
// var NoteModel = function() {

// };

// NoteModel.prototype = {

// };

// // VIEW
// var NoteView = function() {
//   this.carousel = '#carousel';

// };

// NoteView.prototype = {

// };

// // INSTANTIATE
// var noteModel = new NoteModel();
// var noteView = new NoteView();
// var noteController = new NoteController(noteModel, noteView);
