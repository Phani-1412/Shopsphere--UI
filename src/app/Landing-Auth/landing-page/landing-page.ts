import { Component } from '@angular/core';
import { signal } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  standalone: false,
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.css',
})

export class LandingPage {
  protected readonly title = signal('ShopSphere');
  }
