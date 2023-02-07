import { appState } from "../AppState.js";
import { Note } from "../Models/Note.js";
import { notesService } from "../Services/NotesService.js";
import { getFormData } from "../Utils/FormHandler.js";
import { Pop } from "../Utils/Pop.js";
import { setHTML, setText } from "../Utils/Writer.js";


function _drawActiveNote(){
  // FIXME pull our active note out of the appstate, and use his template to draw to the HTML
setHTML('active-note', appState.note.ActiveNote)
}





function _drawAllNotes(){
let template = ''
appState.notes.forEach(n => template += n.NoteDetails)
setHTML('note-details', template)
let countTemplate = `All ${appState.notes.length} Notes`

setText('offcanvasRightLabel', countTemplate)
}




export class NotesController {
  constructor(){
    console.log(appState.notes);
    _drawAllNotes()
    appState.on('note', _drawActiveNote)
    appState.on('notes',_drawAllNotes)

    // TODO set up event listeners for note and notes in your appstate, or manually call when needed in their own methods (appstate.on)
  }

  setActiveNote(noteId) {
    try {
      notesService.setActiveNote(noteId)
      _drawActiveNote()
    } catch (error) {
      Pop.error(error)
    }
  }


  newNoteForm(){
    setHTML('note-form', Note.NoteForm())
  }

  updateNote() {
    try {
      let textArea = document.getElementById('note-text')
      let updatedBody = textArea.value
      notesService.updateNote(updatedBody)
    } catch (error) {
      console.error(error)
      Pop.error(error.message)
    }
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

  // FIXME we need an update method!!! please reference redacted and look at my updateCaseFile

}