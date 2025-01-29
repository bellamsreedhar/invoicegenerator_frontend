import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import {Router } from '@angular/router';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  isLogin = true; // Toggle between Login and Register
  loginForm: FormGroup;
  registrationForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.registrationForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      isAdmin: [false]
    });
  }

  toggleTab(isLogin: boolean) {
    this.isLogin = isLogin;
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.http.post('http://localhost:8080/api/v1/auth/login', this.loginForm.value).subscribe(
        (response:any) => {
          console.log('Login successful:', response);
          localStorage.setItem("auth_token",response.payload.output);
          this.router.navigate(['/products']);

        },
        error => {
          console.error('Login failed:', error);
        }
      );
    }
  }

  onRegister() {
    if (this.registrationForm.valid) {
      this.http.post('http://localhost:8080/api/v1/auth/register', this.registrationForm.value).subscribe(
        response => {
          console.log('Registration successful:', response);
        },
        error => {
          console.error('Registration failed:', error);
        }
      );
    }
  }
}
