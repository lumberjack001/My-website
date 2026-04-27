import { Component, inject, computed, signal, AfterViewInit, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsService } from '../services/projects.service';
import { ProjectCardComponent } from '../components/project-card.component';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule, ProjectCardComponent],
  template: `
    <section class="min-h-screen py-32 px-6 w-full max-w-[100vw] overflow-x-hidden pt-40">
      <div class="max-w-7xl mx-auto">
        
        <!-- Header -->
        <div class="text-center mb-24 reveal-portfolio">
          <h2 class="text-xs font-black tracking-[0.4em] text-blue-500 uppercase mb-4">Selected Work</h2>
          <p class="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase leading-tight">Capabilities <br><span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-400">In Action.</span></p>
          <p class="mt-6 text-slate-400 max-w-xl mx-auto text-sm md:text-base">Explore a curated selection of products I've engineered, ranging from scalable web platforms to cross-platform mobile experiences.</p>
        </div>

        <!-- Filter Bar -->
        <div class="flex flex-wrap justify-center gap-4 mb-16 reveal-portfolio">
          <button 
            (click)="setFilter('All')"
            [class.bg-blue-700]="activeFilter() === 'All'"
            [class.text-white]="activeFilter() === 'All'"
            class="px-6 py-2 rounded-full border border-white/10 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-all bg-white/[0.02] hover:bg-white/[0.08]">
            All Projects
          </button>
          
          @for (cat of categories; track cat) {
            <button 
              (click)="setFilter(cat)"
              [class.bg-slate-700]="activeFilter() === cat"
              [class.text-white]="activeFilter() === cat"
              class="px-6 py-2 rounded-full border border-white/10 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-all bg-white/[0.02] hover:bg-white/[0.08]">
              {{ cat }}
            </button>
          }
        </div>

        @if (isLoading()) {
          <div class="flex justify-center items-center py-20 reveal-portfolio">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        }

        <!-- Bento Grid Projects -->
        @if (!isLoading()) {
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
            @for (project of filteredProjects(); track project.id) {
              
              <!-- GRID CELL: Dynamically breaks out into a full row span when expanded -->
              <div class="relative reveal-portfolio-stagger transition-all duration-700 self-start w-full"
                   [ngClass]="isExpanded(project.id) ? 'col-span-1 md:col-span-2 lg:col-span-3 bg-black/20 border border-blue-500/10 p-6 md:p-12 rounded-[3.5rem] shadow-2xl' : 'flex flex-col gap-6'">
                
                <div [ngClass]="isExpanded(project.id) ? 'flex flex-col lg:flex-row gap-12 lg:gap-[8rem] w-full items-center lg:items-center' : 'w-full'">
                   
                   <!-- Main Project (Left Side) -->
                   <div [ngClass]="isExpanded(project.id) ? 'w-full max-w-sm shrink-0 relative z-10' : 'w-full'">
                      <app-project-card 
                         [project]="project" 
                         [isSub]="false"
                         [isExpanded]="isExpanded(project.id)"
                         (toggle)="toggleSubProjects(project.id)"
                      ></app-project-card>
                      
                      <!-- Parent Trunk extending to the right -->
                      @if (isExpanded(project.id) && project.subProjects && project.subProjects.length > 0) {
                         <div class="hidden lg:block absolute top-[50%] right-[-4rem] w-[4rem] h-[2px] bg-slate-500/50 -translate-y-1/2"></div>
                      }
                   </div>

                   <!-- Expanded Sub-projects Network (Right Side) -->
                   @if (isExpanded(project.id)) {
                      <div class="flex flex-col justify-center gap-8 w-full relative animate-fade-in">
                         
                         @for (sub of project.subProjects; track sub.id; let isFirst = $first; let isLast = $last; let count = $count) {
                            <div class="relative w-full max-w-sm lg:w-full shrink-0">
                               
                               <!-- Vertical branch rail connecting kids -->
                               <div class="hidden lg:block flowchart-rail"
                                    [ngClass]="{
                                       'rail-first': isFirst && count > 1,
                                       'rail-last': isLast && count > 1,
                                       'rail-middle': !isFirst && !isLast,
                                       'rail-single': count === 1
                                    }"></div>

                               <!-- Horizontal branch hitting the child -->
                               <div class="hidden lg:block branch-horizontal"></div>
                               
                               <!-- Arrowhead -->
                               <div class="hidden lg:block branch-arrow"></div>
                               
                               <!-- Child Node -->
                               <app-project-card 
                                  [project]="sub" 
                                  [isSub]="true"
                               ></app-project-card>
                            </div>
                         }

                      </div>
                   }
                </div>
              </div>
            }
          </div>
        
          @if (filteredProjects().length === 0) {
            <div class="text-center py-20">
              <p class="text-slate-500 font-bold uppercase tracking-widest text-sm">No projects found for this filter.</p>
            </div>
          }
        }
      </div>
    </section>
  `,
  styles: [`
    :host { display: block; width: 100%; overflow-x: hidden; }

    /* REVEAL SYSTEM FOR PORTFOLIO */
    .reveal-portfolio {
      opacity: 0;
      transform: translateY(40px);
      transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
    }
    
    .reveal-portfolio-stagger {
      opacity: 0;
      transform: translateY(60px) scale(0.95);
      transition: all 1.2s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .reveal-portfolio.active, .reveal-portfolio-stagger.active {
      opacity: 1;
      transform: translate(0, 0) scale(1);
    }
    
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    .animate-fade-in {
      animation: fadeIn 0.4s ease-out forwards;
    }

    /* FLOWCHART RAIL SYSTEM */
    .flowchart-rail {
      position: absolute;
      left: -4rem; 
      width: 2px;
      background-color: rgba(100, 116, 139, 0.5); /* Matching slate-500/50 */
      pointer-events: none;
    }

    /* Flawlessly connects from the center of First child down into the 2rem gap */
    .rail-first {
      top: 50%;
      bottom: -1rem;
    }

    /* Flawlessly connects through the middle, spanning the gaps */
    .rail-middle {
      top: -1rem;
      bottom: -1rem;
    }

    /* Connects from the gap above into the center of the Last child */
    .rail-last {
      top: -1rem;
      bottom: 50%;
    }

    /* Hide the rail entirely if there's only 1 child being pointed to directly */
    .rail-single {
      display: none;
    }

    .branch-horizontal {
      position: absolute;
      top: 50%;
      left: -4rem;
      width: 3rem; /* Stays at 3rem to provide 1rem breathing air-gap to the card! */
      height: 2px;
      background-color: rgba(100, 116, 139, 0.5);
      transform: translateY(-50%);
      pointer-events: none;
    }

    .branch-arrow {
      position: absolute;
      top: 50%;
      left: -1rem;
      width: 0;
      height: 0;
      border-top: 5px solid transparent;
      border-bottom: 5px solid transparent;
      border-left: 6px solid rgba(100, 116, 139, 0.5);
      transform: translate(-1px, -50%);
      z-index: 10;
      pointer-events: none;
    }
  `]
})
export class PortfolioComponent implements AfterViewInit {
  private projectsService = inject(ProjectsService);
  private el = inject(ElementRef);

