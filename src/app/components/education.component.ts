import { Component, AfterViewInit, ElementRef, inject } from '@angular/core';

@Component({
  selector: 'app-education',
  standalone: true,
  template: `
    <section id="education" class="py-32 px-6 bg-blue-600/[0.01] reveal overflow-hidden">
      <div class="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20">
        <div class="space-y-12">
          <h2 class="text-xs font-black tracking-[0.4em] text-blue-500 uppercase mb-8">Academic Background</h2>
          <div class="space-y-6">
            <div class="p-8 bg-white/[0.02] border border-white/5 rounded-[2rem] hover:bg-white/[0.04] transition-all">
              <p class="text-blue-500 text-[9px] font-black uppercase tracking-widest mb-2 overflow-hidden text-ellipsis whitespace-nowrap hidden sm:block">M.Sc in Information Technology</p>
              <p class="text-blue-500 text-[9px] font-black uppercase tracking-widest mb-2 sm:hidden">M.Sc in IT</p>
              <h4 class="text-white font-black text-2xl tracking-tight mb-2 uppercase break-words w-full">MIVA Open University</h4>
              <p class="text-slate-500 text-xs uppercase tracking-widest">Sep 2025 - Present</p>
            </div>
            <div class="p-8 bg-white/[0.02] border border-white/5 rounded-[2rem] hover:bg-white/[0.04] transition-all opacity-60">
              <p class="text-slate-500 text-[9px] font-black uppercase tracking-widest mb-2 overflow-hidden text-ellipsis whitespace-nowrap">B.Sc in Crop Science</p>
              <h4 class="text-white font-black text-2xl tracking-tight mb-2 uppercase break-words">University of Benin</h4>
              <p class="text-slate-500 text-xs uppercase tracking-widest">Graduated Dec 2023</p>
            </div>
          </div>
        </div>
        
        <div class="space-y-12">
          <h2 class="text-xs font-black tracking-[0.4em] text-blue-500 uppercase mb-8">Specialized Certifications</h2>
          <div class="grid gap-6">
            <div class="p-8 bg-white/[0.02] border border-white/5 rounded-[2rem] flex items-center gap-6 group hover:border-blue-500/30 transition-all flex-wrap sm:flex-nowrap">
              <div class="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-400 text-3xl group-hover:rotate-12 transition-transform">⌬</div>
              <div class="flex-1 w-full min-w-0">
                <h5 class="text-white font-black text-lg sm:text-xl uppercase tracking-tight break-words pr-2">Frontend Development</h5>
                <p class="text-slate-500 text-[9px] font-black uppercase tracking-widest mt-1">SideHustle Certified</p>
              </div>
            </div>
            <div class="p-8 bg-white/[0.02] border border-white/5 rounded-[2rem] flex items-center gap-6 group hover:border-indigo-500/30 transition-all flex-wrap sm:flex-nowrap">
              <div class="w-16 h-16 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-400 text-3xl group-hover:rotate-12 transition-transform">AI</div>
              <div class="flex-1 w-full min-w-0">
                <h5 class="text-white font-black text-lg sm:text-xl uppercase tracking-tight break-words pr-2">Prompt Engineering</h5>
                <p class="text-slate-500 text-[9px] font-black uppercase tracking-widest mt-1">Advanced AI Workflows</p>
              </div>
            </div>
          </div>
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
  `]
})
export class EducationComponent implements AfterViewInit {
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
