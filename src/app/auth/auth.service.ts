import { Injectable } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { SignIn } from '../../models/sign-in';
import { Observable } from 'rxjs';
import { SignInResponse } from '../../models/sign-in-response';
import { Router } from '@angular/router';
import { SignUp } from '../../models/sign-up';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private commonService : CommonService, private router : Router) { }

   signUp(payload : SignUp):Observable<any>{
    return this.commonService.httpPost('https://notes-backend-api-service.onrender.com/auth/signup', payload)
   }
  signIn(payload : SignIn):Observable<SignInResponse>{
    return this.commonService.httpPost('https://notes-backend-api-service.onrender.com/auth/signin', payload)
  }
  isSignedIn(): boolean {
    const userResponse = sessionStorage.getItem('userResponse');
    if (userResponse) {
      try {
        const parsedResponse = JSON.parse(userResponse);
        return !!parsedResponse?.token; // Returns true if token exists
      } catch (error) {
        console.error('Error parsing userResponse from session storage:', error);
        return false; // Handle invalid JSON gracefully
      }
    }
    return false; // Return false if userResponse doesn't exist
  }
  
  logout(){
    sessionStorage.clear();
    this.router.navigate(['/']);
  }
}
