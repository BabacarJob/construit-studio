import camera from "@/assets/eq-camera.jpg";
import lens from "@/assets/eq-lens.jpg";
import light from "@/assets/eq-light.jpg";
import audio from "@/assets/eq-audio.jpg";

export type Condition = "Excellent" | "Good" | "Fair" | "Damaged";
export type EquipmentStatus = "Available" | "Rented" | "Maintenance";
export type Category = "Camera" | "Lens" | "Stabilizer" | "Lighting" | "Audio";

export interface Equipment {
  id: string;
  name: string;
  ref: string;
  serial: string;
  category: Category;
  brand: string;
  model: string;
  description: string;
  value: number;
  condition: Condition;
  status: EquipmentStatus;
  accessories: string[];
  photos: string[];
  createdAt: string;
}

export interface Customer {
  id: string;
  type: "Company" | "Individual";
  name: string;
  company: string;
  email: string;
  phone: string;
  address: string;
  country: string;
  notes: string;
  createdAt: string;
}

export interface Damage {
  area: string;
  severity: "Minor" | "Moderate" | "Major";
  description: string;
}

export type InspectionStatus = "Draft" | "Completed" | "Pending return";

export interface Inspection {
  id: string;
  code: string;
  equipmentId: string;
  customerId: string;
  type: "Dispatch" | "Return";
  date: string;
  status: InspectionStatus;
  inspector: string;
  checklist: { label: string; ok: boolean }[];
  accessories: { name: string; present: boolean }[];
  notes: string;
  photos: string[];
  signatureCustomer?: string;
  signatureEmployee?: string;
  damages: Damage[];
  dispatchId?: string;
  condition: Condition;
}

export interface Report {
  id: string;
  code: string;
  inspectionId: string;
  date: string;
  status: "Ready" | "Sent" | "Archived";
}

export interface Member {
  id: string;
  name: string;
  email: string;
  role: "Owner" | "Admin" | "Inspector" | "Viewer";
  status: "Active" | "Invited" | "Deactivated";
  lastActive: string;
}

export interface Company {
  name: string;
  email: string;
  phone: string;
  address: string;
  country: string;
  timezone: string;
  language: string;
  logo?: string;
  requireSignature: boolean;
  requirePhotos: boolean;
  minPhotos: number;
  notifyReturns: boolean;
  notifyDamages: boolean;
  weeklyDigest: boolean;
  plan: "Free" | "Starter" | "Professional" | "Business";
}

export interface AppData {
  equipment: Equipment[];
  customers: Customer[];
  inspections: Inspection[];
  reports: Report[];
  team: Member[];
  company: Company;
}

export const categoryPhoto: Record<Category, string> = {
  Camera: camera,
  Lens: lens,
  Stabilizer: camera,
  Lighting: light,
  Audio: audio,
};

export const DEFAULT_CHECKLIST = [
  "Body / housing intact",
  "Power on & functional test",
  "Connectors and ports clean",
  "Glass / screens free of scratches",
  "Firmware & settings reset",
  "Case and packaging",
];

const d = (daysAgo: number) => new Date(Date.now() - daysAgo * 86400000).toISOString();

const eq = (
  i: number,
  name: string,
  category: Category,
  brand: string,
  model: string,
  value: number,
  condition: Condition,
  status: EquipmentStatus,
  accessories: string[],
): Equipment => ({
  id: `eq-${i}`,
  name,
  ref: `RP-${category.slice(0, 3).toUpperCase()}-${String(100 + i)}`,
  serial: `${brand.slice(0, 2).toUpperCase()}${(784512 + i * 1373).toString()}`,
  category,
  brand,
  model,
  description: `${name} maintained by the in-house technical team. Demo record.`,
  value,
  condition,
  status,
  accessories,
  photos: [categoryPhoto[category]],
  createdAt: d(200 - i * 7),
});

