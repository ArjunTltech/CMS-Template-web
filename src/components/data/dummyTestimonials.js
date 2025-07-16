// dummyData.js
export const testimonialsDummyData = [
  {
    id: 1,
    text: "This product has completely transformed our business operations. The intuitive interface and powerful features have made our team more productive than ever before. I would highly recommend this to any organization looking to streamline their workflow.",
    author: "John Smith",
    position: "CEO at TechCorp",
    rating: 5,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 2,
    text: "Outstanding customer service and exceptional product quality. The support team was incredibly responsive and helped us implement the solution seamlessly. Our efficiency has increased by over 40% since we started using this platform.",
    author: "Sarah Johnson",
    position: "Operations Manager at InnovateTech",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108755-2616b9e0f471?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 3,
    text: "The learning curve was minimal and the results were immediate. What impressed me most was how well the system integrated with our existing tools. It's rare to find a solution that delivers on all its promises.",
    author: "Michael Davis",
    position: "Project Manager at Digital Solutions",
    rating: 4,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 4,
    text: "Excellent value for money and fantastic features. The reporting capabilities have given us insights we never had before. The team loves using it and adoption was surprisingly smooth across all departments.",
    author: "Emily Wilson",
    position: "Marketing Director at CreativeCorp",
    rating: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 5,
    text: "Great product with reliable performance. The automation features have saved us countless hours of manual work. Customer support is responsive and knowledgeable whenever we need assistance.",
    author: "Robert Brown",
    position: "IT Director at SystemsPlus",
    rating: 4,
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 6,
    text: "User-friendly interface and powerful functionality. The onboarding process was smooth and the training materials were comprehensive. Our team was up and running in no time.",
    author: "Lisa Anderson",
    position: "HR Manager at People First",
    rating: 5,
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 7,
    text: "Solid performance and great customer support. The platform has helped us standardize our processes and improve collaboration across teams. Regular updates keep adding valuable new features.",
    author: "David Thompson",
    position: "Operations Lead at Efficiency Inc",
    rating: 4,
    image: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 8,
    text: "This solution exceeded our expectations in every way. The integration capabilities are outstanding and the performance is rock solid. It's become an essential part of our daily operations.",
    author: "Jennifer Garcia",
    position: "CTO at FutureTech",
    rating: 5,
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face"
  }
];

// Default image for new testimonials
export const defaultTestimonialImage = "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=150&h=150&fit=crop&crop=face";

// Function to generate next ID
export const generateNextId = (testimonials) => {
  return testimonials.length > 0 ? Math.max(...testimonials.map(t => t.id)) + 1 : 1;
};