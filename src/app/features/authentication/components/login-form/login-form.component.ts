import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {AuthService} from '../../../../shared/services/authentication.service';
import {UserService} from '../../services/user.service';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslatePipe],
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  form: FormGroup;
  errorMessage: string | null = null;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(1)]] // puede ser min 1 porque backend lo acepta
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    const credentials = this.form.value;

    this.userService.login(credentials).subscribe({
      next: (response: { token: string; id: string }) => {
        const { token, id } = response;
        this.authService.saveToken(token);
        this.authService.saveUserId(id); // ⬅️ Guarda solo el ID (como string)

        console.log('✅ Token y userId guardados:', token, id);
        this.loading = false;
        this.router.navigate(['/main']);
      },
      error: (error: any) => {
        console.error('❌ Error al iniciar sesión:', error);
        this.errorMessage = 'Credenciales incorrectas o error del servidor.';
        this.loading = false;
      }
    });
  }


}
