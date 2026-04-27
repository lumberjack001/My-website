import { Component, signal, AfterViewInit, ElementRef, inject } from '@angular/core';

@Component({
  selector: 'app-tech-stack',
  standalone: true,
  template: `
    <section id="skills" class="py-32 px-6 border-y border-white/5 bg-white/[0.01] reveal overflow-hidden">
      <div class="max-w-7xl mx-auto">
        <div class="flex flex-col md:flex-row md:items-center justify-between mb-20 gap-8">
          <div class="max-w-xl">
            <h2 class="text-xs font-black tracking-[0.4em] text-blue-500 uppercase mb-4">Core Stack</h2>
            <p class="text-3xl font-bold text-white tracking-tight">Engineering scalable, high-performance web & mobile solutions.</p>
            <p class="text-xs text-blue-400 mt-4 opacity-50 uppercase tracking-widest">Hover to interact with the stack</p>
          </div>
          <div class="flex flex-wrap gap-3">
            <span class="px-5 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase text-slate-400">Frontend Expert</span>
            <span class="px-5 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase text-slate-400">Mobile Native</span>
            <span class="px-5 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase text-slate-400">CI/CD & DevOps</span>
          </div>
        </div>
        
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          @for (tech of techStack(); track tech) {
            <div 
              (mouseenter)="messWithUser($event)"
              class="group p-8 bg-white/[0.02] border border-white/5 rounded-[2.5rem] hover:bg-blue-600/10 hover:border-blue-500/40 transition-all duration-300 text-center stack-card cursor-help z-10 w-full h-full block">
              <div class="w-12 h-12 mx-auto mb-4 bg-white/5 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-600/20 transition-all pointer-events-none">
                <span class="text-blue-500 font-bold text-lg">⌬</span>
              </div>
              <span class="block text-white font-black tracking-tight text-xs uppercase pointer-events-none">{{ tech }}</span>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    .reveal {
      opacity: 0;
      transform: translateY(60px);
      transition: all 1.2s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .reveal.active {
      opacity: 1;
      transform: translate(0, 0);
    }

    .stack-card {
      transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
      will-change: transform;
    }
  `]
})
export class TechStackComponent implements AfterViewInit {
  private el = inject(ElementRef);

  techStack = signal([
    'Angular', 'Ionic', 'TypeScript', 'Flutter', 'Capacitor', 'GraphQL',
    'Agile/Scrum', 'CI/CD', 'Git/GitHub', 'Figma', 'Node.js', 'Firebase'
  ]);

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

  messWithUser(event: MouseEvent) {
    const target = event.currentTarget as HTMLElement;
    const x = (Math.random() - 0.5) * 60;
    const y = (Math.random() - 0.5) * 60;
    const r = (Math.random() - 0.5) * 30;
    const s = 0.8 + Math.random() * 0.4;

    target.style.transform = `translate(${x}px, ${y}px) rotate(${r}deg) scale(${s})`;

    setTimeout(() => {
      target.style.transform = '';
    }, 600);
  }
}
