import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service'
@Component({
 selector: 'app-my-profile',
 standalone: false,
 templateUrl: './my-profile.html',
 styleUrls: ['./my-profile.css']
})
export class MyProfile implements OnInit {
 user: any = {
   userId:'',
   sellerId:'',
   name: '',
   email: '',
   phone: ''
 };
profile: any;
 constructor(private api: ApiService) {}
 ngOnInit(): void {
   this.getProfile();
 }
 getProfile() {
   this.api.get('seller/my-profile').subscribe((res: any) => {
     this.user = res;
   });
 }
}