import { appState } from "../AppState.js";
import { Note } from "../Models/Note.js";
import { notesService } from "../Services/NotesService.js";
import { getFormData } from "../Utils/FormHandler.js";
import { Pop } from "../Utils/Pop.js";
import { setHTML, setText } from "../Utils/Writer.js";


function _drawActiveNote(){
setHTML('active-note', Note.ActiveNote())
}





function _drawAllNotes(){
let template = ''
appState.notes.forEach(n => template += n.NoteDetails)
setHTML('note-details', template)
}




export class NotesController {
  constructor(){
    console.log(appState.notes);
    _drawAllNotes()
  }

  setActiveNote(noteId) {
    try {
      notesService.setActiveNote(noteId)
    } catch (error) {
      Pop.error(error)
    }
  }


  newNoteForm(){
    setHTML('note-form', Note.NoteForm())
  }

  handleFormSubmit() {
    try {
      event.preventDefault()
      const form = event.target
      const formData = getFormData(form)

      notesService.createNote(formData)

      console.log(formData)
      // @ts-ignore
      form.reset()
    } catch (error) {
      Pop.error(error)
    }
  }

  async deleteNote(noteId) {
    try {
      const yes = await Pop.confirm('Are you sure you wish to delete this note?')
      if (!yes) { return } 

      notesService.deleteNote(noteId)
    } catch (error) {
      Pop.error(error)
    }
  }
}