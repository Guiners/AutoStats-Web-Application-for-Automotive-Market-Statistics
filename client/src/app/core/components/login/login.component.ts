import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Login } from '../../models/login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public passwordIsHide: boolean = true;
  public loginData: Login = { email: '', password: '' };
  public error: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  public ngOnInit(): void {}

  public login(): void {
    this.error = '';
    if (!this.loginForm.valid) {
      this.loginForm.markAllAsTouched();
    } else {
      this.loginData.email = this.loginForm.get('email')?.value;
      this.loginData.password = this.loginForm.get('password')?.value;

      this.authService.login(this.loginData).subscribe({
        next: (res) => {
          if (!res) {
            this.error = 'Wprowadzony email lub hasło są nieprawidłowe.';
          } else {
            this.router.navigate(['/']);
          }
        },
      });
    }
  }
}
