import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { Observable } from 'rxjs';
import { Note } from '../models/note';
import { AddNote } from '../models/add-note';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(private commonService : CommonService) { }

  getAllNotesByUser(userId : string):Observable<Note[]>{
    return this.commonService.httpGet(`https://notes-backend-api-service.onrender.com/notes/getAllNotesByUserId?userId=${userId}`);
  }

  addNewNote(payload : AddNote):Observable<any>{
   return this.commonService.httpPostWithAuth('https://notes-backend-api-service.onrender.com/notes/addNote', payload);
  }

  deleteNote(id : string):Observable<any>{
    return this.commonService.httpDelete(`https://notes-backend-api-service.onrender.com/notes/deleteNote?id=${id}`)
  }

}
