// dummyData.js
export const dummySubscribers = [
  {
    id: 1,
    email: "john.doe@example.com",
    createdAt: "2024-01-15T08:30:00Z"
  },
  {
    id: 2,
    email: "jane.smith@example.com",
    createdAt: "2024-01-16T09:45:00Z"
  },
  {
    id: 3,
    email: "alice.johnson@example.com",
    createdAt: "2024-01-17T10:20:00Z"
  },
  {
    id: 4,
    email: "bob.williams@example.com",
    createdAt: "2024-01-18T11:15:00Z"
  },
  {
    id: 5,
    email: "charlie.brown@example.com",
    createdAt: "2024-01-19T12:30:00Z"
  },
  {
    id: 6,
    email: "diana.davis@example.com",
    createdAt: "2024-01-20T13:45:00Z"
  },
  {
    id: 7,
    email: "edward.miller@example.com",
    createdAt: "2024-01-21T14:20:00Z"
  },
  {
    id: 8,
    email: "fiona.wilson@example.com",
    createdAt: "2024-01-22T15:10:00Z"
  },
  {
    id: 9,
    email: "george.moore@example.com",
    createdAt: "2024-01-23T16:25:00Z"
  },
  {
    id: 10,
    email: "helen.taylor@example.com",
    createdAt: "2024-01-24T17:40:00Z"
  },
  {
    id: 11,
    email: "ivan.anderson@example.com",
    createdAt: "2024-01-25T18:55:00Z"
  },
  {
    id: 12,
    email: "julia.thomas@example.com",
    createdAt: "2024-01-26T19:20:00Z"
  },
  {
    id: 13,
    email: "kevin.jackson@example.com",
    createdAt: "2024-01-27T20:35:00Z"
  },
  {
    id: 14,
    email: "laura.white@example.com",
    createdAt: "2024-01-28T21:50:00Z"
  },
  {
    id: 15,
    email: "michael.harris@example.com",
    createdAt: "2024-01-29T22:15:00Z"
  },
  {
    id: 16,
    email: "nancy.martin@example.com",
    createdAt: "2024-01-30T08:40:00Z"
  },
  {
    id: 17,
    email: "oliver.garcia@example.com",
    createdAt: "2024-01-31T09:55:00Z"
  },
  {
    id: 18,
    email: "petra.rodriguez@example.com",
    createdAt: "2024-02-01T10:30:00Z"
  },
  {
    id: 19,
    email: "quincy.lewis@example.com",
    createdAt: "2024-02-02T11:45:00Z"
  },
  {
    id: 20,
    email: "rachel.lee@example.com",
    createdAt: "2024-02-03T12:20:00Z"
  },
  {
    id: 21,
    email: "samuel.walker@example.com",
    createdAt: "2024-02-04T13:35:00Z"
  },
  {
    id: 22,
    email: "tina.hall@example.com",
    createdAt: "2024-02-05T14:50:00Z"
  },
  {
    id: 23,
    email: "ursula.allen@example.com",
    createdAt: "2024-02-06T15:25:00Z"
  },
  {
    id: 24,
    email: "victor.young@example.com",
    createdAt: "2024-02-07T16:40:00Z"
  },
  {
    id: 25,
    email: "wendy.king@example.com",
    createdAt: "2024-02-08T17:55:00Z"
  }
  
];

// Helper function to simulate API delay
export const simulateApiDelay = (ms = 500) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// Function to get paginated subscribers
export const getPaginatedSubscribers = (page = 1, limit = 10) => {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedData = dummySubscribers.slice(startIndex, endIndex);
  
  return {
    subscribers: paginatedData,
    pagination: {
      total: dummySubscribers.length,
      totalPages: Math.ceil(dummySubscribers.length / limit),
      page: page,
      limit: limit
    }
  };
};

// Function to simulate sending newsletter
export const sendNewsletterSimulation = async (subject, content) => {
  await simulateApiDelay(1000); // Simulate API call delay
  
  // Simulate success/failure (you can modify this logic)
  const success = Math.random() > 0.1; // 90% success rate
  
  if (success) {
    return { success: true, message: "Newsletter sent successfully!" };
  } else {
    throw new Error("Failed to send newsletter");
  }
};