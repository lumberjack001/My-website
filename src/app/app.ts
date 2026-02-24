import { Component, signal, HostListener, ChangeDetectionStrategy, AfterViewInit, ElementRef, inject, OnInit, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="min-h-screen bg-[#050505] text-slate-300 font-sans selection:bg-blue-600/30 selection:text-blue-200 overflow-x-hidden">
      
      <!-- GLOW OVERLAYS -->
      <div class="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div class="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[120px] rounded-full opacity-60"></div>
        <div class="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-600/10 blur-[120px] rounded-full opacity-40"></div>
        <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03]"></div>
      </div>

      <!-- NAVIGATION -->
      <nav 
        class="fixed top-0 w-full z-50 transition-all duration-500 border-b"
        [class]="scrolled() ? 'bg-black/90 backdrop-blur-xl border-white/5 py-3 shadow-2xl' : 'bg-transparent border-transparent py-6'">
        <div class="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-500 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-500/20 rotate-3 transition-transform hover:rotate-0 cursor-pointer">S</div>
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
          </div>
          
          <div class="hidden md:flex items-center gap-10 text-[10px] font-black uppercase tracking-widest">
            <a href="#experience" class="hover:text-blue-400 transition-colors">Experience</a>
            <a href="#skills" class="hover:text-blue-400 transition-colors">Stack</a>
            <a href="#education" class="hover:text-blue-400 transition-colors">Education</a>
            <button class="px-6 py-2.5 bg-blue-600 text-white rounded-full hover:bg-blue-500 transition-all transform active:scale-95 shadow-lg shadow-blue-600/20">
              Get In Touch
            </button>
          </div>
        </div>
      </nav>

      <!-- HERO SECTION -->
      <section class="relative min-h-screen flex items-center px-6 pt-20 z-10">
        <div class="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center w-full">
          <div class="order-2 lg:order-1 space-y-10 reveal-left">
            <div class="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-widest overflow-hidden h-[34px] relative min-w-[180px]">
              <span class="relative flex h-2 w-2">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              @if (animating()) {
                <span class="animate-role-slide block">
                  {{ activeRole() }}
                </span>
              }
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

          <!-- PHOTO FRAME -->
          <div class="order-1 lg:order-2 relative flex justify-center lg:justify-end reveal-right">
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
                      @if (animating()) {
                        <p class="text-blue-500 text-xs font-black tracking-[0.3em] uppercase animate-role-slide">
                          {{ activeRole() }}
                        </p>
                      }
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

      <!-- TECH STACK -->
      <section id="skills" class="py-32 px-6 border-y border-white/5 bg-white/[0.01] reveal">
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
                class="group p-8 bg-white/[0.02] border border-white/5 rounded-[2.5rem] hover:bg-blue-600/10 hover:border-blue-500/40 transition-all duration-300 text-center stack-card cursor-help">
                <div class="w-12 h-12 mx-auto mb-4 bg-white/5 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-600/20 transition-all">
                  <span class="text-blue-500 font-bold text-lg">⌬</span>
                </div>
                <span class="block text-white font-black tracking-tight text-xs uppercase">{{ tech }}</span>
              </div>
            }
          </div>
        </div>
      </section>

      <!-- EXPERIENCE -->
      <section id="experience" class="py-32 px-6">
        <div class="max-w-4xl mx-auto">
          <div class="text-center mb-24 reveal">
            <h2 class="text-xs font-black tracking-[0.4em] text-blue-500 uppercase mb-4">Trajectory</h2>
            <p class="text-4xl font-black text-white tracking-tighter uppercase leading-tight">Professional Journey</p>
          </div>
          
          <div class="space-y-24">
            @for (exp of experiences(); track exp.company; let i = $index) {
              <div class="relative pl-12 border-l-2 border-white/5 group reveal">
                <div class="absolute left-[-13px] top-0 w-6 h-6 bg-black border-2 border-blue-600 rounded-full flex items-center justify-center z-10">
                  <span class="text-[9px] font-black text-blue-500">{{ i + 1 }}</span>
                </div>
                
                <div class="mb-6">
                  <div class="flex flex-col md:flex-row md:items-end gap-3 mb-2">
                    <h3 class="text-3xl font-black text-white leading-none group-hover:text-blue-500 transition-colors uppercase tracking-tight">{{ exp.role }}</h3>
                    <div class="h-px flex-grow bg-white/5 hidden md:block mb-3"></div>
                    <span class="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">{{ exp.period }}</span>
                  </div>
                  <p class="text-blue-400 font-black text-xs tracking-[0.2em] uppercase">{{ exp.company }}</p>
                </div>
                
                <ul class="space-y-4">
                  @for (point of exp.points; track point) {
                    <li class="flex items-start gap-4 text-slate-400 text-sm leading-relaxed">
                      <div class="mt-2 w-1.5 h-1.5 rounded-full bg-blue-600/40"></div>
                      {{ point }}
                    </li>
                  }
                </ul>
              </div>
            }
          </div>
        </div>
      </section>

      <!-- EDUCATION -->
      <section id="education" class="py-32 px-6 bg-blue-600/[0.01] reveal">
        <div class="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20">
          <div class="space-y-12">
            <h2 class="text-xs font-black tracking-[0.4em] text-blue-500 uppercase mb-8">Academic Background</h2>
            <div class="space-y-6">
              <div class="p-8 bg-white/[0.02] border border-white/5 rounded-[2rem] hover:bg-white/[0.04] transition-all">
                <p class="text-blue-500 text-[9px] font-black uppercase tracking-widest mb-2">M.Sc in Information Technology</p>
                <h4 class="text-white font-black text-2xl tracking-tight mb-2 uppercase">MIVA Open University</h4>
                <p class="text-slate-500 text-xs uppercase tracking-widest">Sep 2025 - Present</p>
              </div>
              <div class="p-8 bg-white/[0.02] border border-white/5 rounded-[2rem] hover:bg-white/[0.04] transition-all opacity-60">
                <p class="text-slate-500 text-[9px] font-black uppercase tracking-widest mb-2">B.Sc in Crop Science</p>
                <h4 class="text-white font-black text-2xl tracking-tight mb-2 uppercase">University of Benin</h4>
                <p class="text-slate-500 text-xs uppercase tracking-widest">Graduated Dec 2023</p>
              </div>
            </div>
          </div>
          
          <div class="space-y-12">
            <h2 class="text-xs font-black tracking-[0.4em] text-blue-500 uppercase mb-8">Specialized Certifications</h2>
            <div class="grid gap-6">
              <div class="p-8 bg-white/[0.02] border border-white/5 rounded-[2rem] flex items-center gap-6 group hover:border-blue-500/30 transition-all">
                <div class="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-400 text-3xl group-hover:rotate-12 transition-transform">⌬</div>
                <div>
                  <h5 class="text-white font-black text-lg uppercase tracking-tight">Frontend Development</h5>
                  <p class="text-slate-500 text-[9px] font-black uppercase tracking-widest">SideHustle Certified</p>
                </div>
              </div>
              <div class="p-8 bg-white/[0.02] border border-white/5 rounded-[2rem] flex items-center gap-6 group hover:border-indigo-500/30 transition-all">
                <div class="w-16 h-16 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-400 text-3xl group-hover:rotate-12 transition-transform">AI</div>
                <div>
                  <h5 class="text-white font-black text-lg uppercase tracking-tight">Prompt Engineering</h5>
                  <p class="text-slate-500 text-[9px] font-black uppercase tracking-widest">Advanced AI Workflows</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- FOOTER -->
      <footer class="py-32 px-6 border-t border-white/5 text-center bg-black">
        <div class="max-w-2xl mx-auto space-y-12 reveal">
          <div class="w-16 h-16 bg-blue-600 rounded-[1.5rem] mx-auto flex items-center justify-center text-white font-black text-3xl shadow-2xl rotate-6">S</div>
          <h2 class="text-5xl md:text-6xl font-black text-white tracking-tighter leading-none uppercase">Let's build the <br> <span class="text-blue-600">future together.</span></h2>
          
          <div class="flex flex-wrap justify-center gap-8 pt-8">
            <a href="mailto:itoya.shem2017@gmail.com" class="text-[9px] font-black uppercase tracking-[0.4em] text-slate-500 hover:text-white transition-all">itoya.shem2017&#64;gmail.com</a>
            <a href="https://linkedin.com" target="_blank" class="text-[9px] font-black uppercase tracking-[0.4em] text-slate-500 hover:text-white transition-all">LinkedIn</a>
            <a href="https://github.com" target="_blank" class="text-[9px] font-black uppercase tracking-[0.4em] text-slate-500 hover:text-white transition-all">GitHub</a>
          </div>
          
          <p class="text-[8px] text-slate-800 font-black uppercase tracking-[0.6em] pt-12 italic">© 2026 SHEM ITOYA • ENGINEERED FOR SCALE</p>
        </div>
      </footer>
    </div>
  `,
  styles: [`
    :host { display: block; }
    html { scroll-behavior: smooth; }

    /* REVEAL SYSTEM FOR SCROLL ANIMATIONS */
    .reveal, .reveal-left, .reveal-right {
      opacity: 0;
      transition: all 1.2s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .reveal { transform: translateY(60px); }
    .reveal-left { transform: translateX(-60px); }
    .reveal-right { transform: translateX(60px); }
    
    /* Toggle active state based on intersection */
    .reveal.active, .reveal-left.active, .reveal-right.active {
      opacity: 1;
      transform: translate(0, 0);
    }

    /* REFINED ROLE SLIDE ANIMATION (Single Run) */
    @keyframes roleSlideOnce {
      0% { transform: translateY(20px); opacity: 0; }
      15% { transform: translateY(0); opacity: 1; }
      85% { transform: translateY(0); opacity: 1; }
      100% { transform: translateY(-20px); opacity: 0; }
    }

    .animate-role-slide {
      animation: roleSlideOnce 3.5s forwards cubic-bezier(0.23, 1, 0.32, 1);
    }

    /* STACK CARD CHAOS STYLING */
    .stack-card {
      transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
      will-change: transform;
    }

    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: #050505; }
    ::-webkit-scrollbar-thumb { background: #2563eb; border-radius: 10px; }
  `]
})
export class App implements AfterViewInit, OnInit {
  scrolled = signal(false);
  animating = signal(true);
  private el = inject(ElementRef);

  // Dynamic Roles
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

  techStack = signal([
    'Angular', 'Ionic', 'TypeScript', 'Flutter', 'Capacitor', 'GraphQL', 
    'Agile/Scrum', 'CI/CD', 'Git/GitHub', 'Figma', 'Node.js', 'Firebase'
  ]);

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

  ngAfterViewInit() {
    this.initScrollReveal();
  }

  private initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        // Updated logic: add class when entering, remove when leaving
        // This ensures the animation plays every time the user scrolls back to the element
        entry.target.classList.toggle('active', entry.isIntersecting);
      });
    }, { 
      threshold: 0.1,
      rootMargin: '-50px' // Slight margin to trigger early
    });

    const revealElements = this.el.nativeElement.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    revealElements.forEach((el: HTMLElement) => observer.observe(el));
  }

  // Playful interaction for the Tech Stack section
  messWithUser(event: MouseEvent) {
    const target = event.currentTarget as HTMLElement;
    
    // Generate random chaos metrics
    const x = (Math.random() - 0.5) * 60; // -30 to 30px
    const y = (Math.random() - 0.5) * 60; 
    const r = (Math.random() - 0.5) * 30; // -15 to 15deg
    const s = 0.8 + Math.random() * 0.4;  // 0.8 to 1.2 scale
    
    // Apply temporary chaos
    target.style.transform = `translate(${x}px, ${y}px) rotate(${r}deg) scale(${s})`;
    
    // Reset after a moment to let the user catch it
    setTimeout(() => {
      target.style.transform = '';
    }, 600);
  }
}