import { Injectable, signal } from '@angular/core';
import { Project } from '../models/project.model';
// import { createClient, SupabaseClient } from '@supabase/supabase-js';
// import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  // Signals for state management
  projects = signal<Project[]>([]);
  isLoading = signal<boolean>(false);
  error = signal<string | null>(null);

  // SUPABASE IMPLEMENTATION (COMMENTED OUT FOR NOW)
  // private supabase: SupabaseClient;

  constructor() {
    // SUPABASE SETUP (COMMENTED OUT)
    /*
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseAnonKey
    );
    this.fetchProjectsFromSupabase();
    */

    // DUMMY IMPLEMENTATION (ACTIVE)
    this.fetchDummyProjects();
  }

  // --- MOCK DATA IMPLEMENTATION ---
  private fetchDummyProjects() {
    this.isLoading.set(true);

    // Simulate network delay
    setTimeout(() => {
      const dummyData: Project[] = [
        {
          id: '1',
          created_at: new Date().toISOString(),
          title: 'Shoptreo Platform MVP',
          slug: 'shoptreo-platform',
          short_description: 'A comprehensive multi-tenant inventory & e-commerce platform built to streamline merchant operations.',
          content: 'Led the engineering team to build this MVP from scratch within 6 months, achieving 99.9% uptime. It features real-time inventory management, payment processing, and analytics dashboards.',
          cover_image_url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=1000',
          technologies: ['Angular', 'Node.js', 'PostgreSQL', 'TailwindCSS'],
          live_url: '#',
          github_url: null,
          featured: true,
          order_index: 0
        },
        {
          id: '2',
          created_at: new Date().toISOString(),
          title: 'Robex Field Service App',
          slug: 'robex-field-app',
          short_description: 'Cross-platform mobile application for field service technicians, improving resolution times via offline-first tracking.',
          content: 'Built using Ionic & Angular, this app allows technicians to clock in, photograph issues, and submit reports offline. Synced automatically via GraphQL upon reconnection.',
          cover_image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000',
          technologies: ['Ionic', 'Angular', 'Capacitor', 'GraphQL'],
          live_url: null,
          github_url: '#',
          featured: true,
          order_index: 1
        },
        {
          id: '3',
          created_at: new Date().toISOString(),
          title: 'Zumera Property Portal',
          slug: 'zumera-property',
          short_description: 'A real estate listing directory and CRM tailored for premium client interactions.',
          content: 'Engineered the frontend listing directory with advanced filtering (SSR and dynamic routing). Engaged with stakeholders to increase client satisfaction by 70%.',
          cover_image_url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1000',
          technologies: ['Angular', 'Figma', 'TypeScript'],
          live_url: '#',
          github_url: null,
          featured: false,
          order_index: 2
        },
        {
          id: '4',
          created_at: new Date().toISOString(),
          title: 'myPaddi Redesign',
          slug: 'mypaddi-redesign',
          short_description: 'Revamped UI/UX for a prominent health-tech platform aiming to improve user engagement metrics.',
          content: 'Translated Figma prototypes into a modern responsive layout using Angular. Achieved a 25% bump in time-on-site metrics.',
          cover_image_url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1000',
          technologies: ['Angular', 'SCSS', 'Figma'],
          live_url: '#',
          github_url: null,
          featured: false,
          order_index: 3
        },
        {
          id: '1-1',
          created_at: new Date().toISOString(),
          title: 'Shoptreo Admin Portal',
          slug: 'shoptreo-admin',
          short_description: 'An internal dashboard for merchant configuration and platform oversight.',
          content: 'Developed a robust admin interface using Angular Material and advanced data tables to help internal teams monitor high-volume merchant transactions in real-time.',
          cover_image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000',
          technologies: ['Angular', 'RxJS', 'Material'],
          live_url: null,
          github_url: null,
          featured: false,
          order_index: 0,
          parent_id: '1'
        },
        {
          id: '1-2',
          created_at: new Date().toISOString(),
          title: 'Shoptreo Mobile App',
          slug: 'shoptreo-mobile',
          short_description: 'A native companion app for merchants on the go.',
          content: 'Led the mobile initiative with Ionic, enabling merchants to scan inventory barcodes, receive instant push notifications for orders, and monitor daily revenue streams from their phones.',
          cover_image_url: 'https://images.unsplash.com/photo-1526498460520-4c246339dccb?auto=format&fit=crop&q=80&w=1000',
          technologies: ['Ionic', 'Angular', 'Capacitor'],
          live_url: null,
          github_url: '#',
          featured: false,
          order_index: 1,
          parent_id: '1'
        }
      ];

      // Build tree structure
      const projectMap = new Map<string, Project>();
      const topLevelProjects: Project[] = [];

      // First pass: initialize map
      dummyData.forEach(p => {
        p.subProjects = [];
        projectMap.set(p.id, p);
      });

      // Second pass: nest children
      dummyData.forEach(p => {
        if (p.parent_id) {
          const parent = projectMap.get(p.parent_id);
          if (parent) {
            parent.subProjects?.push(p);
          }
        } else {
          topLevelProjects.push(p);
        }
      });

      this.projects.set(topLevelProjects);
      this.isLoading.set(false);
    }, 800);
  }

  // --- ACTUAL SUPABASE IMPLEMENTATION (COMMENTED OUT) ---
  /*
  private async fetchProjectsFromSupabase() {
    try {
      this.isLoading.set(true);
      const { data, error } = await this.supabase
        .from('projects')
        .select('*')
        .order('order_index', { ascending: true });

      if (error) throw error;
      
      if (data) {
        this.projects.set(data as Project[]);
      }
    } catch (e: any) {
      console.error('Error fetching projects:', e.message);
      this.error.set(e.message);
    } finally {
      this.isLoading.set(false);
    }
  }

  async getProjectBySlug(slug: string): Promise<Project | null> {
    try {
      const { data, error } = await this.supabase
        .from('projects')
        .select('*')
        .eq('slug', slug)
        .single();
        
      if (error) throw error;
      return data as Project;
    } catch (e) {
      console.error('Error fetching project:', e);
      return null;
    }
  }
  */
}
