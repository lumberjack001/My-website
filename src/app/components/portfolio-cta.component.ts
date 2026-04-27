import { Component, AfterViewInit, ElementRef, inject } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-portfolio-cta',
  standalone: true,
  imports: [RouterModule],
  template: `
    <section class="py-24 px-6 border-t border-white/5 bg-gradient-to-b from-black to-blue-900/10 reveal overflow-hidden text-center">
      <div class="max-w-4xl mx-auto space-y-8 relative">
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/20 blur-[100px] rounded-full pointer-events-none"></div>
        
        <h2 class="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase relative z-10">
          Ready to see my <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-400">Work?</span>
        </h2>
        <p class="text-slate-400 text-lg max-w-xl mx-auto relative z-10">
          Dive into my portfolio to explore the intricate web and mobile products I've engineered from the ground up, including complex network architectures.
        </p>

        <div class="pt-8 relative z-10">
          <a routerLink="/portfolio" 
             class="inline-flex items-center justify-center gap-4 px-10 py-5 bg-blue-600 hover:bg-blue-500 text-white font-black uppercase text-xs tracking-[0.2em] rounded-full transition-all group shadow-xl shadow-blue-500/20 hover:shadow-blue-500/40 hover:-translate-y-1">
            <span>View Portfolio</span>
            <span class="w-8 h-px bg-white group-hover:w-12 transition-all duration-300"></span>
          </a>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .reveal {
      opacity: 0;
      transform: translateY(40px);
      transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
    }
    
    .reveal.active {
      opacity: 1;
      transform: translate(0, 0);
    }
  `]
})
export class PortfolioCtaComponent implements AfterViewInit {
  private el = inject(ElementRef);

  ngAfterViewInit() {
    setTimeout(() => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          entry.target.classList.toggle('active', entry.isIntersecting);
        });
      }, { threshold: 0.1, rootMargin: '-50px' });

      const elements = this.el.nativeElement.querySelectorAll('.reveal');
      elements.forEach((el: HTMLElement) => observer.observe(el));
    }, 100);
  }
}
