import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { NotesComponent } from "./notes/notes.component";
import { FooterComponent } from "./footer/footer.component";
import { NewNoteComponent } from "./new-note/new-note.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, NotesComponent, FooterComponent, NewNoteComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'static-website';
  
}
