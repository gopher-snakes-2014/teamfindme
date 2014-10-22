var Note = function() {
  this.myModalAll = '#myModalAll';
};

Note.prototype = {
  addReadableNotes: function(notes, urls, usernames) {
    for (var i = 0; i < notes.length; i++) {
      this.appendModalNote(notes[i], urls[i], usernames[i]);
    }
  },

  appendModalNote: function(notes, url, username) {
    $(this.myModalAll).append(
      this.makeNoteTemplate( notes, url, username)
      );
  },

  makeNoteTemplate: function(note, url, username) {
    return "<h4>" + note.comment + "</h4> <img src=" + url + "><h3>" + username + "</h3>";
  }



}; // prototype end




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
