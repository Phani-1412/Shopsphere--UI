import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-categories',
  standalone: false,
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent implements OnInit {
  categories: any[] = [];
  loading = true;
  error = '';
  actionMsg = '';
  showForm = false;
  newName = '';
  newParentId: number | null = null;
 
  constructor(private adminService: AdminService, private cdr: ChangeDetectorRef) {}
 
  ngOnInit() { this.loadCategories(); }
 
  loadCategories() {
    this.loading = true;
    this.adminService.getAllCategories()
    .subscribe({
      next: (data) => { 
        console.log('Categories loaded:', data);
        this.categories = Array.isArray(data)?data:[data];
         this.loading = false; this.cdr.detectChanges(); },
      error: () => { this.error = 'Failed to load categories.'; this.loading = false; this.cdr.detectChanges(); }
    });
  }
 
  toggleForm() { this.showForm = !this.showForm; this.newName = ''; this.newParentId = null; }
 
  submit() {
    if (!this.newName.trim()) return;
    this.adminService.createCategory(this.newName, this.newParentId).subscribe({
      next: (res) => { this.actionMsg = 'Category created!'; 
        console.log(res);
        this.showForm = false; this.loadCategories();this.cdr.detectChanges(); },
      error: () => { this.actionMsg = 'Failed to create category.'; }
    });
  }
}
 
