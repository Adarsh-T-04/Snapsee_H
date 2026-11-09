import { prisma } from "./prisma";
import { 
  initialServices, 
  initialPricingPlans, 
  initialProjects, 
  initialTestimonials, 
  initialFAQs, 
  initialEnquiries, 
  initialClients 
} from "./data-store";
import { 
  ServiceItem, 
  PricingPlanItem, 
  ProjectItem, 
  TestimonialItem, 
  FAQItem, 
  EnquiryItem, 
  ClientItem, 
  DashboardStats,
  EnquiryStatus 
} from "@/types";

// In-memory persistent caches for zero-configuration resilience
let servicesCache: ServiceItem[] = [...initialServices];
let pricingCache: PricingPlanItem[] = [...initialPricingPlans];
let projectsCache: ProjectItem[] = [...initialProjects];
let testimonialsCache: TestimonialItem[] = [...initialTestimonials];
let faqsCache: FAQItem[] = [...initialFAQs];
let enquiriesCache: EnquiryItem[] = [...initialEnquiries];
let clientsCache: ClientItem[] = [...initialClients];

export const dbService = {
  // Services
  async getServices(): Promise<ServiceItem[]> {
    try {
      const records = await prisma.service.findMany({
        where: { isActive: true },
        orderBy: { displayOrder: "asc" },
      });
      if (records && records.length > 0) {
        return records.map(r => ({
          ...r,
          badge: r.badge || undefined,
          benefits: JSON.parse(r.benefits || "[]"),
          deliverables: JSON.parse(r.deliverables || "[]"),
          process: JSON.parse(r.process || "[]"),
        }));
      }
    } catch {
      // Fallback to cache
    }
    return servicesCache.filter(s => s.isActive).sort((a, b) => a.displayOrder - b.displayOrder);
  },

  async getAllServices(): Promise<ServiceItem[]> {
    return servicesCache;
  },

  async updateService(id: string, data: Partial<ServiceItem>): Promise<ServiceItem> {
    const idx = servicesCache.findIndex(s => s.id === id);
    if (idx !== -1) {
      servicesCache[idx] = { ...servicesCache[idx], ...data };
      return servicesCache[idx];
    }
    throw new Error("Service not found");
  },

  // Pricing Plans
  async getPricingPlans(): Promise<PricingPlanItem[]> {
    try {
      const records = await prisma.pricingPlan.findMany({
        where: { isActive: true },
        include: { features: { orderBy: { displayOrder: "asc" } } },
        orderBy: { displayOrder: "asc" },
      });
      if (records && records.length > 0) {
        return records as unknown as PricingPlanItem[];
      }
    } catch {
      // Fallback
    }
    return pricingCache.filter(p => p.isActive).sort((a, b) => a.displayOrder - b.displayOrder);
  },

  async updatePricingPlan(id: string, data: Partial<PricingPlanItem>): Promise<PricingPlanItem> {
    const idx = pricingCache.findIndex(p => p.id === id);
    if (idx !== -1) {
      pricingCache[idx] = { ...pricingCache[idx], ...data };
      return pricingCache[idx];
    }
    throw new Error("Plan not found");
  },

  // Projects
  async getProjects(): Promise<ProjectItem[]> {
    try {
      const records = await prisma.project.findMany({
        orderBy: { displayOrder: "asc" },
      });
      if (records && records.length > 0) {
        return records.map(p => ({
          ...p,
          caseStudy: p.caseStudy || undefined,
          resultsMetrics: JSON.parse(p.resultsMetrics || "[]"),
        }));
      }
    } catch {
      // Fallback
    }
    return projectsCache.sort((a, b) => a.displayOrder - b.displayOrder);
  },

  async createProject(project: Omit<ProjectItem, "id">): Promise<ProjectItem> {
    const newProj: ProjectItem = {
      ...project,
      id: `proj-${Date.now()}`,
    };
    projectsCache.unshift(newProj);
    return newProj;
  },

  async updateProject(id: string, data: Partial<ProjectItem>): Promise<ProjectItem> {
    const idx = projectsCache.findIndex(p => p.id === id);
    if (idx !== -1) {
      projectsCache[idx] = { ...projectsCache[idx], ...data };
      return projectsCache[idx];
    }
    throw new Error("Project not found");
  },

  async deleteProject(id: string): Promise<boolean> {
    projectsCache = projectsCache.filter(p => p.id !== id);
    return true;
  },

  // Testimonials
  async getTestimonials(): Promise<TestimonialItem[]> {
    try {
      const records = await prisma.testimonial.findMany({
        where: { isFeatured: true },
        orderBy: { displayOrder: "asc" },
      });
      if (records && records.length > 0) {
        return records as unknown as TestimonialItem[];
      }
    } catch {
      // Fallback
    }
    return testimonialsCache.sort((a, b) => a.displayOrder - b.displayOrder);
  },

  // FAQs
  async getFAQs(): Promise<FAQItem[]> {
    try {
      const records = await prisma.fAQ.findMany({
        where: { isActive: true },
        orderBy: { displayOrder: "asc" },
      });
      if (records && records.length > 0) {
        return records as unknown as FAQItem[];
      }
    } catch {
      // Fallback
    }
    return faqsCache.filter(f => f.isActive).sort((a, b) => a.displayOrder - b.displayOrder);
  },

  // Enquiries
  async getEnquiries(filter?: { status?: string; search?: string }): Promise<EnquiryItem[]> {
    let result = [...enquiriesCache];
    if (filter?.status && filter.status !== "ALL") {
      result = result.filter(e => e.status === filter.status);
    }
    if (filter?.search) {
      const q = filter.search.toLowerCase();
      result = result.filter(e => 
        e.fullName.toLowerCase().includes(q) ||
        e.businessName.toLowerCase().includes(q) ||
        e.email.toLowerCase().includes(q) ||
        e.id.toLowerCase().includes(q)
      );
    }
    return result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  async getEnquiryById(id: string): Promise<EnquiryItem | null> {
    const found = enquiriesCache.find(e => e.id === id);
    return found || null;
  },

  async createEnquiry(data: Omit<EnquiryItem, "id" | "status" | "createdAt" | "updatedAt" | "notes">): Promise<EnquiryItem> {
    const counter = 1000 + enquiriesCache.length + 1;
    const year = new Date().getFullYear();
    const id = `ENQ-${year}-${counter}`;

    const newEnquiry: EnquiryItem = {
      ...data,
      id,
      status: "NEW",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      notes: [],
    };

    enquiriesCache.unshift(newEnquiry);

    // Also attempt async write to Prisma
    try {
      await prisma.enquiry.create({
        data: {
          id: newEnquiry.id,
          fullName: newEnquiry.fullName,
          businessName: newEnquiry.businessName,
          email: newEnquiry.email,
          phone: newEnquiry.phone,
          websiteUrl: newEnquiry.websiteUrl,
          industry: newEnquiry.industry,
          servicesRequired: JSON.stringify(newEnquiry.servicesRequired),
          interestedPlan: newEnquiry.interestedPlan,
          monthlyBudget: newEnquiry.monthlyBudget,
          projectDetails: newEnquiry.projectDetails,
          preferredContact: newEnquiry.preferredContact,
          status: "NEW",
          leadSource: newEnquiry.leadSource || "Website Direct",
        }
      });
    } catch {
      // Handled gracefully
    }

    return newEnquiry;
  },

  async updateEnquiryStatus(id: string, status: EnquiryStatus, assignedToName?: string): Promise<EnquiryItem> {
    const idx = enquiriesCache.findIndex(e => e.id === id);
    if (idx === -1) throw new Error("Enquiry not found");

    enquiriesCache[idx] = {
      ...enquiriesCache[idx],
      status,
      assignedToName: assignedToName || enquiriesCache[idx].assignedToName,
      updatedAt: new Date().toISOString(),
    };

    return enquiriesCache[idx];
  },

  async addEnquiryNote(enquiryId: string, authorName: string, content: string) {
    const idx = enquiriesCache.findIndex(e => e.id === enquiryId);
    if (idx === -1) throw new Error("Enquiry not found");

    const newNote = {
      id: `note-${Date.now()}`,
      enquiryId,
      authorName,
      content,
      createdAt: new Date().toISOString(),
    };

    if (!enquiriesCache[idx].notes) {
      enquiriesCache[idx].notes = [];
    }
    enquiriesCache[idx].notes!.push(newNote);
    return newNote;
  },

  async deleteEnquiry(id: string): Promise<boolean> {
    enquiriesCache = enquiriesCache.filter(e => e.id !== id);
    return true;
  },

  // Clients
  async getClients(): Promise<ClientItem[]> {
    return clientsCache.sort((a, b) => new Date(b.joinedAt).getTime() - new Date(a.joinedAt).getTime());
  },

  async createClient(client: Omit<ClientItem, "id" | "joinedAt">): Promise<ClientItem> {
    const newClient: ClientItem = {
      ...client,
      id: `cli-${Date.now()}`,
      joinedAt: new Date().toISOString(),
    };
    clientsCache.unshift(newClient);
    return newClient;
  },

  async updateClient(id: string, data: Partial<ClientItem>): Promise<ClientItem> {
    const idx = clientsCache.findIndex(c => c.id === id);
    if (idx !== -1) {
      clientsCache[idx] = { ...clientsCache[idx], ...data };
      return clientsCache[idx];
    }
    throw new Error("Client not found");
  },

  // Dashboard Overview Metrics
  async getDashboardStats(): Promise<DashboardStats> {
    const total = enquiriesCache.length;
    const newCount = enquiriesCache.filter(e => e.status === "NEW").length;
    const converted = enquiriesCache.filter(e => e.status === "CONVERTED").length;
    const convRate = total > 0 ? ((converted / total) * 100).toFixed(1) + "%" : "0%";

    const monthlyRev = clientsCache
      .filter(c => c.status === "ACTIVE")
      .reduce((acc, c) => acc + c.monthlyRetainer, 0);

    // Grouping by source
    const sourceMap: Record<string, number> = {};
    enquiriesCache.forEach(e => {
      sourceMap[e.leadSource] = (sourceMap[e.leadSource] || 0) + 1;
    });

    // Grouping by status
    const statusMap: Record<EnquiryStatus, number> = {
      NEW: 0,
      CONTACTED: 0,
      MEETING_SCHEDULED: 0,
      PROPOSAL_SENT: 0,
      NEGOTIATION: 0,
      CONVERTED: 0,
      REJECTED: 0,
    };
    enquiriesCache.forEach(e => {
      statusMap[e.status] = (statusMap[e.status] || 0) + 1;
    });

    return {
      totalEnquiries: total,
      newEnquiries: newCount,
      convertedClients: converted,
      conversionRate: convRate,
      monthlyRevenue: monthlyRev,
      activeProjects: clientsCache.filter(c => c.status === "ACTIVE").length + 2,
      recentEnquiries: enquiriesCache.slice(0, 5),
      leadSourceBreakdown: Object.entries(sourceMap).map(([source, count]) => ({ source, count })),
      statusBreakdown: Object.entries(statusMap).map(([status, count]) => ({ status: status as EnquiryStatus, count })),
    };
  }
};

