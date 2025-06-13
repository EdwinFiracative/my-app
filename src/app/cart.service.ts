import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, defer, map } from 'rxjs';
import { Cart } from './cart';
import { APP_SETTINGS } from './app.settings';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient) {}
  cart: Cart | undefined;
  private cartUrl = inject(APP_SETTINGS).apiUrl + '/carts';

  addProduct(id: number): Observable<Cart> {
    const cartProduct = { productId: id, quantity: 1 };

    return defer(() =>
      !this.cart
        ? this.http.post<Cart>(this.cartUrl, { products: [cartProduct] })
        : this.http.put<Cart>(`${this.cartUrl}/${this.cart.id}`, {
            products: [...this.cart.products, cartProduct],
          })
    ).pipe(map((cart) => (this.cart = cart)));
  }
}
