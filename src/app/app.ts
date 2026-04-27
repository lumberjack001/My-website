import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './components/navbar.component';
import { FooterComponent } from './components/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent, FooterComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="min-h-screen bg-[#050505] text-slate-300 font-sans selection:bg-blue-600/30 selection:text-blue-200 overflow-x-hidden flex flex-col w-full">
      
      <!-- GLOW OVERLAYS -->
      <div class="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div class="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[120px] rounded-full opacity-60"></div>
        <div class="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-600/10 blur-[120px] rounded-full opacity-40"></div>
        <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03]"></div>
      </div>

      <!-- NAVIGATION -->
      <app-navbar></app-navbar>

      <!-- MAIN CONTENT OUTLET -->
      <main class="flex-grow z-10 w-full flex flex-col relative">
        <router-outlet></router-outlet>
      </main>

      <!-- FOOTER -->
      <app-footer></app-footer>
    </div>
  `,
  styles: [`
    :host { display: block; width: 100%; min-height: 100vh; }
    html { scroll-behavior: smooth; }

    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: #050505; }
    ::-webkit-scrollbar-thumb { background: #2563eb; border-radius: 10px; }
  `]
})
export class App {
}