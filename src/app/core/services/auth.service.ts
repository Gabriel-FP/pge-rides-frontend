import { Injectable, signal, computed } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { AuthSession, LoginCredentials, UserRole } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private sessionSignal = signal<AuthSession | null>(null);
  session = this.sessionSignal.asReadonly();
  isAuthenticated = computed(() => this.sessionSignal() !== null);
  role = computed(() => this.sessionSignal()?.role ?? null);

  constructor() {
    const stored = sessionStorage.getItem('authSession');
    if (stored) {
      this.sessionSignal.set(JSON.parse(stored));
    }
  }

  login(credentials: LoginCredentials, role: UserRole): Observable<AuthSession> {
    const mockSession: AuthSession = {
      userId: role === UserRole.CLIENT ? 1001 : 2001,
      role,
      username: credentials.username
    };

    return of(mockSession).pipe(
      delay(500),
      tap((session) => {
        this.sessionSignal.set(session);
        sessionStorage.setItem('authSession', JSON.stringify(session));
      })
    );
  }

  logout(): void {
    this.sessionSignal.set(null);
    sessionStorage.removeItem('authSession');
  }
}
