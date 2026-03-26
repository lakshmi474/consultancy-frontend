export const mockMedicines = [
  {
    id: 'MED-001',
    name: 'Paracetamol 500mg',
    category: 'Pain Relief',
    brand: 'HealWell',
    price: 80,
    stock: 120,
    prescriptionRequired: false,
    description: 'Effective pain reliever and fever reducer.',
    composition: 'Paracetamol 500mg',
    sideEffects: 'Nausea, allergic reactions in rare cases',
    available: true,
  },
  {
    id: 'MED-002',
    name: 'Amoxicillin 625mg',
    category: 'Antibiotics',
    brand: 'PharmaCare',
    price: 220,
    stock: 28,
    prescriptionRequired: true,
    description: 'Broad spectrum antibiotic for bacterial infections.',
    composition: 'Amoxicillin 500mg + Clavulanic Acid 125mg',
    sideEffects: 'Diarrhea, rash, dizziness',
    available: true,
  },
  {
    id: 'MED-003',
    name: 'Cetirizine 10mg',
    category: 'Allergy',
    brand: 'AllerFree',
    price: 65,
    stock: 12,
    prescriptionRequired: false,
    description: 'Relieves allergy symptoms like sneezing and itching.',
    composition: 'Cetirizine 10mg',
    sideEffects: 'Drowsiness, dry mouth',
    available: true,
  },
  {
    id: 'MED-004',
    name: 'Atorvastatin 20mg',
    category: 'Cardiac',
    brand: 'CardioPlus',
    price: 180,
    stock: 6,
    prescriptionRequired: true,
    description: 'Reduces cholesterol and helps prevent heart disease.',
    composition: 'Atorvastatin Calcium 20mg',
    sideEffects: 'Muscle pain, digestive issues',
    available: true,
  },
  {
    id: 'MED-005',
    name: 'ORS Hydration Salts',
    category: 'Wellness',
    brand: 'HydraLife',
    price: 35,
    stock: 80,
    prescriptionRequired: false,
    description: 'Replenishes electrolytes and prevents dehydration.',
    composition: 'Sodium chloride, potassium chloride, glucose',
    sideEffects: 'Bloating in rare cases',
    available: true,
  },
];

export const mockCategories = [
  { id: 'CAT-1', name: 'Pain Relief', products: 14 },
  { id: 'CAT-2', name: 'Antibiotics', products: 9 },
  { id: 'CAT-3', name: 'Allergy', products: 6 },
  { id: 'CAT-4', name: 'Cardiac', products: 11 },
  { id: 'CAT-5', name: 'Wellness', products: 17 },
];

export const mockOrders = [
  {
    orderId: 'ORD-2025-001',
    customer: 'Aarav Sharma',
    amount: 1560,
    paymentStatus: 'Paid',
    status: 'Placed',
    date: '2026-01-18',
    items: 4,
  },
  {
    orderId: 'ORD-2025-002',
    customer: 'Priya Patel',
    amount: 870,
    paymentStatus: 'Pending',
    status: 'Packed',
    date: '2026-01-19',
    items: 2,
  },
  {
    orderId: 'ORD-2025-003',
    customer: 'Rohan Mehta',
    amount: 2450,
    paymentStatus: 'Paid',
    status: 'Shipped',
    date: '2026-01-18',
    items: 6,
  },
  {
    orderId: 'ORD-2025-004',
    customer: 'Sneha Nair',
    amount: 1290,
    paymentStatus: 'Paid',
    status: 'Delivered',
    date: '2026-01-17',
    items: 3,
  },
  {
    orderId: 'ORD-2025-005',
    customer: 'Vikram Singh',
    amount: 610,
    paymentStatus: 'Refunded',
    status: 'Cancelled',
    date: '2026-01-15',
    items: 1,
  },
];

export const mockPrescriptions = [
  {
    id: 'RX-001',
    user: 'Kriti Verma',
    uploadedAt: '2026-01-18T09:30:00Z',
    status: 'Pending',
    linkedOrder: null,
  },
  {
    id: 'RX-002',
    user: 'Aarav Sharma',
    uploadedAt: '2026-01-17T14:15:00Z',
    status: 'Approved',
    linkedOrder: 'ORD-2025-001',
  },
  {
    id: 'RX-003',
    user: 'Rohit Gupta',
    uploadedAt: '2026-01-16T18:45:00Z',
    status: 'Rejected',
    linkedOrder: null,
  },
];

export const mockUsers = [
  {
    id: 'USR-001',
    name: 'Aarav Sharma',
    email: 'aarav@example.com',
    totalOrders: 12,
    blocked: false,
  },
  {
    id: 'USR-002',
    name: 'Priya Patel',
    email: 'priya@example.com',
    totalOrders: 4,
    blocked: false,
  },
  {
    id: 'USR-003',
    name: 'Rohan Mehta',
    email: 'rohan@example.com',
    totalOrders: 7,
    blocked: true,
  },
];

export const mockCoupons = [
  { code: 'WELCOME10', discount: 10, expiry: '2026-03-31', active: true },
  { code: 'WINTER15', discount: 15, expiry: '2026-02-15', active: false },
];

export const mockReports = {
  ordersToday: 42,
  revenueToday: 48200,
  revenueMonth: 914000,
  bestSellers: [
    { name: 'Paracetamol 500mg', units: 180 },
    { name: 'Cetirizine 10mg', units: 155 },
    { name: 'ORS Hydration Salts', units: 122 },
  ],
};
