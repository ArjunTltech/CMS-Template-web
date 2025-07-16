
export const dummyBlogs = [
  {
    id: 1,
    title: "Getting Started with React Hooks",
    author: "John Doe",
    date: "2024-01-15",
    excerpt: "Learn the fundamentals of React Hooks and how they can transform your functional components. This comprehensive guide covers useState, useEffect, and custom hooks with practical examples.",
    content: `<p>React Hooks have revolutionized the way we write React components. In this comprehensive guide, we'll explore the most commonly used hooks and how they can enhance your development workflow.</p>
    
    <h2>What are React Hooks?</h2>
    <p>React Hooks are functions that let you "hook into" React state and lifecycle features from functional components. They were introduced in React 16.8 and have become the standard way to write React components.</p>
    
    <h3>useState Hook</h3>
    <p>The useState hook allows you to add state to functional components. It returns an array with two elements: the current state value and a function to update it.</p>
    
    <h3>useEffect Hook</h3>
    <p>The useEffect hook lets you perform side effects in functional components. It serves the same purpose as componentDidMount, componentDidUpdate, and componentWillUnmount combined in React class components.</p>
    
    <h2>Best Practices</h2>
    <p>When working with hooks, it's important to follow the rules of hooks and consider performance implications. Always use hooks at the top level of your React function.</p>
    
    <p>React Hooks provide a more direct API to the React concepts you already know. They offer a powerful way to reuse stateful logic between components without changing your component hierarchy.</p>`,
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop"
  },
  {
    id: 2,
    title: "Modern JavaScript ES6+ Features",
    author: "Jane Smith",
    date: "2024-01-20",
    excerpt: "Discover the latest JavaScript features that will make your code cleaner, more efficient, and easier to maintain. From arrow functions to async/await, explore ES6+ capabilities.",
    content: `<p>JavaScript has evolved significantly over the years, introducing powerful features that make development more enjoyable and productive. Let's explore some of the most important ES6+ features.</p>
    
    <h2>Arrow Functions</h2>
    <p>Arrow functions provide a more concise way to write function expressions. They also lexically bind the 'this' value, making them particularly useful in certain contexts.</p>
    
    <h3>Template Literals</h3>
    <p>Template literals allow you to embed expressions inside string literals, making string interpolation much cleaner and more readable.</p>
    
    <h3>Destructuring Assignment</h3>
    <p>Destructuring allows you to extract values from arrays or properties from objects into distinct variables, making your code more concise and readable.</p>
    
    <h2>Async/Await</h2>
    <p>Async/await syntax makes it easier to work with promises and write asynchronous code that looks and behaves more like synchronous code.</p>
    
    <h3>Modules</h3>
    <p>ES6 modules provide a standardized way to organize and share code between files, making your applications more modular and maintainable.</p>
    
    <p>These features represent just the tip of the iceberg. Modern JavaScript continues to evolve, bringing new capabilities that help developers write better code.</p>`,
    image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800&h=400&fit=crop"
  },
  {
    id: 3,
    title: "CSS Grid vs Flexbox: When to Use Each",
    author: "Mike Johnson",
    date: "2024-01-25",
    excerpt: "Understanding the differences between CSS Grid and Flexbox is crucial for modern web development. Learn when to use each layout method for maximum efficiency.",
    content: `<p>CSS Grid and Flexbox are two powerful layout systems that have transformed how we approach web design. While they can sometimes be used interchangeably, each has its strengths and ideal use cases.</p>
    
    <h2>Understanding Flexbox</h2>
    <p>Flexbox is designed for one-dimensional layouts. It excels at distributing space along a single axis, either horizontally or vertically.</p>
    
    <h3>When to Use Flexbox</h3>
    <p>Flexbox is perfect for component-level layout, navigation bars, centering content, and creating responsive designs that need to adapt to different screen sizes.</p>
    
    <h2>Understanding CSS Grid</h2>
    <p>CSS Grid is designed for two-dimensional layouts. It allows you to work with both rows and columns simultaneously, making it ideal for complex layouts.</p>
    
    <h3>When to Use CSS Grid</h3>
    <p>CSS Grid is excellent for page-level layouts, complex grid systems, and any scenario where you need precise control over both dimensions.</p>
    
    <h2>Combining Both</h2>
    <p>The most powerful approach is often to use both together. Use CSS Grid for the overall page layout and Flexbox for component-level arrangements.</p>
    
    <p>Understanding when to use each tool will make you a more effective developer and help you create better, more maintainable layouts.</p>`,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop"
  },
  {
    id: 4,
    title: "Building Responsive Web Applications",
    author: "Sarah Wilson",
    date: "2024-02-01",
    excerpt: "Learn the essential techniques for creating web applications that work seamlessly across all devices. From mobile-first design to advanced responsive patterns.",
    content: `<p>In today's multi-device world, creating responsive web applications is not just a nice-to-have feature—it's essential. This guide will walk you through the key principles and techniques.</p>
    
    <h2>Mobile-First Approach</h2>
    <p>Starting with mobile design ensures your application works well on the most constrained devices first, then progressively enhances for larger screens.</p>
    
    <h3>Flexible Grid Systems</h3>
    <p>Using percentage-based widths and flexible grid systems allows your layout to adapt smoothly to different screen sizes.</p>
    
    <h3>Media Queries</h3>
    <p>Media queries are the cornerstone of responsive design, allowing you to apply different styles based on device characteristics.</p>
    
    <h2>Responsive Images</h2>
    <p>Images need special attention in responsive design. Use techniques like srcset and picture elements to serve appropriate images for different devices.</p>
    
    <h3>Typography and Spacing</h3>
    <p>Responsive typography ensures text remains readable across all devices. Consider using relative units and fluid typography techniques.</p>
    
    <h2>Testing and Optimization</h2>
    <p>Regular testing on real devices and performance optimization are crucial for delivering a great user experience.</p>
    
    <p>Responsive design is an ongoing process that requires attention to detail and continuous refinement as new devices and screen sizes emerge.</p>`,
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop"
  },
  {
    id: 5,
    title: "Node.js Best Practices for Scalable Applications",
    author: "David Chen",
    date: "2024-02-05",
    excerpt: "Discover proven strategies for building scalable Node.js applications. From architecture patterns to performance optimization, learn how to write production-ready code.",
    content: `<p>Building scalable Node.js applications requires careful planning and adherence to best practices. This guide covers the essential patterns and techniques for production-ready applications.</p>
    
    <h2>Application Architecture</h2>
    <p>A well-structured application architecture is the foundation of scalability. Consider using modular design patterns and separation of concerns.</p>
    
    <h3>Error Handling</h3>
    <p>Proper error handling is crucial for application stability. Implement comprehensive error handling strategies throughout your application.</p>
    
    <h3>Database Optimization</h3>
    <p>Database performance often becomes a bottleneck in scalable applications. Use proper indexing, query optimization, and connection pooling.</p>
    
    <h2>Caching Strategies</h2>
    <p>Implement effective caching at multiple levels to reduce database load and improve response times.</p>
    
    <h3>Security Considerations</h3>
    <p>Security should be built into your application from the ground up. Follow security best practices and regularly update dependencies.</p>
    
    <h2>Monitoring and Logging</h2>
    <p>Comprehensive monitoring and logging help you identify issues before they impact users and provide insights for optimization.</p>
    
    <p>Scalable Node.js applications require ongoing maintenance and optimization. Regular performance reviews and code audits help maintain application health.</p>`,
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop"
  },
  {
    id: 6,
    title: "Understanding API Design Principles",
    author: "Lisa Rodriguez",
    date: "2024-02-10",
    excerpt: "Master the art of designing clean, maintainable APIs that developers love to use. Learn REST principles, documentation strategies, and versioning best practices.",
    content: `<p>Great API design is both an art and a science. Well-designed APIs are intuitive, consistent, and easy to use, while poor APIs can frustrate developers and hinder adoption.</p>
    
    <h2>RESTful Design Principles</h2>
    <p>REST (Representational State Transfer) provides a set of architectural constraints that guide API design. Understanding these principles is crucial for creating effective APIs.</p>
    
    <h3>Resource-Based URLs</h3>
    <p>Design your URLs around resources rather than actions. This makes your API more intuitive and easier to understand.</p>
    
    <h3>HTTP Methods</h3>
    <p>Use HTTP methods appropriately: GET for retrieval, POST for creation, PUT for updates, and DELETE for removal.</p>
    
    <h2>Error Handling</h2>
    <p>Consistent error handling with appropriate HTTP status codes helps developers understand and handle errors effectively.</p>
    
    <h3>Documentation</h3>
    <p>Comprehensive documentation is essential for API adoption. Include examples, error codes, and clear explanations of all endpoints.</p>
    
    <h2>Versioning</h2>
    <p>Plan for API evolution from the beginning. Implement versioning strategies that allow for backward compatibility while enabling innovation.</p>
    
    <p>Good API design requires empathy for the developers who will use your API. Consider their needs and workflows when making design decisions.</p>`,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop"
  }
];

// Helper function to generate a new ID
export const generateNewId = () => {
  return Date.now() + Math.random();
};

// Helper function to format date for display
export const formatDateForDisplay = (dateString) => {
  if (!dateString) return "";
  
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "";
  
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
};