import { Component, OnInit } from '@angular/core';
import { NotesService } from '../../services/notes.service';
import { Note } from '../../models/note';
import { first } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.css'
})
export class NotesComponent implements OnInit{
  isVisible : boolean = false;
  notes : Note[] = [];
  userId : string = ''
  filteredNotes: Note[] = [];
  constructor(private notesService : NotesService, private toastr : ToastrService,private router : Router){}

  ngOnInit() {
    this.userId = JSON.parse(sessionStorage.getItem('userResponse') as string).userId
    console.log(this.userId)
    this.getCurrentNotes()
  }

  getCurrentNotes(){
    this.notesService.getAllNotesByUser(this.userId).subscribe({
      next : (response) => {
        console.log("response:::: ", response)
        this.notes = response
        this.filteredNotes = [...this.notes];
      },
      error : (err:HttpErrorResponse) => {
        console.log(err)
        if(err.status == 401){
          this.router.navigate(['/']);
          this.toastr.error('Please Sign In again', 'Session Timeout');
          sessionStorage.clear();
        }
      }
    })
  }



  deleteNote(id:string){
    this.notesService.deleteNote(id).pipe(first()).subscribe({
      next : (res)=>{
        this.toastr.info('Selected Note deleted', 'Deleted');
        this.getCurrentNotes();
      },
      error : (err:HttpErrorResponse)=>{
        this.toastr.error(err.message, 'Error')
      }
    })
  }

  navigate() {
    this.router.navigate(['/add-note']); // Navigate to '/add-note'
  }

  filterNotes(value: string) {
    const lowerCaseFilter = value.toLowerCase();
    if (!value) {
      // If input is empty, reset to the original notes array
      this.filteredNotes = [...this.notes];
    } else {
      // Filter notes based on title or body
      this.filteredNotes = this.notes.filter(
        (note) =>
          note.title.toLowerCase().includes(lowerCaseFilter) || note.body.toLowerCase().includes(lowerCaseFilter) 
      );
    }
  }
}
