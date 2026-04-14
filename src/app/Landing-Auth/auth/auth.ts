import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router'; 
 
@Component({
  selector: 'app-auth',
  standalone: false,
  templateUrl: './auth.html',
  styleUrl: './auth.css'
})
export class Auth {
 
  successMessage: string = '';
  errorMessage: string = '';
  isFlipped: boolean = false;
 
  // 2. Inject Router in constructor
  constructor(private authService: AuthService, private router: Router) {}
 
  toggleCard() {
    this.isFlipped = !this.isFlipped;
    this.successMessage = '';
    this.errorMessage = '';
  }
 
  onLogin(form: any) {
    this.successMessage = '';
    this.errorMessage = '';
 
    this.authService.login(form.value).subscribe({
      next: (res: any) => {
        if (!res) {
          this.errorMessage = 'Invalid response from server';
          return;
        }
 
        const token = res;
        localStorage.setItem('token', token);
 
        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
         
          // Identify the role from the token
          const role =
            payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] ||
            payload["role"] ||
            'Customer';
 
          console.log("User Role identified:", role);
 
          // 3. REDIRECTION LOGIC
          this.redirectByRole(role);
          localStorage.setItem('role', role);
          this.redirectByRole(role);
 
        } catch (e) {
          console.error("Token decode error:", e);
          // Fallback if decoding fails but login succeeded
          this.router.navigate(['/landingpage']);
        }
      },
      error: (err) => {
        this.errorMessage = err.status === 401 ? 'Invalid email or password.' : 'Login failed.';
      }
    });
  }
 
  // 4. Navigation Helper Method
    private redirectByRole(role: string) {
        const userRole = role.toLowerCase();
 
        switch (userRole) {
        case 'admin':
            this.router.navigate(['/admin']);
            break;
        case 'seller':
            this.router.navigate(['/seller']);
            break;
        case 'logistics':
            this.router.navigate(['/logistics']);
            break;
        case 'customer':
            this.router.navigate(['/customer']);
            break;
        default:
            this.router.navigate(['/landingpage']);
            break;
        }
    }
 
 onRegister(form: any) {
    this.successMessage = '';
    this.errorMessage = '';
 
    this.authService.register(form.value).subscribe({
      next: (res: any) => {
 
        if (res === "User already exists") {
          this.errorMessage = 'User already exists with this email.';
          return;
        }
 
        this.successMessage = 'Registration successful! Please login.';
        console.log("Registration Response:", res);
        // Flip to login after success
        this.isFlipped = false;
 
        form.reset();
      },
      error: (err) => {
        if (err.status === 400) {
          this.errorMessage = 'Invalid data. Please check inputs.';
        } else if (err.status === 409) {
          this.errorMessage = 'Email already exists.';
        } else {
          this.errorMessage = 'Registration failed. Try again later.';
        }
      }
    });
  }
}