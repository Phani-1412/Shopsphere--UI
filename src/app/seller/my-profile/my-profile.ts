import { Component, OnInit } from '@angular/core';
import { SellerService } from '../../services/seller.service'; 
import { ChangeDetectorRef } from '@angular/core';

@Component({
 selector: 'app-my-profile',
 standalone: false,
 templateUrl: './my-profile.html',
 styleUrls: ['./my-profile.css']
})
export class MyProfile implements OnInit {
  user: any = {};
  constructor(private sellerService: SellerService,private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.getProfile();
  }

  getProfile() {
    this.sellerService.myProfile().subscribe({
      next: (res: any) => {
        this.user = res;
        this.cdr.detectChanges();
        console.log("API Response:", res);
      },
      error: (err) => {
        console.error('Error fetching profile:', err);
      }
    });
  }
}