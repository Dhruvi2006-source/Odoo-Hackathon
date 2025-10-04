export const mockExpenses = [
  {
    id: 1,
    amount: 100,
    currency: 'USD',
    category: 'Travel',
    description: 'Flight to conference',
    date: '2024-01-15',
    status: 'approved',
    approvedBy: 'Manager Name'
  },
  {
    id: 2,
    amount: 50,
    currency: 'EUR',
    category: 'Meals',
    description: 'Team lunch',
    date: '2024-01-14',
    status: 'pending',
    approvedBy: null
  },
  {
    id: 3,
    amount: 200,
    currency: 'GBP',
    category: 'Equipment',
    description: 'New monitor',
    date: '2024-01-10',
    status: 'rejected',
    approvedBy: 'Finance Dept',
    comments: 'Requires prior approval for equipment over £150'
  }
];

export const mockNotifications = [
  {
    id: 1,
    type: 'approval',
    message: '3 expenses awaiting your approval',
    timestamp: '2024-01-15 10:30',
    read: false
  },
  {
    id: 2,
    type: 'system',
    message: 'Currency rates updated today',
    timestamp: '2024-01-15 09:15',
    read: true
  },
  {
    id: 3,
    type: 'success',
    message: 'Your receipt was auto-scanned successfully',
    timestamp: '2024-01-14 16:45',
    read: true
  }
];

export const mockPendingApprovals = [
  {
    id: 101,
    employeeName: 'Alice Johnson',
    amount: 75,
    currency: 'USD',
    category: 'Meals',
    description: 'Client dinner',
    date: '2024-01-14',
    submittedDate: '2024-01-15'
  },
  {
    id: 102,
    employeeName: 'Bob Smith',
    amount: 300,
    currency: 'EUR',
    category: 'Travel',
    description: 'Hotel accommodation',
    date: '2024-01-13',
    submittedDate: '2024-01-14'
  }
];