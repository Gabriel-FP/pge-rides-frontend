import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';
import { AuthService } from '../../core/services/auth.service';
import { UserRole, LoginCredentials } from '../../core/models/auth.model';

interface RoleOption {
  label: string;
  value: UserRole;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    SelectButtonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  readonly UserRole = UserRole;
  readonly roleOptions: RoleOption[] = [
    { label: 'Client', value: UserRole.CLIENT },
    { label: 'Driver', value: UserRole.DRIVER }
  ];

  form!: FormGroup;
  selectedRole = signal<UserRole>(UserRole.CLIENT);
  isLoading = false;
  errorMessage = '';

  formIcon = computed(() => (this.selectedRole() === UserRole.CLIENT ? 'pi pi-user' : 'pi pi-car'));
  formHeading = computed(() => (this.selectedRole() === UserRole.CLIENT ? 'Client Sign In' : 'Driver Sign In'));
  formSubtext = computed(() =>
    this.selectedRole() === UserRole.CLIENT
      ? 'Request a ride to your destination'
      : 'Accept rides and start driving'
  );

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  submit(): void {
    if (this.form.invalid) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const credentials: LoginCredentials = this.form.value;

    this.authService.login(credentials, this.selectedRole()).subscribe({
      next: () => {
        this.isLoading = false;
        const redirectPath = this.selectedRole() === UserRole.CLIENT
          ? '/client/dashboard'
          : '/driver/dashboard';
        this.router.navigate([redirectPath]);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = 'Login failed. Please try again.';
        console.error(err);
      }
    });
  }
}
