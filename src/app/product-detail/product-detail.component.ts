import { CommonModule } from '@angular/common';
import {  Component, input, OnInit, output, ViewEncapsulation } from '@angular/core';
import { Product } from '../product';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
  encapsulation: ViewEncapsulation.Emulated,
})
export class ProductDetailComponent implements OnInit {
  constructor() {
    console.log('Product:', this.product());
  }

  ngOnInit(): void {
    console.log('Product:', this.product());
  }
  product = input<Product>();
  added = output<Product>();

  addToCart() {
    this.added.emit(this.product()!);
  }

  get productTitle() {
    return this.product()!.title;
  }
}
