import { Component, signal, HostListener, computed, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav 
      class="fixed top-0 w-full z-50 transition-all duration-500 border-b"
      [class]="scrolled() ? 'bg-black/90 backdrop-blur-xl border-white/5 py-3 shadow-2xl' : 'bg-transparent border-transparent py-6'">
      <div class="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a routerLink="/" class="flex items-center gap-3 cursor-pointer group">
          <div class="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-500 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-500/20 rotate-3 transition-transform group-hover:rotate-0">S</div>
          <div class="flex flex-col">
            <span class="font-bold text-lg tracking-tight text-white leading-none uppercase">Shem Itoya</span>
            <div class="h-[12px] overflow-hidden relative">
              @if (animating()) {
                <span class="block text-[9px] uppercase tracking-[0.3em] text-blue-500 font-black animate-role-slide">
                  {{ activeRole() }}
                </span>
              }
            </div>
          </div>
        </a>
        
        <div class="hidden md:flex items-center gap-10 text-[10px] font-black uppercase tracking-widest">
          <a [routerLink]="['/']" fragment="experience" class="hover:text-blue-400 transition-colors" [class.text-blue-500]="isActiveFragment('experience')">Experience</a>
          <a [routerLink]="['/']" fragment="skills" class="hover:text-blue-400 transition-colors" [class.text-blue-500]="isActiveFragment('skills')">Stack</a>
          <a [routerLink]="['/portfolio']" class="hover:text-blue-400 transition-colors" [class.text-blue-500]="isCurrentRoute('/portfolio')">Portfolio</a>
          <button class="px-6 py-2.5 bg-blue-600 text-white rounded-full hover:bg-blue-500 transition-all transform active:scale-95 shadow-lg shadow-blue-600/20">
            Get In Touch
          </button>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    @keyframes roleSlideOnce {
      0% { transform: translateY(20px); opacity: 0; }
      15% { transform: translateY(0); opacity: 1; }
      85% { transform: translateY(0); opacity: 1; }
      100% { transform: translateY(-20px); opacity: 0; }
    }

    .animate-role-slide {
      animation: roleSlideOnce 3.5s forwards cubic-bezier(0.23, 1, 0.32, 1);
    }
  `]
})
export class NavbarComponent implements OnInit {
  private router = inject(Router);

  scrolled = signal(false);
  animating = signal(true);
  currentUrl = signal('');

  roles = signal([
    'Engineering Manager', 
    'Web Developer', 
    'Mobile Developer', 
    'Team Player', 
    'Startup Leader', 
    'Prompt Engineer'
  ]);
  currentRoleIndex = signal(0);
  activeRole = computed(() => this.roles()[this.currentRoleIndex()]);

  constructor() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.currentUrl.set(event.urlAfterRedirects);
    });
  }

  isCurrentRoute(route: string): boolean {
    if (route === '/') {
      return this.currentUrl() === '/';
    }
    return this.currentUrl().startsWith(route);
  }

  isActiveFragment(fragment: string): boolean {
    return this.currentUrl().includes('#' + fragment);
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.scrolled.set(window.scrollY > 50);
  }

  ngOnInit() {
    this.cycleRoles();
  }

  private cycleRoles() {
    setInterval(() => {
      this.animating.set(false);
      this.currentRoleIndex.update(i => (i + 1) % this.roles().length);
      setTimeout(() => {
        this.animating.set(true);
      }, 50);
    }, 3500);
  }
}
