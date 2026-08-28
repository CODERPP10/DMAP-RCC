// DMAP's real certifications / compliance registrations (from the old
// certifications.csv / seed data). `icon` values are Font Awesome class names.

export interface Certification {
  id: string;
  name: string;
  icon: string;
}

export const certifications: Certification[] = [
  { id: "msme", name: "MSME Registered", icon: "fas fa-building" },
  { id: "gst", name: "GST Compliant", icon: "fas fa-certificate" },
  { id: "epf", name: "EPF for Technical Contractor Network", icon: "fas fa-hard-hat" },
  { id: "esic", name: "ESIC Licensed", icon: "fas fa-cogs" },
  { id: "safety", name: "Safety-focused Execution", icon: "fas fa-check-circle" },
  { id: "docs", name: "Full Documentation & Tax Invoice System", icon: "fas fa-file-invoice" },
];
