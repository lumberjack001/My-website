import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="py-32 px-6 border-t border-white/5 text-center bg-black w-full mt-auto relative z-10">
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
  `
})
export class FooterComponent {}
