import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service'

@Component({
  selector: 'br-auth',
  templateUrl: './templates/auth.component.html',
  styleUrls: ['./styles/auth.component.css']
})
export class AuthComponent {

  constructor(private auth: AuthService) { }

  public login(): void {
    this.auth.login();
  }

  public logout(): void {
    this.auth.logout();
  }

  public isAuthenticated(): boolean {
    return this.auth.isAuthenticated();
  }
}
