import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HotToastService } from '@ngneat/hot-toast';
import { catchError, of } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loginFailed: boolean = false;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService,  private toast: HotToastService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.authService.login(username, password).subscribe(
        (success: any) => {
          if (success) {
            this.router.navigate(['/parties']);
            this.toast.success('Welcome to Party Management System!');
          }
        },
        (error: any) => {
          this.loginFailed = true;
          this.toast.error('Login failed. Please try again.', error);
        }
      );
    }
  }

  onLogout() {
    this.authService.logout();
    this.toast.success('You are Successfully Logged Out !');
  }
}
