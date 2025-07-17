// dummyUserData.js
export const dummyUsers = [
  {
    id: 1,
    name: "Super Admin",
    email: "superadmin@example.com",
    role: "superadmin"
  },
  {
    id: 2,
    name: "Admin",
    email: "admin1@example.com",
    role: "admin"
  },

];

// Function to generate next ID
export const getNextId = (users) => {
  if (users.length === 0) return 1;
  return Math.max(...users.map(user => user.id)) + 1;
};

// Function to simulate API delay
export const simulateApiDelay = (ms = 1000) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};