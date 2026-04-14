import { Component, OnInit } from '@angular/core';
import { LogisticsService } from '../../services/logistics.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
 
@Component({
  selector: 'app-shipments',
  templateUrl: './shipments.component.html',
  standalone: false,
})
export class ShipmentsComponent implements OnInit {
  shipments: any[] = [];
  loading = true;
  error = '';
  actionMsg = '';
 
  // Valid status transitions a Logistics user can set
  validStatuses = ['Dispatched', 'InTransit', 'OutForDelivery', 'Delivered', 'Failed'];
 
  // Tracks which shipment's status is being changed
  updatingId: number | null = null;
  newStatus = '';
 
  constructor(private logisticsService: LogisticsService) {}
 
  ngOnInit() { this.loadShipments(); }
 
  loadShipments() {
    this.loading = true;
    this.logisticsService.getAllShipments().subscribe({
      next: (data) => { this.shipments = data; this.loading = false; },
      error: () => { this.error = 'Failed to load shipments.'; this.loading = false; }
    });
  }
 
  openUpdate(shipmentId: number, currentStatus: string) {
    this.updatingId = shipmentId;
    this.newStatus = currentStatus;
  }
 
  submitUpdate() {
    if (!this.newStatus || this.updatingId === null) return;
    this.logisticsService.updateShipmentStatus(this.updatingId, this.newStatus).subscribe({
      next: () => {
        this.actionMsg = 'Shipment status updated!';
        this.updatingId = null;
        this.loadShipments();
      },
      error: () => { this.actionMsg = 'Failed to update status.'; }
    });
  }
 
  cancelUpdate() { this.updatingId = null; this.newStatus = ''; }
}
 