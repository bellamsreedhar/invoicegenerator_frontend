import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
  products:any = [];
  showAddProductForm = false;
  addProductForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.addProductForm = this.fb.group({
      productName: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      quantity: [1, [Validators.required, Validators.min(1)]],
    });

    this.getProducts();
  }

  getProducts(){
    this.http
    .get('http://localhost:8080/api/v1/user/getProducts')
    .subscribe(
      (response:any) => {
        console.log('Product saved successfully:', response);
        this.products = response.payload;

      },
      error => {
        console.error('Error saving product:', error);
      }
    );
  }

  incrementQuantity(product: any) {
    product.quantity += 1;
  }

  decrementQuantity(product: any) {
    if (product.quantity > 0) {
      product.quantity -= 1;
    }
  }

  openAddProductForm() {
    this.showAddProductForm = true;
  }

  closeAddProductForm() {
    this.showAddProductForm = false;
    this.addProductForm.reset();
  }

  addProduct() {
    if (this.addProductForm.valid) {
      const newProduct = [this.addProductForm.value]; // Backend expects a list of products

      // Post the new product to the backend
      this.http
        .post('http://localhost:8080/api/v1/admin/save_products', newProduct)
        .subscribe(
          response => {
            console.log('Product saved successfully:', response);

            // Update the local product list for UI display
            this.products.push(this.addProductForm.value);

            // Close the add product form
            this.closeAddProductForm();
          },
          error => {
            console.error('Error saving product:', error);
          }
        );
    }
}
}
