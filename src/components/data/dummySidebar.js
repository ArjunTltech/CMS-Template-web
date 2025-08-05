

export const sidebarCounts = {
    enquiries: 10,
    notifications: 8,
    blogs: 6,
    cases: 6,
    carrers: 5,
    services: 4,
    users: 2,
    faqs: 5,
    testimonials: 8,
    newsletters: 25,
    clients: 85,
    socialMedia: 5,
    team: 4
};

export const dummyStats = {
    totalViews: 125000,
    totalUsers: 1450,
    totalRevenue: 85000,
    conversionRate: 3.2,
    bounceRate: 42.5,
    avgSessionDuration: '2m 45s'
};

export const dummyNotifications = [
    {
        id: 1,
        type: 'enquiry',
        message: 'New enquiry from John Doe',
        timestamp: '2024-08-05T10:30:00Z',
        read: false
    },
    {
        id: 2,
        type: 'enquiry',
        message: 'New enquiry from Alex Johnson',
        timestamp: '2024-08-11T10:30:00Z',
        read: false
    },
    {
        id: 3,
        type: 'user',
        message: 'New user registration: jane.smith@email.com',
        timestamp: '2024-08-05T08:45:00Z',
        read: true
    }
];

export const dummyEnquiries = [
    {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@email.com',
        subject: 'Web Development Inquiry',
        message: 'I need a website for my business...',
        status: 'unread',
        createdAt: '2024-08-05T10:30:00Z'
    },
    {
        id: 2,
        name: 'Jane Smith',
        email: 'jane.smith@email.com',
        subject: 'SEO Services',
        message: 'Looking for SEO optimization...',
        status: 'read',
        createdAt: '2024-08-05T09:15:00Z'
    }
];

export const mockAuthState = {
    isAuthenticated: true,
    // <=== change to 'admin' to see admin menu items ===>
    role: 'superadmin',
    user: {
        id: 1,
        name: 'Superadmin',
        email: 'superadmin@gmail.com'
    }
};

export const simulateApiDelay = (data, delay = 500) => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(data), delay);
    });
};