export interface Project {
  id: string;
  created_at: string;
  title: string;
  slug: string;
  short_description: string;
  content: string;
  cover_image_url: string;
  technologies: string[];
  live_url: string | null;
  github_url: string | null;
  featured: boolean;
  order_index: number;
  parent_id?: string | null;
  subProjects?: Project[];
}
