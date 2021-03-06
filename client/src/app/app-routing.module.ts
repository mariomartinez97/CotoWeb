import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './components/app.component';
import { AuthComponent } from './components/auth.component';
import { SecurityFinderComponent } from './components/security-finder.component';
import { InfoComponent } from './components/info.component';
import { TicketsComponent } from './components/tickets.component';
import { SecurityFilterPipe } from './pipes/security-filter.pipe';
import { HistoricalPricesComponent } from './components/historical-prices.component';
import { PortfolioComponent } from './components/portfolio.component';
import { SecurityDetailComponent } from './components/security-detail.component';
import { AboutComponent } from './components/about.component';
import { LandingPageComponent } from './components/landing-page.component';
import { AuthGuardComponent } from './components/authguard.component';
import { PlanVisitComponent } from './components/plan-visit.component';
import { SafetyFirstComponent } from './components/safety-first.component';
import { CartComponent} from './components/cart.component';

import { Tour1Component } from './components/tour1.component';
import { Tour2Component } from './components/tour2.component';
import { Tour3Component } from './components/tour3.component';


const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'info', component: InfoComponent },
  { path: 'compare', component: TicketsComponent },
  { path: 'prices/:ticker', component: HistoricalPricesComponent },
  { path: 'cotizaciones', component: PortfolioComponent, canActivate: [AuthGuardComponent] },
  { path: 'security-detail/:ticker', component: SecurityDetailComponent },
  { path: 'about', component: AboutComponent },
  { path: 'visit', component: PlanVisitComponent },
  { path: 'safety', component: SafetyFirstComponent, canActivate: [AuthGuardComponent] },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuardComponent]},
  { path: 'tour-1', component: Tour1Component, canActivate: [AuthGuardComponent] },
  { path: 'tour-2', component: Tour2Component, canActivate: [AuthGuardComponent] },
  { path: 'tour-3', component: Tour3Component, canActivate: [AuthGuardComponent] },

];

@NgModule({
  imports: [ RouterModule.forRoot(routes, {useHash: false}) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
