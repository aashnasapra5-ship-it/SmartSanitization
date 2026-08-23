/* ========================================
   SmartSanitation — Mock Data
   ========================================

   Pre-seeded complaints so dashboards are not empty on first load.
   These represent fictional but realistic civic complaints.
   Statuses are distributed across all workflow stages.

   Evaluation Criteria: JavaScript objects, arrays, meaningful data
   ======================================== */

const mockComplaints = [
  {
    id: 'SS-1001',
    image: null,
    garbageType: 'Household Waste',
    description: 'Large pile of household garbage dumped near the park entrance. Bags are torn and waste is scattered across the pathway.',
    location: 'Sector 12, Near Central Park',
    city: 'Rajpura',
    address: 'Gate No. 3, Central Park Road',
    status: 'Pending',
    assignedEmployee: null,
    vehicle: null,
    createdAt: '2026-08-18T09:30:00',
    afterImage: null,
  },
  {
    id: 'SS-1002',
    image: null,
    garbageType: 'Plastic Waste',
    description: 'Plastic bottles and packaging waste overflowing from the community dustbin. The dustbin has not been emptied for several days.',
    location: 'Sector 7, Market Road',
    city: 'Rajpura',
    address: 'Near Gupta General Store',
    status: 'Verified',
    assignedEmployee: null,
    vehicle: null,
    createdAt: '2026-08-17T14:15:00',
    afterImage: null,
  },
  {
    id: 'SS-1003',
    image: null,
    garbageType: 'Construction Waste',
    description: 'Construction debris including broken bricks, cement bags, and metal rods left on the roadside after building renovation.',
    location: 'Sector 4, Main Boulevard',
    city: 'Rajpura',
    address: 'Opposite City Hospital',
    status: 'Assigned',
    assignedEmployee: 'Ravi Kumar',
    vehicle: 'VAN-02',
    createdAt: '2026-08-16T11:00:00',
    afterImage: null,
  },
  {
    id: 'SS-1004',
    image: null,
    garbageType: 'Food Waste',
    description: 'Rotting food waste from the weekly market. Strong smell is causing discomfort to nearby residents and shop owners.',
    location: 'Sector 9, Old Market Area',
    city: 'Rajpura',
    address: 'Behind Sabzi Mandi',
    status: 'Cleaning',
    assignedEmployee: 'Aman Singh',
    vehicle: 'VAN-01',
    createdAt: '2026-08-15T08:45:00',
    afterImage: null,
  },
  {
    id: 'SS-1005',
    image: null,
    garbageType: 'Mixed Waste',
    description: 'Mixed garbage including paper, plastic, and organic waste dumped in the vacant lot. Area has become a regular dumping spot.',
    location: 'Sector 2, Residential Colony',
    city: 'Rajpura',
    address: 'Near Block C, Sunrise Apartments',
    status: 'Resolved',
    assignedEmployee: 'Vikram Sharma',
    vehicle: 'VAN-03',
    createdAt: '2026-08-14T16:20:00',
    afterImage: null,
  },
  {
    id: 'SS-1006',
    image: null,
    garbageType: 'Household Waste',
    description: 'Multiple garbage bags left outside the community gate since morning. Stray animals have started tearing the bags.',
    location: 'Sector 15, Green Valley',
    city: 'Rajpura',
    address: 'Main Gate, Green Valley Society',
    status: 'Pending',
    assignedEmployee: null,
    vehicle: null,
    createdAt: '2026-08-19T07:10:00',
    afterImage: null,
  },
  {
    id: 'SS-1007',
    image: null,
    garbageType: 'Plastic Waste',
    description: 'Plastic waste accumulated around the bus stop area. Includes water bottles, food wrappers, and polythene bags.',
    location: 'Sector 5, Bus Stand Road',
    city: 'Rajpura',
    address: 'City Bus Terminal',
    status: 'Resolved',
    assignedEmployee: 'Rajesh Kumar',
    vehicle: 'VAN-04',
    createdAt: '2026-08-13T10:30:00',
    afterImage: null,
  },
  {
    id: 'SS-1008',
    image: null,
    garbageType: 'Other',
    description: 'Old furniture and broken electronics dumped near the drain. Blocking water flow and creating hygiene issues.',
    location: 'Sector 11, Industrial Area',
    city: 'Rajpura',
    address: 'Near Drain No. 4, Phase 2',
    status: 'Verified',
    assignedEmployee: null,
    vehicle: null,
    createdAt: '2026-08-18T13:00:00',
    afterImage: null,
  },
];

/* Mock Employees List */
const mockEmployees = [
  'Ravi Kumar',
  'Aman Singh',
  'Vikram Sharma',
  'Rajesh Kumar',
];

/* Mock Vehicles List */
const mockVehicles = [
  'VAN-01',
  'VAN-02',
  'VAN-03',
  'VAN-04',
];

export { mockComplaints, mockEmployees, mockVehicles };
