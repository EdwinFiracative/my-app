import { Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductCreateComponent } from './product-create/product-create.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductsService } from './products.service';
import { authGuard } from './auth.guard';
import { productsResolver } from './products.resolver';

export const routes: Routes = [
  {
    path: 'products',
    component: ProductListComponent,
    resolve: {
      products: productsResolver,
    },
    children: [
      { path: 'new', component: ProductCreateComponent },
      { path: ':id', component: ProductDetailComponent },
    ],
    providers: [ProductsService],
  },
  { path: 'cart', component: CartComponent, canActivate: [authGuard] },

  {
    path: 'user',
    loadChildren: () => import('./user.routes'),
    canMatch: [authGuard],
  },
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: '**', redirectTo: 'products' },
];
