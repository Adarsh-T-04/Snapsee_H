export type Role = 'SUPERADMIN' | 'ADMIN' | 'MANAGER' | 'TEAM_MEMBER';

export type EnquiryStatus = 
  | 'NEW'
  | 'CONTACTED'
  | 'MEETING_SCHEDULED'
  | 'PROPOSAL_SENT'
  | 'NEGOTIATION'
  | 'CONVERTED'
  | 'REJECTED';

export type ClientStatus = 'ONBOARDING' | 'ACTIVE' | 'PAUSED' | 'COMPLETED';

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  icon: string;
  badge?: string;
  benefits: string[];
  deliverables: string[];
  process: { step: number; title: string; desc: string }[];
  displayOrder: number;
  isActive: boolean;
}

export interface PricingPlanItem {
  id: string;
  name: string;
  slug: string;
  price: number;
  billingCycle: string;
  tagline: string;
  targetAudience: string;
  isPopular: boolean;
  displayOrder: number;
  isActive: boolean;
  features: {
    id?: string;
    featureText: string;
    isIncluded: boolean;
  }[];
}

export interface ProjectMetric {
  metric: string;
  label: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  slug: string;
  clientName: string;
  category: string;
  objective: string;
  creativeWork: string;
  resultsMetrics: ProjectMetric[];
  caseStudy?: string;
  imageUrl: string;
  isFeatured: boolean;
  isDemo: boolean;
  displayOrder: number;
}

export interface TestimonialItem {
  id: string;
  clientName: string;
  designation: string;
  company: string;
  avatarUrl?: string;
  rating: number;
  feedback: string;
  resultsTag?: string;
  isFeatured: boolean;
  displayOrder: number;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'General' | 'Pricing' | 'Services' | 'Onboarding' | 'Ad Spend';
  displayOrder: number;
  isActive: boolean;
}

export interface InternalNoteItem {
  id: string;
  enquiryId: string;
  authorName: string;
  content: string;
  createdAt: string;
}

export interface EnquiryItem {
  id: string;
  fullName: string;
  businessName: string;
  email: string;
  phone: string;
  websiteUrl?: string;
  industry: string;
  servicesRequired: string[];
  interestedPlan?: string;
  monthlyBudget: string;
  projectDetails: string;
  preferredContact: 'whatsapp' | 'email' | 'phone';
  status: EnquiryStatus;
  assignedToId?: string;
  assignedToName?: string;
  leadSource: string;
  createdAt: string;
  updatedAt: string;
  notes?: InternalNoteItem[];
}

export interface ClientItem {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  website?: string;
  packageName: string;
  monthlyRetainer: number;
  status: ClientStatus;
  joinedAt: string;
  notes?: string;
}

export interface DashboardStats {
  totalEnquiries: number;
  newEnquiries: number;
  convertedClients: number;
  conversionRate: string;
  monthlyRevenue: number;
  activeProjects: number;
  recentEnquiries: EnquiryItem[];
  leadSourceBreakdown: { source: string; count: number }[];
  statusBreakdown: { status: EnquiryStatus; count: number }[];
}

