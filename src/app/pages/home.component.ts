import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeroComponent } from '../components/hero.component';
import { TechStackComponent } from '../components/tech-stack.component';
import { ExperienceComponent } from '../components/experience.component';
import { PortfolioCtaComponent } from '../components/portfolio-cta.component';
import { EducationComponent } from '../components/education.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule, 
    HeroComponent, 
    TechStackComponent, 
    ExperienceComponent, 
    PortfolioCtaComponent,
    EducationComponent
  ],
  template: `
    <app-hero></app-hero>
    <app-tech-stack></app-tech-stack>
    <app-experience></app-experience>
    <app-portfolio-cta></app-portfolio-cta>
    <app-education></app-education>
  `
})
export class HomeComponent {}
