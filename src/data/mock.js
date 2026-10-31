// Fake data for the demo. A real backend replaces this later.
export const users = [
  { role: 'admin', email: 'admin@yolonest.com', password: 'admin123', name: 'Owner' },
  { role: 'staff', email: 'staff@yolonest.com', password: 'staff123', name: 'Front Desk' },
  { role: 'guest', email: 'guest@yolonest.com', password: 'guest123', name: 'Rohan Patil' },
]

export const guests = [
  { id: 1, name: 'Rohan Patil', room: '101', bed: 'A', phone: '9800000001', rent: 7500, status: 'Paid', docs: true },
  { id: 2, name: 'Aman Verma', room: '101', bed: 'B', phone: '9800000002', rent: 7500, status: 'Due', docs: false },
  { id: 3, name: 'Sahil Khan', room: '102', bed: 'A', phone: '9800000003', rent: 6500, status: 'Due', docs: true },
  { id: 4, name: 'Neeraj Joshi', room: '102', bed: 'C', phone: '9800000004', rent: 6500, status: 'Paid', docs: true },
]

export const expenses = [
  { id: 1, item: 'Electricity', amount: 18500 },
  { id: 2, item: 'Wi-Fi', amount: 2500 },
  { id: 3, item: 'Housekeeping', amount: 12000 },
  { id: 4, item: 'Gym maintenance', amount: 3000 },
]

export const bedsLayout = { '101': ['A', 'B'], '102': ['A', 'B', 'C'], '103': ['A', 'B'] }
