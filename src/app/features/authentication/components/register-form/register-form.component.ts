import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {UserService} from '../../services/user.service';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslatePipe],
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent {
  form: FormGroup;
  submitting = false;
  errorMessage: string | null = null;
  registeredUserId: string | null = null;

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phone: ['', [Validators.required, Validators.minLength(9)]],
      rucEnterprise: ['', [Validators.required, Validators.minLength(11)]]
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting = true;
    this.errorMessage = null;

    const formValue = this.form.value;

    this.userService.register({
      username: formValue.username,
      email: formValue.email,
      password: formValue.password,
      phone: formValue.phone,
      rucEnterprise: formValue.rucEnterprise
    }).subscribe({
      next: (response) => {
        console.log('✅ Registro exitoso:', response);
        this.registeredUserId = response.userId;
        this.submitting = false;
      },
      error: (error) => {
        console.error('❌ Error en el registro:', error);
        this.errorMessage = 'Ocurrió un error durante el registro. Intenta nuevamente.';
        this.submitting = false;
      }
    });
  }
}
