import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ActivationEnd, NavigationEnd, Router } from '@angular/router';

@Injectable()
export class RouterService {
  private url = new BehaviorSubject<string>('');
  currentUrl = this.url.asObservable();
  params: any;
  constructor(private router: Router) {
    this.router.events.subscribe(
      event => {
        if (event instanceof ActivationEnd) {
            this.params = event.snapshot.params;
        }
        if (event instanceof NavigationEnd) {
          let tempURL = this.router.url.toLocaleLowerCase().replace('/', '');
          if (tempURL.includes('?')) {
            tempURL = tempURL.substring(0, tempURL.indexOf('?') );
          }
          this.url.next(tempURL);
        }
      }
    );
  }
  navigateTo(URL: string, params?: string) {
    this.router.navigate([URL, params]);
  }
}
