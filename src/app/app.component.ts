import { Component, inject, Signal, computed, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { CopyrightDirective } from './copyright.directive';
import { NumericDirective } from './numeric.directive';
import { APP_SETTINGS, appSettings } from './app.settings';
import { Observable } from 'rxjs';
import { KeyLoggerComponent } from './key-logger/key-logger.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    ProductListComponent,
    CopyrightDirective,
    NumericDirective,
    KeyLoggerComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [{ provide: APP_SETTINGS, useValue: appSettings }],
})
export class AppComponent {
  currentDate = signal(new Date());
  constructor() {
    // this.onComplete().then(this.setTitle);
    this.title$.subscribe(this.setTitle);
    // this.changeTitle(this.setTitle);
  }

  title = 'my-app';

  title$ = new Observable((observer) => {
    setInterval(() => {
      observer.next(2);
    }, 2000);
  });

  settings = inject(APP_SETTINGS);

  private setTitle = () => {
    // const timestamp = new Date();

    this.currentDate.set(new Date());

   // this.title = `${this.settings.title} (${timestamp})`;

   this.title = `${this.settings.title} (${this.currentDate()})`;

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
