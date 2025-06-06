import { Component, OnInit, inject } from '@angular/core';
import { Product } from '../product';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { SortPipe } from '../sort.pipe';
import { ProductsService } from '../products.service';
import { FavoritesComponent } from '../favorites/favorites.component';
import { ProductViewComponent } from '../product-view/product-view.component';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-list',
  imports: [
    ProductDetailComponent,
    SortPipe,
    FavoritesComponent,
    ProductViewComponent,
    AsyncPipe,
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
  providers: [ProductsService],
})
export class ProductListComponent implements OnInit {
  products$: Observable<Product[]> | undefined;

  // constructor(private readonly productService: ProductsService) {}
  private productService = inject(ProductsService);

  private getProducts() {
    this.products$ = this.productService.getProducts();
  }

  ngOnInit(): void {
    this.getProducts();
  }

  selectedProduct: Product | undefined ;
  messaje: string = 'Hola';
  onAdded(product: Product) {
    alert(`${product.title} added to the cart!`);
  }

  myFunction() {
    this.messaje = 'Edwin Firacative';
  }
}

