import { appState } from "../AppState.js"
import { generateId } from "../Utils/generateId.js"


export class Note {

  constructor(data){
    this.id = generateId()
    this.title = data.title
    this.color = data.color
    this.body = data.body || ''
    // NOTE updatedAt
    this.date = data.date || new Date().toLocaleString('en-us')
    this.updateDate = data.updateDate || new Date().toLocaleString('en-us')
    // FIXME we need an updated at as well, this needs to change whenever the note is updated
  }

  static NoteForm(){
    return /*html*/`
    <form onsubmit="app.notesController.handleFormSubmit()">
        <div class="form-floating mb-3">
          <h3>Title</h3>
          <input type="text" class="form-control" name="title" required minlength="3" maxlength="15">
          <label for="title"></label>
        </div>
        <div class="form-floating mb-3">
          <h3>Color</h3>
          <input type="color" class="form-control" name="color">
          <label for="color"></label>
          
        </div>
        <div class="form-floating mb-3">
          <h3>Jot it down:</h3>
          <div>
          <textarea class="form-control" name="body" id="body" rows="8"></textarea>
            <label for="body" class="form-label"></label>
          </div>
        </div>
        <div class="d-flex my-4 gap-5 align-items-center">
          <button class="btn" type="reset">Cancel</button>
          <button class="btn btn-primary" type="submit" data-bs-dismiss="offcanvas">Submit</button>
        </div>
      </form>
    `
  }

  get ActiveNote(){
    return /*html*/`
    <div class="col-md-4 pt-3">
      <span class="display-6 fw-bold">${this.title}<span style="color: ${this.color}"><i class="fa-solid fa-circle-dot ps-2 fs-5 align-middle"></i></span></span>
        <div>
          <p class="pt-3">Created ${this.date}</p>
          <p>Updated ${this.updateDate}</p>
        </div>
    </div>
    <div class="col-md-7 d-flex justify-content-center p-3">
    <textarea name="note-text" id="note-text" cols="65" rows="20" onblur="app.notesController.updateNote()">${this.body}</textarea>
    </div>
    <div class="col-md-1 pt-3">
      <div class="row justify-content-center">
        <button type="button" class="delete-note-btn d-flex justify-content-center          align-items-center" onclick="app.notesController.deleteNote('${this.id}')">
        <div class="mdi mdi-trash-can delete-icon"></div>
        </button>
      </div>
    </div>
    `
  }

  get NoteDetails(){
    return /*html*/`
    <h3 class="py-1" onclick="app.notesController.setActiveNote('${this.id}')">${this.title}</h3>
      <div class="details">
        <p>Created ${this.date}</p>
        <p>Updated ${this.updateDate}</p>
      </div>
      `
  }
}