  projects = this.projectsService.projects;
  isLoading = this.projectsService.isLoading;

  activeFilter = signal<string>('All');
  expandedProjects = signal<Set<string>>(new Set());
  categories = ['Web', 'Mobile'];

  isExpanded(projectId: string): boolean {
    return this.expandedProjects().has(projectId);
  }

  toggleSubProjects(projectId: string) {
    const current = new Set(this.expandedProjects());
    if (current.has(projectId)) {
      current.delete(projectId);
    } else {
      current.add(projectId);
    }
    this.expandedProjects.set(current);
  }

  filteredProjects = computed(() => {
    const currentFilter = this.activeFilter();
    if (currentFilter === 'All') {
      return this.projects();
    }
    return this.projects().filter(p => p.category === currentFilter);
  });

  setFilter(filter: string) {
    this.activeFilter.set(filter);

    // Re-trigger stagger animation after filter
    setTimeout(() => {
      this.initScrollReveal();
    }, 50);
  }

  ngAfterViewInit() {
    this.initScrollReveal();
  }

  private initScrollReveal() {
    setTimeout(() => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          entry.target.classList.toggle('active', entry.isIntersecting);
        });
      }, {
        threshold: 0.1,
        rootMargin: '-20px'
      });

      const revealStaggerElements = this.el.nativeElement.querySelectorAll('.reveal-portfolio-stagger');
      revealStaggerElements.forEach((el: HTMLElement, index: number) => {
        // Add staggered transition delay based on index (up to a max so it doesn't wait forever)
        const delay = Math.min((index % 6) * 150, 600);
        el.style.transitionDelay = `${delay}ms`;
        observer.observe(el);
      });

      const revealElements = this.el.nativeElement.querySelectorAll('.reveal-portfolio');
      revealElements.forEach((el: HTMLElement) => observer.observe(el));
    }, 100);
  }
}
