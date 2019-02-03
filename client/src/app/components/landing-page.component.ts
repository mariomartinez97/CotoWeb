import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { AuthService } from '../services/auth.service'
import { WOW } from 'wowjs/dist/wow.min'

@Component({
  selector: 'br-landing-page',
  templateUrl: './templates/landing-page.component.html',
  styleUrls: ['./styles/landing-page.component.css']
})

export class LandingPageComponent {

  wow: any;

  constructor(
    private router: Router,
    private auth: AuthService
  ){
    this.wow = new WOW();
    this.wow.init();
    // console.log(auth.isAuthenticated().toString())
  }

  public gotoDetails() {
    this.router.navigate(['./securities']);
  }

  public gotoSignUp(){
    this.auth.login();
  }
}