const seedEquipment: Equipment[] = [
  eq(1, "Sony FX6 Cinema Camera", "Camera", "Sony", "ILME-FX6", 6299, "Excellent", "Rented", ["2× BP-U70 battery", "Charger", "XLR handle", "CFexpress 160GB"]),
  eq(2, "Canon EOS R5", "Camera", "Canon", "EOS R5", 3899, "Good", "Rented", ["2× LP-E6NH battery", "Charger", "Strap"]),
  eq(3, "Sony FE 24-70mm f/2.8 GM II", "Lens", "Sony", "SEL2470GM2", 2299, "Excellent", "Rented", ["Front & rear caps", "Lens hood", "Pouch"]),
  eq(4, "DJI Ronin RS3 Pro", "Stabilizer", "DJI", "RS3 Pro", 869, "Good", "Available", ["Quick release plate", "Tripod", "USB-C cable"]),
  eq(5, "Aputure LS 600d Pro", "Lighting", "Aputure", "LS 600d Pro", 1890, "Good", "Rented", ["Control box", "Reflector", "Power cable", "Carry case"]),
  eq(6, "Shure SM7B Microphone", "Audio", "Shure", "SM7B", 399, "Excellent", "Available", ["Windscreen", "Close-talk windscreen"]),
  eq(7, "Yamaha MG10XU Mixer", "Audio", "Yamaha", "MG10XU", 279, "Fair", "Maintenance", ["Power adapter", "USB cable"]),
  eq(8, "Aputure Amaran F22c LED Panel", "Lighting", "Aputure", "F22c", 849, "Good", "Available", ["Softbox", "Grid", "Yoke"]),
  eq(9, "Sony FX3 Cinema Camera", "Camera", "Sony", "ILME-FX3", 3899, "Good", "Available", ["2× NP-FZ100", "XLR top handle"]),
  eq(10, "Canon RF 70-200mm f/2.8L", "Lens", "Canon", "RF70-200 F2.8", 2799, "Damaged", "Maintenance", ["Caps", "Hood", "Tripod collar"]),
  eq(11, "DJI Ronin RS3", "Stabilizer", "DJI", "RS3", 549, "Good", "Available", ["Phone holder", "Tripod"]),
  eq(12, "Godox LED Panel Kit (3×)", "Lighting", "Godox", "LEDP260C", 459, "Fair", "Available", ["3× stand", "Batteries", "Bag"]),
  eq(13, "Sennheiser MKE 600", "Audio", "Sennheiser", "MKE 600", 329, "Excellent", "Available", ["Foam windscreen", "Shock mount"]),
  eq(14, "Sony FE 35mm f/1.4 GM", "Lens", "Sony", "SEL35F14GM", 1399, "Excellent", "Rented", ["Caps", "Hood"]),
  eq(15, "Zoom F6 Field Recorder", "Audio", "Zoom", "F6", 649, "Good", "Available", ["AA battery sled", "SD card"]),
];

const cu = (
  i: number,
  type: Customer["type"],
  name: string,
  company: string,
  country: string,
  city: string,
): Customer => ({
  id: `cu-${i}`,
  type,
  name,
  company,
  email: `${name.split(" ")[0].toLowerCase()}@${(company || name).toLowerCase().replace(/[^a-z]/g, "")}.example`,
  phone: `+1 555 01${String(10 + i)}`,
  address: `${12 + i * 3} Harbor Street, ${city}`,
  country,
  notes: i % 3 === 0 ? "Frequent weekend rentals. Prefers pickup before 9am." : "",
  createdAt: d(300 - i * 20),
});

const seedCustomers: Customer[] = [
  cu(1, "Company", "Maya Chen", "Northlight Films", "United States", "Los Angeles"),
  cu(2, "Company", "Lucas Martin", "Studio Brume", "France", "Lyon"),
  cu(3, "Individual", "Ava Thompson", "", "United Kingdom", "Bristol"),
  cu(4, "Company", "Diego Alvarez", "Faro Productions", "Spain", "Valencia"),
  cu(5, "Company", "Sofia Rossi", "Lumen Events", "Italy", "Milan"),
  cu(6, "Individual", "Noah Williams", "", "Canada", "Toronto"),
  cu(7, "Company", "Hannah Becker", "Kreis Media GmbH", "Germany", "Hamburg"),
  cu(8, "Company", "Kenji Sato", "Blue Harbor Studio", "United States", "Seattle"),
  cu(9, "Individual", "Leila Haddad", "", "France", "Marseille"),
  cu(10, "Company", "Oliver Brooks", "Brightframe Agency", "Australia", "Melbourne"),
];

const checklistAll = (fail?: number) =>
  DEFAULT_CHECKLIST.map((label, i) => ({ label, ok: i !== fail }));
const accs = (e: Equipment, missing?: number) =>
  e.accessories.map((name, i) => ({ name, present: i !== missing }));

