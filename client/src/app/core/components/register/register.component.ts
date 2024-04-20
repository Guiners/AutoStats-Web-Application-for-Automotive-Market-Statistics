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
  public registerData: Register = { email: '', password: '' };
  public error: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  public ngOnInit(): void {}

  public register(): void {
    this.error = '';

    if (!this.registerForm.valid) {
      this.registerForm.markAllAsTouched();
    } else {
      this.registerData = {
        email: this.registerForm.get('email')?.value,
        password: this.registerForm.get('password')?.value,
      };

      this.authService.register(this.registerData).subscribe({
        error: (err) => {
          if (err.status === 401) {
            this.error = 'Użytkownik o takim emailu istnieje!';
          }
        },
        complete: () => this.router.navigate(['/login']),
      });
    }
  }
}
