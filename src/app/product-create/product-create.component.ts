import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import {MatInput} from '@angular/material/input';
import { MatFormField, MatError,MatLabel } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { priceMaximumValidator } from '../price-maximum.validator';
import {MatSelect, MatOption} from '@angular/material/select';

@Component({
  selector: 'app-product-create',
  imports: [
    ReactiveFormsModule,
    MatButton,
    MatFormField,
    MatInput,
    MatLabel,
    MatError,
    MatSelect,
    MatOption,
  ],
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.css',
  // providers: [ProductsService],
})
export class ProductCreateComponent implements OnInit {
  constructor(
    private productsService: ProductsService,
    private router: Router,
    private builder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  productForm:
    | FormGroup<{
        title: FormControl<string>;
        price: FormControl<number | undefined>;
        category: FormControl<string>;
      }>
    | undefined;

  private buildForm() {
    this.productForm = this.builder.nonNullable.group({
      title: [''],
      price: this.builder.nonNullable.control<number | undefined>(undefined, [
        Validators.required,
        Validators.min(1),
        priceMaximumValidator(1000),
      ]),
      category: [''],
    });
  }

  createProduct() {
    this.productsService.addProduct(this.productForm!.value).subscribe(() => {
      this.router.navigate(['/products']);
    });
    console.log('Product created:', this.productForm!.value);
  }
}
