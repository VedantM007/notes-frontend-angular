import { Component, OnInit } from '@angular/core';
import {NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { NewNoteComponent } from "./new-note/new-note.component";
import { filter } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, CommonModule ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers : [ToastrService]
})
export class AppComponent implements OnInit{
  title = 'static-website';
  showNotes: boolean = true;
  showFooter: boolean = true;
  showHeader: boolean = true;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const currentRoute = event.urlAfterRedirects;
        
        // Define the routes where notes and footer should be hidden
        const hideNotesRoutes = ['/add-note','/sign-in', '/sign-up'];
        const hideFooterRoutes = ['/add-note','/sign-in','/sign-up'];
        const hideHeaderRoutes = ['/sign-in', '/sign-up']

        // Update visibility based on the current route
        this.showNotes = !hideNotesRoutes.some((route) =>
          currentRoute.includes(route)
        );
        this.showFooter = !hideFooterRoutes.some((route) =>
          currentRoute.includes(route)
        );
        this.showHeader = !hideHeaderRoutes.some((route) =>
          currentRoute.includes(route)
        );
      }
    });
  }
}
