import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-policies',
  standalone: false,
  templateUrl: './policies.component.html',
  styleUrl: './policies.component.css',
})
export class PoliciesComponent implements OnInit {
  policies: any[] = [];
  loading = true;
  error = '';
  actionMsg = '';
  mode: 'create' | 'edit' | null = null;
  formTitle = '';
  formContent = '';
  editingId: number | null = null;
 
  constructor(private adminService: AdminService) {}
 
  ngOnInit() { this.loadPolicies(); }
 
  loadPolicies() {
    this.loading = true;
    this.adminService.getAllPolicies().subscribe({
      next: (data) => { this.policies = data; this.loading = false; },
      error: () => { this.error = 'Failed to load policies.'; this.loading = false; }
    });
  }
 
  openCreate() { this.mode = 'create'; this.formTitle = ''; this.formContent = ''; this.editingId = null; }
 
  openEdit(policy: any) { this.mode = 'edit'; this.formTitle = policy.title; this.formContent = policy.content; this.editingId = policy.policyID; }
 
  cancelForm() { this.mode = null; }
 
  submit() {
    if (!this.formTitle.trim() || !this.formContent.trim()) return;
    if (this.mode === 'create') {
      this.adminService.createPolicy(this.formTitle, this.formContent).subscribe({
        next: () => { this.actionMsg = 'Policy created!'; this.mode = null; this.loadPolicies(); },
        error: () => { this.actionMsg = 'Failed to create.'; }
      });
    } else if (this.mode === 'edit' && this.editingId !== null) {
      this.adminService.updatePolicy(this.editingId, this.formTitle, this.formContent).subscribe({
        next: () => { this.actionMsg = 'Policy updated!'; this.mode = null; this.loadPolicies(); },
        error: () => { this.actionMsg = 'Failed to update.'; }
      });
    }
  }
 
  delete(policyId: number) {
    if (!confirm('Are you sure you want to delete this policy?')) return;
    this.adminService.deletePolicy(policyId).subscribe({
      next: () => { this.actionMsg = 'Policy deleted.'; this.loadPolicies(); },
      error: () => { this.actionMsg = 'Failed to delete.'; }
    });
  }
}
 
