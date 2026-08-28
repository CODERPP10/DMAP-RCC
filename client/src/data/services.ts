// Canonical service list. Names are DMAP's real services (from the old
// attached_assets/services.json). shortDescription / fullDescription / benefits
// are placeholder copy — replace with the real content JSON when it arrives.

export interface Service {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  imageUrl: string;
  benefits: string[];
}

const IMG = {
  structural:
    "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80",
  seismic:
    "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=1200&q=80",
  concrete:
    "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=80",
  water:
    "https://images.unsplash.com/photo-1590333748338-d629e4564ad9?auto=format&fit=crop&w=1200&q=80",
  steel:
    "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80",
  civil:
    "https://images.unsplash.com/photo-1503708928676-1cb796a0891e?auto=format&fit=crop&w=1200&q=80",
  infra:
    "https://images.unsplash.com/photo-1542621334-a254cf47733d?auto=format&fit=crop&w=1200&q=80",
  consult:
    "https://images.unsplash.com/photo-1507208773393-40d9fc670acf?auto=format&fit=crop&w=1200&q=80",
};

export const services: Service[] = [
  {
    id: "seismic-retrofitting",
    title: "Seismic Retrofitting",
    shortDescription:
      "Strengthening existing structures to withstand seismic loads and meet current safety codes.",
    fullDescription:
      "We assess a structure's response to earthquake forces and implement targeted reinforcement — jacketing, bracing, fibre wrapping and connection upgrades — to improve ductility and load paths while keeping the building in use.",
    imageUrl: IMG.seismic,
    benefits: [
      "Improved life safety during seismic events",
      "Compliance with current IS codes",
      "Minimal disruption to occupants",
      "Extended service life of the structure",
    ],
  },
  {
    id: "rcc-jacketing-strengthening",
    title: "RCC Jacketing & Structural Strengthening",
    shortDescription:
      "Reinforced concrete jacketing of beams, columns and slabs to restore and increase load capacity.",
    fullDescription:
      "Deteriorated or under-strength members are enlarged with additional reinforcement and high-grade concrete or micro-concrete, bonded to the existing section to act compositely and carry higher design loads.",
    imageUrl: IMG.structural,
    benefits: [
      "Restored and increased load capacity",
      "Arrests further deterioration",
      "Cost-effective vs. reconstruction",
      "Proven, code-recognised technique",
    ],
  },
  {
    id: "concrete-crack-injection-repairs",
    title: "Concrete Crack Injection & Repairs",
    shortDescription:
      "Epoxy and polyurethane injection plus patch repairs to seal cracks and stop water ingress.",
    fullDescription:
      "Structural cracks are pressure-injected with epoxy to restore monolithic behaviour; non-structural and active cracks are treated with flexible polyurethane. Spalled cover is reinstated with polymer-modified repair mortars.",
    imageUrl: IMG.concrete,
    benefits: [
      "Restores structural continuity",
      "Stops corrosion-driving water ingress",
      "Fast, low-impact application",
      "Long-term durability",
    ],
  },
  {
    id: "waterproofing-solutions",
    title: "Waterproofing Solutions",
    shortDescription:
      "Terrace, basement, wet-area and facade waterproofing systems for lasting protection.",
    fullDescription:
      "We specify and apply membrane, crystalline and coating-based systems matched to the exposure — terraces, sunken slabs, water tanks, retaining walls and external facades — with detailing at joints and penetrations.",
    imageUrl: IMG.water,
    benefits: [
      "Protects reinforcement from corrosion",
      "Prevents leakage and dampness",
      "System matched to each exposure",
      "Warranty-backed application",
    ],
  },
  {
    id: "structural-steel-fabrication",
    title: "Structural Steel Fabrication",
    shortDescription:
      "Design, fabrication and erection of structural steel for new works and strengthening.",
    fullDescription:
      "Fabricated steel framing, platforms, staircases and strengthening elements are produced to drawing and welded/bolted on site, with surface protection suited to the environment.",
    imageUrl: IMG.steel,
    benefits: [
      "Fast on-site erection",
      "High strength-to-weight ratio",
      "Shop-quality fabrication",
      "Adaptable to tight site conditions",
    ],
  },
  {
    id: "civil-works",
    title: "Residential, Commercial & Industrial Civil Works",
    shortDescription:
      "General civil construction and renovation across residential, commercial and industrial projects.",
    fullDescription:
      "From structural shells and RCC works to finishes and services coordination, we deliver civil packages for buildings and plants with a focus on quality control and programme certainty.",
    imageUrl: IMG.civil,
    benefits: [
      "Single accountable contractor",
      "Documented quality control",
      "Programme and cost certainty",
      "Experienced technical supervision",
    ],
  },
  {
    id: "infrastructure-project-execution",
    title: "Infrastructure Project Execution",
    shortDescription:
      "Execution of infrastructure and utility-structure works for public and private clients.",
    fullDescription:
      "We execute infrastructure scopes — utility structures, ancillary buildings, repairs and upgrades — with the compliance, documentation and safety systems expected on government and institutional contracts.",
    imageUrl: IMG.infra,
    benefits: [
      "Compliance-ready documentation",
      "Safety-focused execution",
      "Coordination with authorities",
      "Reliable delivery",
    ],
  },
  {
    id: "technical-consultation-supervision",
    title: "On-site Technical Consultation & Supervision",
    shortDescription:
      "Condition assessment, repair methodology and on-site supervision by experienced engineers.",
    fullDescription:
      "We provide structural condition surveys, non-destructive testing interpretation, repair specifications and full-time or periodic site supervision to ensure work is executed to specification.",
    imageUrl: IMG.consult,
    benefits: [
      "Independent technical assurance",
      "Clear repair methodology",
      "Quality verified on site",
      "Reduced rework and risk",
    ],
  },
];
