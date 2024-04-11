import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Register } from '../../models/register.model';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup;
  public passwordIsHide: boolean = true;
  public registerData: Register = { userName: '', email: '', password: '' };
  public error: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  public register(): void {
    this.error = '';
    if (!this.registerForm.valid) {
      this.registerForm.markAllAsTouched();
    } else {
      this.registerData.userName = this.registerForm.get('name')?.value;
      this.registerData.email = this.registerForm.get('email')?.value;
      this.registerData.password = this.registerForm.get('password')?.value;

      this.authService.register(this.registerData).subscribe({
        error: (err) => {
          if (err.status === 400) {
            this.error = 'Niepoprawny adres email.';
          }
          if (err.status === 409) {
            this.error = 'Użytkownik o takim emailu istnieje!';
          }
        },
        complete: () => this.router.navigate(['/login']),
      });
    }
  }
}
