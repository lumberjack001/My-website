import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home.component';
import { PortfolioComponent } from './pages/portfolio.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Shem Itoya | Home' },
  { path: 'portfolio', component: PortfolioComponent, title: 'Shem Itoya | Selected Work' },
  { path: '**', redirectTo: '' }
];
