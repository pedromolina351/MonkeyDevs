import { Component } from '@angular/core';
import { AuthService } from '../services/auth.services';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  nombre = '';

  constructor(
    private authService: AuthService,
    private cookieService: CookieService,
    private router: Router
    ){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    const nombreTokens = this.authService.getUserData();
    this.nombre = nombreTokens.nombre;
  }

  cerrarSesion(){
    this.cookieService.delete('token');
    this.router.navigate(['/login']);

  }

}