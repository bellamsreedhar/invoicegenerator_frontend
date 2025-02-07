import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bill-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bill-details.component.html',
  styleUrl: './bill-details.component.scss'
})
export class BillDetailsComponent {

  selectedProducts: any[] = [];
  totalPrice = 0;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.selectedProducts = navigation.extras.state['selectedProducts'] || [];
    }

    this.calculateTotalPrice();
  }

  calculateTotalPrice() {
    this.totalPrice = this.selectedProducts.reduce((total, product) => {
      return total + product.quantity * product.price;
    }, 0);
  }
  goBackToProducts() {
    this.router.navigate(['/products']);
  }


}
