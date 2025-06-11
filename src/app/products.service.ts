import { inject, Injectable } from '@angular/core';
import { Product } from './product';
import { Observable, map, of, tap } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { APP_SETTINGS } from './app.settings';

@Injectable()
export class ProductsService {
  private productsUrl = inject(APP_SETTINGS).apiUrl + '/products';
  constructor(private http: HttpClient) {}
  public products: Product[] = [];
  /*  {
      id: 1,
      title: 'Keyboard',
      price: 100,
      categories: {
        1: 'Computing',
        2: 'Peripherals',
      },
    },
    {
      id: 2,
      title: 'Microphone',
      price: 35,
      categories: { 3: 'Multimedia' },
    },
    {
      id: 3,
      title: 'Web camera',
      price: 79,
      categories: {
        1: 'Computing',
        3: 'Multimedia',
      },
    },
    {
      id: 4,
      title: 'Tablet',
      price: 500,
      categories: { 4: 'Entertainment' },
    },
  ]; */

  getProducts(): Observable<Product[]> {
    if (this.products.length === 0) {
    const options = new HttpParams().set('limit', 10);
    return this.http
      .get<Product[]>(this.productsUrl, {
        params: options,
      })
      .pipe(
        map((products) => {
          this.products = products;
          return products;
        })
      );

    }
      return of(this.products);
  }

  getProduct(id: number): Observable<Product> {
    const product = this.products.find((p) => p.id === id);
    return of(product!);
  }

  addProduct(newProduct: Partial<Product>): Observable<Product> {
    return this.http.post<Product>(this.productsUrl, newProduct).pipe(
      map((product) => {
        this.products.push(product);
        return product;
      })
    );
  }

  updateProduct(id: number, price: number): Observable<Product> {
    return this.http
      .patch<Product>(`${this.productsUrl}/${id}`, {
        price,
      })
      .pipe(
        map((product) => {
          const index = this.products.findIndex((p) => p.id === id);
          this.products[index].price = price;
          return product;
        })
      );
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.productsUrl}/${id}`).pipe(
      tap(() => {
        const index = this.products.findIndex((p) => p.id === id);
        this.products.splice(index, 1);
      })
    );
  }
}

