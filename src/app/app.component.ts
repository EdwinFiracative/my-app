import { Component, inject, Signal, computed, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { CopyrightDirective } from './copyright.directive';
import { NumericDirective } from './numeric.directive';
import { Observable } from 'rxjs';
import { KeyLoggerComponent } from './key-logger/key-logger.component';
import { APP_SETTINGS } from './app.settings';
import { AuthComponent } from './auth/auth.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    ProductListComponent,
    CopyrightDirective,
    NumericDirective,
    KeyLoggerComponent,
    AuthComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',

  //providers: [{ provide: APP_SETTINGS, useValue: appSettings }],
})
export class AppComponent {
  settings = inject(APP_SETTINGS);
  currentDate = signal(new Date());
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
