import { Component } from '@angular/core';
import { ProductsService } from '../products.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-create',
  imports: [ReactiveFormsModule],
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.css',
  // providers: [ProductsService],
})
export class ProductCreateComponent {
  productForm = new FormGroup({
    title: new FormControl('', { nonNullable: true }),
    price: new FormControl<number | undefined>(undefined, {
      nonNullable: true,
    }),
    category: new FormControl('', { nonNullable: true }),
    extra: new FormGroup({
      image: new FormControl(''),
      description: new FormControl(''),
    }),
  });
  constructor(
    private productsService: ProductsService,
    private router: Router
  ) {}

  createProduct() {
    this.productsService.addProduct(this.productForm!.value).subscribe(() => {
      this.router.navigate(['/products']);
    });
    console.log('Product created:', this.productForm.value);
  }
}
