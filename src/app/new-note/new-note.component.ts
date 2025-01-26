import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AddNote } from '../../models/add-note';
import { NotesService } from '../../services/notes.service';
import { first } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-new-note',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './new-note.component.html',
  styleUrl: './new-note.component.css'
})
export class NewNoteComponent implements OnInit {
  myForm!: FormGroup;
  payload : AddNote = {}
  isLoading = false;
  userId : string = '';
  constructor(private fb : FormBuilder, private router : Router, private noteService : NotesService, private toastr : ToastrService){}

  ngOnInit(): void {
    this.buildForm()
    this.userId = JSON.parse(sessionStorage.getItem('userResponse') as string).userId;
  }

  buildForm(){
    this.myForm = this.fb.group({
      title : ['', Validators.required],
      body : ['', Validators.required] 
    })
  }

  onSave(): void {
    if (this.myForm.valid) {
      this.isLoading = true;
      this.payload = new AddNote();

      this.payload.title = this.myForm.get('title')?.value;
      this.payload.body = this.myForm.get('body')?.value;
      this.payload.userId = this.userId;

      this.noteService.addNewNote(this.payload).pipe(first()).subscribe({
        next : (response)=>{
          this.isLoading = false
          this.toastr.success('New Note Added Successfully', 'Success');
          this.router.navigate(['/notes-dashboard'])
        },
        error : (err:HttpErrorResponse)=> {
         this.toastr.error(err.message, 'Error')
        }
      })    
    }
  }

  onCancel(): void {
    this.myForm.reset();
  }

  navigate(){
    this.router.navigate(['/notes-dashboard'])
  }
}
