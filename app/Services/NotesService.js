import { appState } from "../AppState.js"
import { Note } from "../Models/Note.js"
import { saveState } from "../Utils/Store.js"


class NotesService {

  // FIXME we need an update method!!! please reference redacted and look at my updateCaseFile
  // FIXME make sure you change the updatedAt property when this happens

  deleteNote(noteId){
    let noteIndex = appState.notes.findIndex(n => n.id == noteId)

    if (noteIndex == -1) {
      throw new Error('Note ID not recognized')
    }

    appState.notes.splice(noteIndex, 1)
    saveState('notes', appState.notes)
    appState.emit('notes') 
    

  }

  createNote(formData) {
    let note = new Note(formData)
    appState.notes.push(note)
    appState.emit('notes')
    saveState('notes', appState.notes)

  }

  updateNote(updatedBody, updatedDate){
    let activeBody = appState.note
    activeBody.body = updatedBody 
    let activeDate = appState.note
    activeDate.updateDate = updatedDate
    saveState('notes', appState.notes)
    saveState('note', appState.note)
    console.log(appState.note);
    // appState.emit('note')
  }

  setActiveNote(noteId) {
    const note = appState.notes.find(n => n.id == noteId)
    if (!note) {
      throw new Error('there is no note with that id')
    }
    // NOTE this should also trigger a listener
    appState.note = note
    console.log(appState.note.id);
  }

}

export const notesService = new NotesService()