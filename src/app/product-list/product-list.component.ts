import { Component, OnInit, inject } from '@angular/core';
import { Product } from '../product';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { SortPipe } from '../sort.pipe';
import { ProductsService } from '../products.service';
import { FavoritesComponent } from '../favorites/favorites.component';
import { ProductViewComponent } from '../product-view/product-view.component';

@Component({
  selector: 'app-product-list',
  imports: [ProductDetailComponent, SortPipe, FavoritesComponent, ProductViewComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
  providers:[ProductsService]
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  // constructor(private readonly productService: ProductsService) {}
  private productService = inject(ProductsService);

  ngOnInit(): void {
    this.products = this.productService.getProducts();
  }

  selectedProduct: Product | undefined = this.products[0];
  messaje: string = 'Hola';
  onAdded(product: Product) {
    alert(`${product.title} added to the cart!`);
  }

  myFunction() {
    this.messaje = 'Edwin Firacative';
  }
}

