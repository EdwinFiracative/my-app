import { CommonModule } from '@angular/common';
import {  Component, input, OnInit, output, ViewEncapsulation, OnChanges } from '@angular/core';
import { Product } from '../product';
import { Observable, switchMap } from 'rxjs';
import { ProductsService } from '../products.service';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
  encapsulation: ViewEncapsulation.Emulated,
})
export class ProductDetailComponent implements OnInit {
  //, OnChanges
  constructor(
    private productService: ProductsService,
    public authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    //console.log('Product:', this.product());
  }

  id = input<number>();
  deleted = output();

  product$: Observable<Product> | undefined;

  ngOnInit(): void {
    //console.log('Product:', this.product());
    this.product$ = this.route.paramMap.pipe(
      switchMap((params) => {
        return this.productService.getProduct(Number(params.get('id')));
      })
    );
  }
  //product = input<Product>();

  /*  ngOnChanges(): void {
    this.product$ = this.productService.getProduct(this.id()!);
  } */

  added = output();

  addToCart() {
    // this.added.emit();
  }

  changePrice(product: Product, price: string) {
    this.productService
      .updateProduct(product.id, Number(price))
      .subscribe(() => {
        this.router.navigate(['/products']);
      });
  }

  remove(product: Product) {
    this.productService.deleteProduct(product.id).subscribe(() => {
      this.router.navigate(['/products']);
    });
  }

  /* get productTitle() {
    return this.product()!.title;
  } */
}
