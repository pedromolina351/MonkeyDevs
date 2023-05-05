import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import jwt_decode, { JwtPayload } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private cookieService: CookieService,
  ) {}

  getAuthToken(): string {
    return this.cookieService.get('token');
  }

  isLoggedIn(): boolean {
    const token = this.getAuthToken();
    if (!token) {
      return false;
    }
    const decodedToken: {exp?: number} = jwt_decode(token);
    if (!decodedToken.exp) {
      return false;
    }
    const expirationDate = new Date(0);
    expirationDate.setUTCSeconds(decodedToken.exp);
    return expirationDate > new Date();
  }

  getUserData(): any {
    const token = this.getAuthToken();
    if (!token) {
      return null;
    }
    const decodedToken = jwt_decode(token);
    return decodedToken;
  }
}