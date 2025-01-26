import { Routes } from '@angular/router';
import { NewNoteComponent } from './new-note/new-note.component';
import { NotesComponent } from './notes/notes.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'sign-in', // Redirect to 'sign-in' by default
        pathMatch: 'full', // Ensures it matches the full path
      },
    {
        path : 'sign-in',
        component : SignInComponent
    },
    {
        path : 'sign-up',
        component : SignUpComponent
    },
    {
        path : 'notes-dashboard',
        component : NotesComponent,
        canActivate: [AuthGuard]
    },
    {
        path : 'add-note',
        component : NewNoteComponent,
        canActivate: [AuthGuard]
    }
];
