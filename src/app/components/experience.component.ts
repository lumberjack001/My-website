import { Component, signal, AfterViewInit, ElementRef, inject } from '@angular/core';

@Component({
  selector: 'app-experience',
  standalone: true,
  template: `
    <section id="experience" class="py-32 px-6 overflow-hidden">
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-24 reveal">
          <h2 class="text-xs font-black tracking-[0.4em] text-blue-500 uppercase mb-4">Trajectory</h2>
          <p class="text-4xl font-black text-white tracking-tighter uppercase leading-tight">Professional Journey</p>
        </div>
        
        <div class="space-y-24">
          @for (exp of experiences(); track exp.company; let i = $index) {
            <div class="relative pl-12 border-l-2 border-white/5 group reveal w-full">
              <div class="absolute left-[-13px] top-0 w-6 h-6 bg-black border-2 border-blue-600 rounded-full flex items-center justify-center z-10">
                <span class="text-[9px] font-black text-blue-500">{{ i + 1 }}</span>
              </div>
              
              <div class="mb-6">
                <div class="flex flex-col md:flex-row md:items-end gap-3 mb-2">
                  <h3 class="text-3xl font-black text-white leading-none group-hover:text-blue-500 transition-colors uppercase tracking-tight break-words">{{ exp.role }}</h3>
                  <div class="h-px w-full md:w-auto md:flex-grow bg-white/5 hidden md:block mb-3"></div>
                  <span class="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1 min-w-max">{{ exp.period }}</span>
                </div>
                <p class="text-blue-400 font-black text-xs tracking-[0.2em] uppercase">{{ exp.company }}</p>
              </div>
              
              <ul class="space-y-4">
                @for (point of exp.points; track point) {
                  <li class="flex items-start gap-4 text-slate-400 text-sm leading-relaxed">
                    <div class="mt-2 w-1.5 h-1.5 rounded-full bg-blue-600/40 min-w-1.5"></div>
                    <span class="break-words w-full block pr-4">{{ point }}</span>
                  </li>
                }
              </ul>
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
  `]
})
export class ExperienceComponent implements AfterViewInit {
  private el = inject(ElementRef);

  experiences = signal([
    {
      role: 'Chief Technical Officer (CTO)',
      company: 'Shoptreo',
      period: 'Mar 2023 - Dec 2025',
      points: [
        'Led a 5-person engineering team to launch company\'s MVP in under 6 months.',
        'Architected scalable systems ensuring 99.9% uptime for 1,000+ users.',
        'Implemented Agile practices and reusable component structures, boosting sprint velocity.',
        'Mentored junior engineers, developing cross-functional skills for overall productivity.'
      ]
    },
    {
      role: 'Frontend Developer',
      company: 'Robex Technologies',
      period: 'May 2024 - Dec 2024',
      points: [
        'Developed cross-platform Angular/Ionic applications, cutting load times by 35%.',
        'Engineered a shared component library, reducing feature delivery time by 20%.',
        'Optimized API integrations with backend systems, decreasing errors by 40%.',
        'Enhanced UI responsiveness and accessibility, increasing user retention.'
      ]
    },
    {
      role: 'Frontend Developer',
      company: 'Zumera Property',
      period: 'Nov 2023 - May 2024',
      points: [
        'Designed and launched websites, boosting online engagement by 50% in 2 months.',
        'Facilitated client workshops to refine requirements, raising satisfaction scores by 70%.',
        'Guided backend developers, strengthening collaboration and delivery efficiency.'
      ]
    },
    {
      role: 'Frontend Intern',
      company: 'Mobicure',
      period: 'Sep 2022 - Nov 2023',
      points: [
        'Redesigned the myPaddi web app, improving engagement metrics by 25%.',
        'Translated Figma prototypes into responsive Angular code, enhancing usability.'
      ]
    }
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
}
