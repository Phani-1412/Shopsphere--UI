import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
 
// Blocks anyone who is not logged in as Logistics from reaching /logistics
// Login page must save: localStorage.setItem('role', 'Logistics')
 
@Injectable({
  providedIn: 'root'
})
export class LogisticsGuard implements CanActivate {
  constructor(private router: Router) { }
 
  canActivate(): boolean {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
 
    if (token && role === 'Logistics') {
      return true;
    }
 
    this.router.navigate(['/login']);
    return false;
  }
}
 