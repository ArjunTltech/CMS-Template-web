const dummyNotifications = [
  {
    subject: 'Welcome!',
    message: 'Thanks for joining the platform.',
    createdAt: new Date().toISOString(),
    isRead: false,
  },
  {
    subject: 'System Update',
    message: 'System will be under maintenance at 11:00 PM.',
    createdAt: new Date(Date.now() - 1000 * 60 * 10).toISOString(), // 10 mins ago
    isRead: false,
  },
  {
    subject: 'New Feature',
    message: 'Check out the new dashboard layout!',
    createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(), // 1 hour ago
    isRead: true,
  },
  {
    subject: 'Alert',
    message: 'Unusual login detected from a new device.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    isRead: false,
  },
  {
    subject: 'Reminder',
    message: 'Don’t forget to update your profile.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(), // 3 days ago
    isRead: true,
  }
];

export default dummyNotifications;
