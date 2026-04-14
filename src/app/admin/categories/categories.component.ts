import { Component, OnInit } from '@angular/core';
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
 
  constructor(private adminService: AdminService) {}
 
  ngOnInit() { this.loadCategories(); }
 
  loadCategories() {
    this.loading = true;
    this.adminService.getAllCategories().subscribe({
      next: (data) => { this.categories = data; this.loading = false; },
      error: () => { this.error = 'Failed to load categories.'; this.loading = false; }
    });
  }
 
  toggleForm() { this.showForm = !this.showForm; this.newName = ''; this.newParentId = null; }
 
  submit() {
    if (!this.newName.trim()) return;
    this.adminService.createCategory(this.newName, this.newParentId).subscribe({
      next: () => { this.actionMsg = 'Category created!'; this.showForm = false; this.loadCategories(); },
      error: () => { this.actionMsg = 'Failed to create category.'; }
    });
  }
}
 
