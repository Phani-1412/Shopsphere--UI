import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CustomerGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(): boolean {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  // Use .toLowerCase() here to match your auth logic
  if (token && role?.toLowerCase() === 'customer') {
    return true;
  }

  console.log('Guard blocked navigation. Role found:', role); // Useful for debugging!
  this.router.navigate(['/landingpage']);
  return false;
}
}
