export interface BioInterface {
  name: string;
  tagline: string;
  domain: string;
  phone: string;
  email: string;
  github: string;
  twitter: string;
  linkedin: string;
  objective: string;
  summary: string[];
  education: string[];
  dob: string;
  skills: string[];
}

export interface PositionInterface {
  id: string;
  title: string;
  company: string;
  startDate: string;
  endDate?: string;
  location: string;
  achievements: string[];
}
