import { CommonModule } from '@angular/common';
import {  Component, input, OnInit, output, ViewEncapsulation, OnChanges } from '@angular/core';
import { Product } from '../product';
import { Observable } from 'rxjs';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
  encapsulation: ViewEncapsulation.Emulated,
})
export class ProductDetailComponent implements OnInit, OnChanges {
  constructor(private productService: ProductsService) {
    //console.log('Product:', this.product());
  }

  id = input<number>();
  deleted = output();

  product$: Observable<Product> | undefined;

  ngOnInit(): void {
    //console.log('Product:', this.product());
  }
  //product = input<Product>();

  ngOnChanges(): void {
    this.product$ = this.productService.getProduct(this.id()!);
  }

  added = output();

  addToCart() {
    this.added.emit();
  }

  changePrice(product: Product, price: string) {
    this.productService.updateProduct(product.id, Number(price)).subscribe();
  }

  remove(product: Product) {
    this.productService.deleteProduct(product.id).subscribe(() => {
      this.deleted.emit();
    });
  }

  /* get productTitle() {
    return this.product()!.title;
  } */
}