const SIG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='300' height='100'><path d='M20 70 C 50 20, 70 90, 100 50 S 150 30, 170 60 S 230 80, 280 40' stroke='%2314243A' stroke-width='3' fill='none' stroke-linecap='round'/></svg>`,
  ).replace(/%252314243A/, "%2314243A");

const ins = (
  n: number,
  eqIdx: number,
  cuIdx: number,
  type: Inspection["type"],
  daysAgo: number,
  status: InspectionStatus,
  inspector: string,
  extra: Partial<Inspection> = {},
): Inspection => {
  const e = seedEquipment[eqIdx - 1];
  return {
    id: `in-${n}`,
    code: `INS-${1000 + n}`,
    equipmentId: e.id,
    customerId: `cu-${cuIdx}`,
    type,
    date: d(daysAgo),
    status,
    inspector,
    checklist: checklistAll(),
    accessories: accs(e),
    notes: type === "Dispatch" ? "All items checked with customer present." : "Returned on time.",
    photos: [e.photos[0], e.photos[0]],
    signatureCustomer: status === "Draft" ? undefined : SIG,
    signatureEmployee: status === "Draft" ? undefined : SIG,
    damages: [],
    condition: e.condition === "Damaged" ? "Good" : e.condition,
    ...extra,
  };
};

const seedInspections: Inspection[] = [
  // Completed dispatch + return pairs (5)
  ins(1, 10, 4, "Dispatch", 40, "Completed", "James Carter", { condition: "Excellent" }),
  ins(2, 10, 4, "Return", 33, "Completed", "Priya Nair", {
    dispatchId: "in-1",
    condition: "Damaged",
    checklist: checklistAll(3),
    damages: [{ area: "Front element", severity: "Major", description: "Deep scratch across the front glass, visible in footage." }],
    notes: "Customer acknowledged damage at return counter.",
  }),
  ins(3, 7, 5, "Dispatch", 28, "Completed", "James Carter"),
  ins(4, 7, 5, "Return", 22, "Completed", "James Carter", {
    dispatchId: "in-3",
    condition: "Fair",
    damages: [{ area: "Fader 4", severity: "Minor", description: "Fader cap missing and slightly stiff." }],
    accessories: accs(seedEquipment[6], 1),
  }),
  ins(5, 4, 2, "Dispatch", 20, "Completed", "Priya Nair"),
  ins(6, 4, 2, "Return", 15, "Completed", "Priya Nair", { dispatchId: "in-5" }),
  ins(7, 12, 7, "Dispatch", 14, "Completed", "Elena Moreau"),
  ins(8, 12, 7, "Return", 9, "Completed", "Elena Moreau", {
    dispatchId: "in-7",
    condition: "Fair",
    damages: [{ area: "Panel #2 diffuser", severity: "Moderate", description: "Cracked diffuser on second panel." }],
  }),
  ins(9, 6, 9, "Dispatch", 12, "Completed", "James Carter"),
  ins(10, 6, 9, "Return", 6, "Completed", "Priya Nair", { dispatchId: "in-9" }),
  // Active rentals, pending return
  ins(11, 1, 1, "Dispatch", 3, "Pending return", "James Carter"),
  ins(12, 2, 8, "Dispatch", 2, "Pending return", "Priya Nair"),
  ins(13, 3, 1, "Dispatch", 3, "Pending return", "James Carter"),
  ins(14, 5, 10, "Dispatch", 1, "Pending return", "Elena Moreau"),
  ins(15, 14, 3, "Dispatch", 0, "Draft", "Elena Moreau"),
];

const seedReports: Report[] = [
  ["in-2", 33, "Sent"],
  ["in-4", 22, "Sent"],
  ["in-6", 15, "Archived"],
  ["in-8", 9, "Sent"],
  ["in-10", 6, "Ready"],
  ["in-11", 3, "Ready"],
  ["in-12", 2, "Ready"],
  ["in-14", 1, "Ready"],
].map(([inspectionId, days, status], i) => ({
  id: `rp-${i + 1}`,
  code: `RPT-${2400 + i + 1}`,
  inspectionId: inspectionId as string,
  date: d(days as number),
  status: status as Report["status"],
}));

const seedTeam: Member[] = [
  { id: "tm-1", name: "James Carter", email: "james@harborrentals.example", role: "Owner", status: "Active", lastActive: d(0) },
  { id: "tm-2", name: "Priya Nair", email: "priya@harborrentals.example", role: "Inspector", status: "Active", lastActive: d(1) },
  { id: "tm-3", name: "Elena Moreau", email: "elena@harborrentals.example", role: "Admin", status: "Active", lastActive: d(2) },
];

export const seedData = (): AppData => ({
  equipment: seedEquipment.map((e) => ({ ...e })),
  customers: seedCustomers.map((c) => ({ ...c })),
  inspections: seedInspections.map((i) => ({ ...i })),
  reports: seedReports.map((r) => ({ ...r })),
  team: seedTeam.map((m) => ({ ...m })),
  company: {
    name: "Harbor Rentals (Demo)",
    email: "hello@harborrentals.example",
    phone: "+1 555 0100",
    address: "200 Pier Avenue, San Diego, CA",
    country: "United States",
    timezone: "America/Los_Angeles",
    language: "English",
    requireSignature: true,
    requirePhotos: true,
    minPhotos: 2,
    notifyReturns: true,
    notifyDamages: true,
    weeklyDigest: false,
    plan: "Professional",
  },
});

export const PLANS = [
  { name: "Free", monthly: 0, desc: "For trying RentalProof on a few items.", features: ["10 equipment items", "20 inspections / month", "1 user", "PDF reports"], limits: { equipment: 10, inspections: 20, users: 1 } },
  { name: "Starter", monthly: 19, desc: "For small rental shops getting organized.", features: ["100 equipment items", "200 inspections / month", "3 users", "Digital signatures"], limits: { equipment: 100, inspections: 200, users: 3 } },
  { name: "Professional", monthly: 49, desc: "For growing teams with daily rentals.", features: ["500 equipment items", "Unlimited inspections", "10 users", "Before/after comparison", "Custom branding"], limits: { equipment: 500, inspections: Infinity, users: 10 } },
  { name: "Business", monthly: 99, desc: "For multi-location rental operations.", features: ["Unlimited equipment", "Unlimited inspections", "Unlimited users", "Priority support", "Advanced roles"], limits: { equipment: Infinity, inspections: Infinity, users: Infinity } },
] as const;

export const yearlyPrice = (monthly: number) => Math.round(monthly * 12 * 0.8);
