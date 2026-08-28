// Canonical project list. Titles and one-line summaries are DMAP's real
// projects (from the old attached_assets/projects.json). completion / client /
// full descriptions / images are placeholders — replace with the real content
// JSON when it arrives.

export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  imageUrl: string;
  completion: string;
  location: string;
  services: string[];
  client: string;
}

const IMG = [
  "https://images.unsplash.com/photo-1503708928676-1cb796a0891e?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1542621334-a254cf47733d?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1590333748338-d629e4564ad9?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1508450859948-4e04fabaa4ea?auto=format&fit=crop&w=1200&q=80",
];

export const ongoingProjects: Project[] = [
  {
    id: "jawadwala-pan-india",
    title: "Jawadwala Construction Projects – PAN India",
    shortDescription:
      "Civil and structural retrofitting and restoration across multiple sites.",
    fullDescription:
      "Ongoing programme of civil and structural retrofitting and restoration works delivered across multiple locations for Jawadwala Construction.",
    imageUrl: IMG[0],
    completion: "Ongoing",
    location: "PAN India",
    services: ["Structural Strengthening", "Restoration", "Civil Works"],
    client: "Jawadwala Construction",
  },
  {
    id: "invera-testing-inspection-lab",
    title: "Invera Testing & Inspection Lab Pvt. Ltd.",
    shortDescription: "Advanced structural strengthening works.",
    fullDescription:
      "Advanced structural strengthening of laboratory facilities to support upgraded equipment loads and continued operation.",
    imageUrl: IMG[1],
    completion: "Ongoing",
    location: "Maharashtra, India",
    services: ["RCC Jacketing & Structural Strengthening"],
    client: "Invera Testing & Inspection Lab Pvt. Ltd.",
  },
];

export const completedProjects: Project[] = [
  {
    id: "mtnl-te-cuffe-parade",
    title: "MTNL TE Building – Cuffe Parade, Mumbai",
    shortDescription:
      "Structural strengthening of beams and columns for service continuity.",
    fullDescription:
      "Strengthening of beams and columns in the telephone exchange building to restore capacity and ensure uninterrupted service.",
    imageUrl: IMG[0],
    completion: "Completed",
    location: "Cuffe Parade, Mumbai",
    services: ["RCC Jacketing & Structural Strengthening"],
    client: "MTNL",
  },
  {
    id: "mtnl-te-vashi-turbhe",
    title: "MTNL TE Buildings – Vashi & Turbhe, Navi Mumbai",
    shortDescription:
      "External repairs, stairwell upgrades, and structural retrofitting of telecom buildings.",
    fullDescription:
      "External repairs, stairwell upgrades and structural retrofitting across two telephone exchange buildings in Navi Mumbai.",
    imageUrl: IMG[1],
    completion: "Completed",
    location: "Vashi & Turbhe, Navi Mumbai",
    services: ["Concrete Crack Injection & Repairs", "Structural Strengthening"],
    client: "MTNL",
  },
  {
    id: "mtnl-te-fort",
    title: "MTNL TE Building – Fort, Mumbai",
    shortDescription:
      "Floor slab restoration, fountain structure repairs, and RCC enhancement using fiber wrapping.",
    fullDescription:
      "Floor slab restoration, repairs to the fountain structure and RCC enhancement using carbon fibre wrapping at the Fort exchange.",
    imageUrl: IMG[2],
    completion: "Completed",
    location: "Fort, Mumbai",
    services: ["Concrete Crack Injection & Repairs", "Seismic Retrofitting"],
    client: "MTNL",
  },
  {
    id: "acharya-atre-chs",
    title: "Acharya Atre CHS, Navi Mumbai",
    shortDescription: "Seismic retrofitting and structural works.",
    fullDescription:
      "Seismic retrofitting and associated structural works for a co-operative housing society in Navi Mumbai.",
    imageUrl: IMG[3],
    completion: "Completed",
    location: "Navi Mumbai",
    services: ["Seismic Retrofitting"],
    client: "Acharya Atre CHS",
  },
  {
    id: "meteorological-centre-colaba",
    title: "Meteorological Centre – Colaba, Mumbai",
    shortDescription: "Terrace waterproofing and structural protection.",
    fullDescription:
      "Terrace waterproofing and structural protection works at the Colaba meteorological centre.",
    imageUrl: IMG[4],
    completion: "Completed",
    location: "Colaba, Mumbai",
    services: ["Waterproofing Solutions"],
    client: "India Meteorological Department",
  },
  {
    id: "deepak-builder-nashik",
    title: "Deepak Builder Project – Nashik",
    shortDescription: "Column strengthening and concrete rehabilitation.",
    fullDescription:
      "Column strengthening and concrete rehabilitation for a builder project in Nashik.",
    imageUrl: IMG[0],
    completion: "Completed",
    location: "Nashik",
    services: ["RCC Jacketing & Structural Strengthening"],
    client: "Deepak Builder",
  },
  {
    id: "goodway-chemicals-sarigram",
    title: "Goodway Chemicals – Sarigram, Umbergaon, Gujarat",
    shortDescription: "Composite structural wrapping and enhancement.",
    fullDescription:
      "Composite (carbon fibre) structural wrapping and enhancement of industrial structures at the Sarigram plant.",
    imageUrl: IMG[1],
    completion: "Completed",
    location: "Sarigram, Umbergaon, Gujarat",
    services: ["Seismic Retrofitting", "Structural Steel Fabrication"],
    client: "Goodway Chemicals",
  },
  {
    id: "jawadwala-restoration",
    title: "Jawadwala Construction Projects – Restoration Works",
    shortDescription: "Civil and structural retrofitting and restoration.",
    fullDescription:
      "Completed civil and structural retrofitting and restoration packages for Jawadwala Construction.",
    imageUrl: IMG[2],
    completion: "Completed",
    location: "Maharashtra, India",
    services: ["Restoration", "Civil Works"],
    client: "Jawadwala Construction",
  },
  {
    id: "shreejee-plaza",
    title: "ShreeJee Plaza – Siddharth Enterprises",
    shortDescription: "Composite carbon fibre wrapping.",
    fullDescription:
      "Composite carbon fibre wrapping of structural members at ShreeJee Plaza for Siddharth Enterprises.",
    imageUrl: IMG[3],
    completion: "Completed",
    location: "Maharashtra, India",
    services: ["Seismic Retrofitting"],
    client: "Siddharth Enterprises",
  },
];
