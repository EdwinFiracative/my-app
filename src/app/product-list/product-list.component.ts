import { Component, OnInit, inject } from '@angular/core';
import { Product } from '../product';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { SortPipe } from '../sort.pipe';
import { ProductsService } from '../products.service';
import { FavoritesComponent } from '../favorites/favorites.component';
import { ProductViewComponent } from '../product-view/product-view.component';
import { AsyncPipe } from '@angular/common';
import { Observable, of, switchMap } from 'rxjs';
//import { ProductCreateComponent } from '../product-create/product-create.component';
import { RouterLink, RouterOutlet, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  imports: [
   // ProductDetailComponent,
    SortPipe,
    FavoritesComponent,
   // ProductViewComponent,
    AsyncPipe,
    RouterLink,
    RouterOutlet,
    //ProductCreateComponent,
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
  //providers: [ProductsService],
})
export class ProductListComponent implements OnInit {
  products$: Observable<Product[]> | undefined;

  // constructor(private readonly productService: ProductsService) {}
  private productService = inject(ProductsService);

  constructor(private route: ActivatedRoute) {}

  private getProducts() {
    this.products$ = this.route.data.pipe(
      switchMap(data => of(data['products'])));

  }

  ngOnInit(): void {
    this.getProducts();
  }

  selectedProduct: Product | undefined;
  messaje: string = 'Hola';

  onAdded() {
    alert(`${this.selectedProduct?.title} added to the cart!`);
  }

  myFunction() {
    this.messaje = 'Edwin Firacative';
  }
}

