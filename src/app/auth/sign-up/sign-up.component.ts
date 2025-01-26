import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignUp } from '../../../models/sign-up';
import { AuthService } from '../auth.service';
import { first } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  myForm!: FormGroup;
  isLoading : boolean = false;
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  footerText : string = '';
  payload : SignUp = {};
  constructor(private fb : FormBuilder,private router : Router, private authService : AuthService, private toastr : ToastrService){}

  ngOnInit() {
    this.buildForm();
    this.footerText = `@Copyright ${new Date().getFullYear()}, Wayne Industries`
  }

  buildForm(){
    this.myForm = this.fb.group( {
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), this.passwordStrengthValidator]],
      cPassword: ['', Validators.required],
    },
    {
      validators: this.passwordMatchValidator,
    })
  }

  navigate(){
    this.router.navigate(['/sign-in'])
  }
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  passwordMatchValidator(group: FormGroup): { [key: string]: boolean } | null {
    const password = group.get('password')?.value;
    const cPassword = group.get('cPassword')?.value;
    return password === cPassword ? null : { passwordMismatch: true };
  }

  passwordStrengthValidator(control: any): { [key: string]: boolean } | null {
    const password = control.value;

    // Regex for at least one uppercase letter, one special character, and one number
    const hasUpperCase = /[A-Z]/.test(password);
    const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasNumber = /\d/.test(password);

    if (!hasUpperCase || !hasSpecialCharacter || !hasNumber) {
      return { passwordWeak: true };
    }

    return null;
  }


  onSave(): void {
    if (this.myForm.valid) {
      this.isLoading = true
        this.payload = new SignUp();
        this.payload.firstName = this.myForm.get('fname')?.value
        this.payload.lastName = this.myForm.get('lname')?.value
        this.payload.email = this.myForm.get('email')?.value
        this.payload.password = this.myForm.get('cPassword')?.value

        console.log("Payload :::", this.payload)

        this.authService.signUp(this.payload).pipe(first()).subscribe({
          next : (response)=>{
            this.isLoading = false;
            this.toastr.success('Signed Up Successfully, You can Sign in Now', 'User Created');
            this.router.navigate(['/sign-in'])
          },
          error : (err : HttpErrorResponse)=>{
            this.isLoading = false;
            console.log("Error Response:::",err)
            this.toastr.error(err.error.error, "User Exists")
          }
        })
    }
  }
}
