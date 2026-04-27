import { Component, AfterViewInit, ElementRef, inject } from '@angular/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  template: `
    <section class="relative min-h-[calc(100vh-90px)] flex items-center px-6 z-10 w-full pt-25">
      <div class="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center w-full mt-10 lg:mt-0">
        <div class="order-2 lg:order-1 space-y-10 reveal-left">
          <div class="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-widest overflow-hidden h-[34px] relative min-w-[180px]">
            <span class="relative flex h-2 w-2">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span>BUILDING PRODUCTS</span>
          </div>
          
          <h1 class="text-6xl md:text-8xl font-black text-white tracking-tighter leading-[0.85]">
            Scaling <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-400">Products</span>,<br>
            Empowering <span class="text-white underline decoration-blue-600/50 decoration-4 underline-offset-8">Teams.</span>
          </h1>
          
          <p class="text-lg text-slate-400 max-w-xl leading-relaxed">
            Based in Nigeria, I bridge technical depth with strategic leadership. 
            As CTO at Shoptreo, I launched an MVP in 6 months and maintained 99.9% uptime for 1,000+ users.
          </p>

          <div class="flex flex-wrap gap-10">
            <div class="flex flex-col">
              <span class="text-4xl font-black text-white">4+</span>
              <span class="text-[9px] uppercase tracking-[0.3em] text-blue-500 font-black">Years Experience</span>
            </div>
            <div class="flex flex-col">
              <span class="text-4xl font-black text-white">25-50%</span>
              <span class="text-[9px] uppercase tracking-[0.3em] text-blue-500 font-black">Dev Velocity ↑</span>
            </div>
          </div>

          <div class="pt-4">
            <a href="#experience" class="group flex items-center gap-4 text-white font-bold uppercase tracking-widest text-[10px]">
              <span class="w-12 h-px bg-blue-600 group-hover:w-20 transition-all duration-500"></span>
              View Professional History
            </a>
          </div>
        </div>

        <div class="order-1 lg:order-2 relative flex justify-center lg:justify-end reveal-right mt-10 md:mt-0">
          <div class="relative w-72 h-72 md:w-[480px] md:h-[580px] group">
            <div class="absolute -inset-4 bg-gradient-to-tr from-blue-600/20 to-purple-600/20 blur-3xl rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-700"></div>
            
            <div class="relative w-full h-full overflow-hidden rounded-[2.5rem] border border-white/10 bg-slate-900/50 backdrop-blur-sm shadow-2xl">
              <img 
                src="assets/img/me.jpeg" 
                alt="Shem Itoya"
                class="w-full h-full object-cover grayscale opacity-40 contrast-125 mix-blend-luminosity group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000 ease-in-out"
              />
              
              <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex items-end p-10">
                <div class="space-y-1">
                  <p class="text-white font-black text-3xl tracking-tighter uppercase">Shem Itoya</p>
                  <div class="h-[20px] overflow-hidden relative">
                     <p class="text-blue-500 text-xs font-black tracking-[0.3em] uppercase">
                        CTO & Engineer
                     </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="absolute -bottom-6 -right-6 p-6 bg-blue-600 rounded-[2rem] shadow-2xl rotate-6 group-hover:rotate-0 transition-transform duration-500">
              <div class="text-white font-black text-xl italic leading-none">MVP</div>
              <div class="text-[8px] text-blue-100 uppercase tracking-widest font-black">Launched < 6m</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .reveal-left, .reveal-right {
      opacity: 0;
      transition: all 1.2s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .reveal-left { transform: translateX(-60px); }
    .reveal-right { transform: translateX(60px); }
    
    .reveal-left.active, .reveal-right.active {
      opacity: 1;
      transform: translate(0, 0);
    }
  `]
})
export class HeroComponent implements AfterViewInit {
  private el = inject(ElementRef);

  ngAfterViewInit() {
    setTimeout(() => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          entry.target.classList.toggle('active', entry.isIntersecting);
        });
      }, { threshold: 0.1, rootMargin: '-50px' });

      const elements = this.el.nativeElement.querySelectorAll('.reveal-left, .reveal-right');
      elements.forEach((el: HTMLElement) => observer.observe(el));
    }, 100);
  }
}
