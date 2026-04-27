import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from '../models/project.model';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="group relative bg-white/[0.02] border border-white/5 rounded-[2.5rem] overflow-hidden hover:bg-white/[0.04] hover:border-blue-500/30 transition-all duration-500 hover:-translate-y-2 flex flex-col h-full w-full">
      
      <!-- Project Image -->
      <div class="relative w-full h-64 overflow-hidden border-b border-white/5">
        <div class="absolute inset-0 bg-blue-600/20 mix-blend-overlay z-10 group-hover:opacity-0 transition-opacity duration-500"></div>
        <img [src]="project.cover_image_url" [alt]="project.title" class="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700">
        
        @if (project.featured) {
          <div class="absolute top-4 right-4 z-20 px-3 py-1 bg-black/50 backdrop-blur-md border border-white/10 rounded-full text-[9px] font-black uppercase tracking-widest text-blue-400">
            Featured
          </div>
        }
      </div>

      <!-- Project Content -->
      <div class="p-8 flex flex-col flex-grow">
        <h3 class="text-2xl font-black text-white tracking-tight uppercase group-hover:text-blue-400 transition-colors break-words">{{ project.title }}</h3>
        <p class="text-slate-400 mt-4 text-sm leading-relaxed max-w-full break-words line-clamp-3 mb-6">{{ project.short_description }}</p>
        
        <div class="mt-auto pt-6 border-t border-white/5">
          <div class="flex flex-wrap gap-2 mb-6">
            @for (tech of project.technologies; track tech) {
              <span class="px-3 py-1 bg-white/[0.03] border border-white/5 rounded-full text-[9px] font-black uppercase text-slate-500 tracking-widest">{{ tech }}</span>
            }
          </div>

          <div class="flex items-center gap-4">
            @if (project.live_url) {
              <a [href]="project.live_url" target="_blank" class="w-10 h-10 rounded-full bg-blue-600/20 text-blue-500 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all hover:scale-110 active:scale-95" title="View Live">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
              </a>
            }
            
            @if (project.github_url) {
              <a [href]="project.github_url" target="_blank" class="w-10 h-10 rounded-full bg-white/5 text-slate-400 flex items-center justify-center hover:bg-white/10 hover:text-white transition-all hover:scale-110 active:scale-95" title="View Source">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
              </a>
            }
          </div>
        </div>
      </div>

      <!-- Sub-projects Toggle Footer -->
      @if (!isSub && project.subProjects && project.subProjects.length > 0) {
        <button (click)="toggle.emit()" class="w-full py-4 mt-auto bg-white/[0.03] hover:bg-white/10 border-t border-white/5 text-[10px] font-black text-slate-400 hover:text-white transition-colors uppercase tracking-[0.2em] flex items-center justify-center gap-3">
          <span>{{ isExpanded ? 'Hide' : 'View' }} Related Projects ({{project.subProjects.length}})</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="transition-transform duration-300" [class.rotate-180]="isExpanded"><polyline points="6 9 12 15 18 9"></polyline></svg>
        </button>
      }
    </div>
  `
})
export class ProjectCardComponent {
  @Input() project!: Project;
  @Input() isSub = false;
  @Input() isExpanded = false;
  
  @Output() toggle = new EventEmitter<void>();
}
