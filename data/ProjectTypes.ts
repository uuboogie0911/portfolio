export interface Project {
  id: string;
  title: string;
  description: string;
  problem: string;
  goal?: string;
  flow?: {
    before: string;
    after: string;
  };
  keyDecisions?: string[];
  solution: string;
  results: string;
  technologies: string[];
  period: string;
  developmentPeriod?: string;
  teamSize?: string;
  role: string;
  image?: string;
  links?: {
    github?: string;
    demo?: string;
    website?: string;
  };
  deliverables?: {
    category: string;
    name: string;
    image: string;
  }[];
}

