import { AfterViewInit, Component, inject, Signal, computed, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
//import { ProductListComponent } from './product-list/product-list.component';
import { CopyrightDirective } from './copyright.directive';
import { NumericDirective } from './numeric.directive';
import { Observable } from 'rxjs';
import { KeyLoggerComponent } from './key-logger/key-logger.component';
import { APP_SETTINGS } from './app.settings';
import { AuthComponent } from './auth/auth.component';
import {MatToolbarRow, MatToolbar} from '@angular/material/toolbar';
import { MatButton } from '@angular/material/button';
import { MatBadge } from '@angular/material/badge';
import { CartService } from './cart.service';


@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    //ProductListComponent,
    CopyrightDirective,
    NumericDirective,
    KeyLoggerComponent,
    AuthComponent,
    MatToolbarRow,
    MatToolbar,
    MatButton,
    MatBadge
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',

  //providers: [{ provide: APP_SETTINGS, useValue: appSettings }],
})
export class AppComponent implements AfterViewInit {
  title2 = '';
  settings = inject(APP_SETTINGS);
  currentDate = signal(new Date());
  cartService = inject(CartService);

  ngAfterViewInit(): void {
    this.title2 = this.settings.title;
  }
  constructor() {
    // this.onComplete().then(this.setTitle);

    this.title$.subscribe(this.setTitle);

    // this.changeTitle(this.setTitle);
    this.title = computed(() => {
      return `${this.settings.title} (${this.currentDate()})`;
    });
  }

  title: Signal<string> = signal('');

  title$ = new Observable((observer) => {
    setInterval(() => {
      observer.next(2);
    }, 2000);
  });

  //settings = inject(APP_SETTINGS);

  private setTitle = () => {
    // const timestamp = new Date();

    this.currentDate.set(new Date());

    // this.title = `${this.settings.title} (${timestamp})`;

    // this.title = `${this.settings.title} (${this.currentDate()})`;

    // this.title = this.settings.title;
  };

  /* private onComplete() {
    return new Promise<void>((resolve) => {
      setInterval(() => {
        resolve();
      }, 2000);
    });
  } */

  /* private changeTitle(callback: Function) {
    setTimeout(() => {
      callback();
    }, 2000);
  } */
}
