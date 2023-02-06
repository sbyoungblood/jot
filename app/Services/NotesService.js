import { appState } from "../AppState.js"
import { Note } from "../Models/Note.js"
import { saveState } from "../Utils/Store.js"


class NotesService {

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

  setActiveNote(noteId) {
    const note = appState.notes.find(n => n.id == noteId)
    if (!note) {
      throw new Error('there is no note with that id')
    }
    appState.note = note
    console.log(appState.note.id);
  }

}

export const notesService = new NotesService()