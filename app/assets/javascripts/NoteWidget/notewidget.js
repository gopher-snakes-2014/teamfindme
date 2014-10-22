var Note = function() {
  this.myModalAll = '#myModalAll';
};

Note.prototype = {
  addReadableNotes: function(notes, urls, usernames, userId) {
    for (var i = 0; i < notes.length; i++) {
      this.appendModalNote(notes[i], urls[i], usernames[i], userId);
    }
  },

  appendModalNote: function(notes, url, username, userId) {

    var voters = notes.voters;

    if (userId === null) {
      $(this.myModalAll).append(
        this.makeNoteTemplateNoLog(notes, url, username)
        );
    } else if (voters.indexOf(""+userId+"") >= 0){
      $(this.myModalAll).append(
        this.makeNoteTemplateVoted(notes, url, username, userId)
        );
    } else {
      $(this.myModalAll).append(
        this.makeNoteTemplate( notes, url, username, userId)
        );
    }
  },

  makeNoteTemplate: function(note, url, username, userId) {
    return "<form class=like><input type=hidden value="+note.id+"><input type=hidden value="+userId+"><a href=#><img class=likesrc src=/assets/like.png style=float:right></form><h4>" + note.comment + "</h4 class='noteComment'> <img src=" + url + "><h3>" + username + "</h3>";
  },
  makeNoteTemplateVoted: function(note, url, username, userId){
    return "<form class=liked><input type=hidden value="+note.id+"><input type=hidden value="+userId+"><a href=#><img class=likedsrc src=/assets/liked.png style=float:right></form><h4>" + note.comment + "</h4> <img src=" + url + "><h3>" + username + "</h3>";
  },
  makeNoteTemplateNoLog: function(note, url, username){
    return "<h4 class='noteComment'>" + note.comment + "</h4> <img src=" + url + "><h3>" + username + "</h3>";
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
//   this.myModalAll = '#myModalAll';

// };

// NoteView.prototype = {

// };

// // INSTANTIATE
// var noteModel = new NoteModel();
// var noteView = new NoteView();
// var noteController = new NoteController(noteModel, noteView);
