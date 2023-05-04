import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLoginOrRegister: boolean = false;
  subscription: Subscription | undefined;

  constructor(private router: Router) {}

  ngOnInit() {
    this.subscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (event.url == '/login' || event.url == '/registro' || event.url == '/') {
          this.isLoginOrRegister = true;
        } else {
          this.isLoginOrRegister = false;
        }
      }
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}