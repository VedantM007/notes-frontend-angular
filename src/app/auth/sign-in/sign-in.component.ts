import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignIn } from '../../../models/sign-in';
import { AuthService } from '../auth.service';
import { first } from 'rxjs';
import { SignInResponse } from '../../../models/sign-in-response';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent implements OnInit {
  myForm!: FormGroup;
  isLoading : boolean = false;
  showPassword: boolean = false;
  footerText : string = '';
  payload : SignIn = {}
  constructor(private fb : FormBuilder,private router : Router, private authService : AuthService, private toastr : ToastrService){}

  ngOnInit() {
    this.buildForm();
    this.footerText = `@Copyright ${new Date().getFullYear()}, Wayne Industries`

  }

  buildForm(){
    this.myForm = this.fb.group({
      email : ['', [Validators.required, Validators.email]],
      password : ['', Validators.required]
    })
  }

  navigate(){
    this.router.navigate(['/sign-up'])
  }
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSave(): void {
    if (this.myForm.valid) {
      this.isLoading = true
      this.payload = new SignIn();

      this.payload.email = this.myForm.get('email')?.value;
      this.payload.password = this.myForm.get('password')?.value;

       this.authService.signIn(this.payload).pipe(first()).subscribe({
        next : (response : SignInResponse)=>{
            this.isLoading = false;
            sessionStorage.setItem('userResponse', JSON.stringify(response));
            this.toastr.success('Logged In Successfully', 'Success');
            this.router.navigate(['/notes-dashboard']);
        },
        error : (err : HttpErrorResponse)=>{
          if(err.status == 401){
            this.isLoading = false;
            this.myForm.reset();
            this.toastr.error(err.error.error, "Unauthorized")
          }
        }
       })
    }
  }
}
