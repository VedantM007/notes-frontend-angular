import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{

  firstName : string = '';
  lastName : string = '';
  email : string = '';

  constructor(private authService : AuthService){}

  ngOnInit() {
    if(sessionStorage.getItem('userResponse')){
    this.firstName = JSON.parse(sessionStorage.getItem('userResponse') as string).firstName;
    this.lastName = JSON.parse(sessionStorage.getItem('userResponse') as string).lastName;
    this.email = JSON.parse(sessionStorage.getItem('userResponse') as string).email;
    }
  }
  logout(){
    this.authService.logout();
  }
}
