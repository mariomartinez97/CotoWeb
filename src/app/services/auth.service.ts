import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

import 'rxjs/add/operator/filter';
import * as auth0 from 'auth0-js';

@Injectable()
export class AuthService {

  private auth0: auth0.WebAuth;
  private userProfile: any;

  constructor(public router: Router) {
    this.auth0 = new auth0.WebAuth({
      clientID: 'd3a_Rw2yO4Trh_jCCCP7wFaNywSS7MhF',
      domain: 'rodrigocso.auth0.com',
      responseType: 'token id_token',
      audience: 'https://portfolio.buffalo.com',
      redirectUri: environment.clientUrl,
      scope: 'openid profile email',
      leeway: 30
    });
  }

  public login(): void {
    this.auth0.authorize(null);
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err: auth0.Auth0Error, authResult: auth0.Auth0DecodedHash) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.setSession(authResult);
        this.router.navigate(['/']);
      } else if (err) {
        this.router.navigate(['/']);
        console.log(err);
      }
    });
  }

  private setSession(authResult: auth0.Auth0DecodedHash): void {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // Go back to the home route
    this.router.navigate(['/']);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

  public getProfile(cb: (err: auth0.Auth0Error, profile: auth0.Auth0UserProfile) => void): void {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      throw new Error('Access token must exist to fetch profile');
    }

    this.auth0.client.userInfo(accessToken, (err, profile) => {
      if (profile) {
        this.userProfile = profile;
      }
      cb(err, profile);
    });
  }
}
