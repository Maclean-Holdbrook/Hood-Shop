export const mockProducts = [
  // PHONES
  {
    id: 1,
    name: "iPhone 15 Pro Max",
    description: "The ultimate iPhone with titanium design, A17 Pro chip, and advanced camera system.",
    price: 1199.99,
    originalPrice: 1299.99,
    discount: 8,
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400",
    images: [
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400",
      "https://images.unsplash.com/photo-1695048133512-28b2e4d2b577?w=400"
    ],
    category: "phones",
    rating: 4.8,
    ratingCount: 342,
    stock: 25,
    isNew: true,
    sizes: ["128GB", "256GB", "512GB", "1TB"],
    colors: [
      { name: "Natural Titanium", hex: "#8B7355" },
      { name: "Blue Titanium", hex: "#4A5568" },
      { name: "White Titanium", hex: "#E2E8F0" },
      { name: "Black Titanium", hex: "#2D3748" }
    ],
    features: [
      "A17 Pro chip",
      "Pro camera system",
      "Action button",
      "Titanium design",
      "USB-C"
    ]
  },
  {
    id: 2,
    name: "Samsung Galaxy S24 Ultra",
    description: "Premium Android flagship with 200MP camera, S Pen, and AI-powered features.",
    price: 1299.99,
    originalPrice: 1399.99,
    discount: 7,
    image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400",
    images: [
      "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400",
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=400"
    ],
    category: "phones",
    rating: 4.7,
    ratingCount: 289,
    stock: 30,
    isNew: true,
    sizes: ["256GB", "512GB", "1TB"],
    colors: [
      { name: "Titanium Black", hex: "#1a1a1a" },
      { name: "Titanium Gray", hex: "#6c757d" },
      { name: "Titanium Violet", hex: "#7B68EE" }
    ],
    features: [
      "200MP camera",
      "S Pen included",
      "5000mAh battery",
      "Snapdragon 8 Gen 3",
      "IP68 water resistant"
    ]
  },
  {
    id: 3,
    name: "Google Pixel 8 Pro",
    description: "Google's flagship with advanced AI capabilities and exceptional camera system.",
    price: 999.99,
    originalPrice: 1099.99,
    discount: 9,
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400",
    images: [
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400"
    ],
    category: "phones",
    rating: 4.6,
    ratingCount: 234,
    stock: 35,
    isNew: true,
    sizes: ["128GB", "256GB", "512GB"],
    colors: [
      { name: "Obsidian", hex: "#0f0f0f" },
      { name: "Porcelain", hex: "#f5f5f5" },
      { name: "Bay", hex: "#87CEEB" }
    ],
    features: [
      "Google Tensor G3",
      "Magic Eraser",
      "Best Take",
      "7 years of updates",
      "Temperature sensor"
    ]
  },

  // LAPTOPS
  {
    id: 4,
    name: "MacBook Pro 16-inch M3 Pro",
    description: "Professional powerhouse with M3 Pro chip and stunning Liquid Retina XDR display.",
    price: 2499.99,
    originalPrice: 2699.99,
    discount: 7,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400",
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400",
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400"
    ],
    category: "laptops",
    rating: 4.9,
    ratingCount: 156,
    stock: 15,
    isNew: true,
    sizes: ["512GB SSD", "1TB SSD", "2TB SSD"],
    colors: [
      { name: "Space Black", hex: "#1a1a1a" },
      { name: "Silver", hex: "#c0c0c0" }
    ],
    features: [
      "M3 Pro chip",
      "16-inch Liquid Retina XDR",
      "22-hour battery",
      "16GB-36GB RAM",
      "MagSafe 3"
    ]
  },
  {
    id: 5,
    name: "Dell XPS 15",
    description: "Premium Windows laptop with stunning InfinityEdge display and powerful performance.",
    price: 1799.99,
    originalPrice: 1999.99,
    discount: 10,
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400",
    images: [
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400",
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400"
    ],
    category: "laptops",
    rating: 4.5,
    ratingCount: 203,
    stock: 20,
    isNew: false,
    sizes: ["512GB SSD", "1TB SSD"],
    colors: [
      { name: "Platinum Silver", hex: "#c0c0c0" },
      { name: "Graphite", hex: "#383838" }
    ],
    features: [
      "Intel Core i7",
      "15.6-inch 4K OLED",
      "16GB RAM",
      "NVIDIA RTX 4050",
      "Thunderbolt 4"
    ]
  },

  // AUDIO
  {
    id: 6,
    name: "AirPods Pro (2nd generation)",
    description: "Premium wireless earbuds with active noise cancellation and adaptive audio.",
    price: 249.99,
    originalPrice: 279.99,
    discount: 11,
    image: "https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=400",
    images: [
      "https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=400",
      "https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?w=400"
    ],
    category: "audio",
    rating: 4.7,
    ratingCount: 892,
    stock: 80,
    isNew: true,
    sizes: ["One Size"],
    colors: [
      { name: "White", hex: "#ffffff" }
    ],
    features: [
      "Active Noise Cancellation",
      "Adaptive Audio",
      "Spatial Audio",
      "MagSafe charging",
      "IPX4 water resistant"
    ]
  },
  {
    id: 7,
    name: "Sony WH-1000XM5",
    description: "Industry-leading noise cancelling headphones with exceptional sound quality.",
    price: 349.99,
    originalPrice: 399.99,
    discount: 13,
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400",
    images: [
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400",
      "https://images.unsplash.com/photo-1545127398-14699f92334b?w=400"
    ],
    category: "audio",
    rating: 4.8,
    ratingCount: 654,
    stock: 45,
    isNew: false,
    sizes: ["One Size"],
    colors: [
      { name: "Black", hex: "#000000" },
      { name: "Silver", hex: "#c0c0c0" }
    ],
    features: [
      "Premium ANC",
      "30-hour battery",
      "Multi-point connection",
      "LDAC/Hi-Res Audio",
      "Speak-to-Chat"
    ]
  },

  // CLOTHING (keeping original items)
  {
    id: 8,
    name: "Classic Black Hoodie",
    description: "Premium quality cotton hoodie with a relaxed fit. Perfect for casual wear or layering.",
    price: 49.99,
    originalPrice: 59.99,
    discount: 17,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400",
    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400",
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400"
    ],
    category: "hoodies",
    rating: 4.5,
    ratingCount: 128,
    stock: 25,
    isNew: false,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Black", hex: "#000000" },
      { name: "Gray", hex: "#6c757d" },
      { name: "Navy", hex: "#001f3f" }
    ],
    features: [
      "100% Cotton",
      "Machine washable",
      "Relaxed fit",
      "Kangaroo pocket",
      "Drawstring hood"
    ]
  },
  {
    id: 2,
    name: "Streetwear Graphic Tee",
    description: "Soft cotton t-shirt with bold streetwear graphics. Made for the urban lifestyle.",
    price: 29.99,
    image: "https://via.placeholder.com/400x400.png?text=Streetwear+Graphic+Tee",
    images: [
      "https://via.placeholder.com/400x400.png?text=Streetwear+Tee+1",
      "https://via.placeholder.com/400x400.png?text=Streetwear+Tee+2"
    ],
    category: "t-shirts",
    rating: 4.2,
    ratingCount: 89,
    stock: 50,
    isNew: true,
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "White", hex: "#ffffff" },
      { name: "Black", hex: "#000000" },
      { name: "Red", hex: "#dc3545" }
    ],
    features: [
      "100% Cotton",
      "Pre-shrunk",
      "Screen printed design",
      "Regular fit"
    ]
  },
  {
    id: 3,
    name: "Urban Snapback Cap",
    description: "Classic snapback cap with embroidered logo. Adjustable fit for all head sizes.",
    price: 24.99,
    image: "https://via.placeholder.com/400x400.png?text=Urban+Snapback+Cap",
    images: [
      "https://via.placeholder.com/400x400.png?text=Urban+Cap+1",
      "https://via.placeholder.com/400x400.png?text=Urban+Cap+2"
    ],
    category: "accessories",
    rating: 4.7,
    ratingCount: 203,
    stock: 75,
    isNew: false,
    sizes: ["One Size"],
    colors: [
      { name: "Black", hex: "#000000" },
      { name: "White", hex: "#ffffff" },
      { name: "Red", hex: "#dc3545" },
      { name: "Navy", hex: "#001f3f" }
    ],
    features: [
      "100% Cotton",
      "Embroidered logo",
      "Snapback closure",
      "Curved brim",
      "One size fits all"
    ]
  },
  {
    id: 4,
    name: "Skater Denim Jeans",
    description: "Relaxed fit denim jeans designed for comfort and style. Perfect for skating or casual wear.",
    price: 79.99,
    originalPrice: 89.99,
    discount: 11,
    image: "https://via.placeholder.com/400x400.png?text=Skater+Denim+Jeans",
    images: [
      "https://via.placeholder.com/400x400.png?text=Skater+Jeans+1",
      "https://via.placeholder.com/400x400.png?text=Skater+Jeans+2",
      "https://via.placeholder.com/400x400.png?text=Skater+Jeans+3"
    ],
    category: "pants",
    rating: 4.3,
    ratingCount: 156,
    stock: 30,
    isNew: false,
    sizes: ["28", "30", "32", "34", "36", "38"],
    colors: [
      { name: "Dark Blue", hex: "#001f3f" },
      { name: "Light Blue", hex: "#007bff" },
      { name: "Black", hex: "#000000" }
    ],
    features: [
      "100% Cotton Denim",
      "Relaxed fit",
      "Reinforced knees",
      "Five-pocket design",
      "Machine washable"
    ]
  },
  {
    id: 5,
    name: "Premium Leather Jacket",
    description: "Genuine leather jacket with a modern streetwear aesthetic. Built to last.",
    price: 199.99,
    originalPrice: 249.99,
    discount: 20,
    image: "https://via.placeholder.com/400x400.png?text=Premium+Leather+Jacket",
    images: [
      "https://via.placeholder.com/400x400.png?text=Leather+Jacket+1",
      "https://via.placeholder.com/400x400.png?text=Leather+Jacket+2",
      "https://via.placeholder.com/400x400.png?text=Leather+Jacket+3"
    ],
    category: "jackets",
    rating: 4.8,
    ratingCount: 67,
    stock: 15,
    isNew: false,
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Black", hex: "#000000" },
      { name: "Brown", hex: "#8b4513" }
    ],
    features: [
      "Genuine leather",
      "Zip closure",
      "Two side pockets",
      "Classic biker style",
      "Dry clean only"
    ]
  },
  {
    id: 6,
    name: "High-Top Sneakers",
    description: "Comfortable high-top sneakers with a streetwear design. Perfect for everyday wear.",
    price: 89.99,
    image: "https://via.placeholder.com/400x400.png?text=High-Top+Sneakers",
    images: [
      "https://via.placeholder.com/400x400.png?text=Sneakers+1",
      "https://via.placeholder.com/400x400.png?text=Sneakers+2",
      "https://via.placeholder.com/400x400.png?text=Sneakers+3"
    ],
    category: "shoes",
    rating: 4.4,
    ratingCount: 94,
    stock: 40,
    isNew: true,
    sizes: ["7", "8", "9", "10", "11", "12"],
    colors: [
      { name: "White", hex: "#ffffff" },
      { name: "Black", hex: "#000000" },
      { name: "Red", hex: "#dc3545" }
    ],
    features: [
      "Canvas upper",
      "Rubber sole",
      "Lace-up closure",
      "Cushioned insole",
      "High-top design"
    ]
  },
  {
    id: 7,
    name: "Oversized Crew Neck Sweatshirt",
    description: "Comfortable oversized sweatshirt with a relaxed fit. Perfect for layering or lounging.",
    price: 39.99,
    image: "https://via.placeholder.com/400x400.png?text=Oversized+Crew+Neck",
    images: [
      "https://via.placeholder.com/400x400.png?text=Crew+Neck+1",
      "https://via.placeholder.com/400x400.png?text=Crew+Neck+2"
    ],
    category: "hoodies",
    rating: 4.6,
    ratingCount: 112,
    stock: 35,
    isNew: false,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Gray", hex: "#6c757d" },
      { name: "Black", hex: "#000000" },
      { name: "Cream", hex: "#f8f9fa" }
    ],
    features: [
      "80% Cotton, 20% Polyester",
      "Oversized fit",
      "Crew neck",
      "Ribbed cuffs and hem",
      "Machine washable"
    ]
  },
  {
    id: 8,
    name: "Cargo Pants",
    description: "Functional cargo pants with multiple pockets. Perfect for outdoor activities or casual wear.",
    price: 59.99,
    originalPrice: 69.99,
    discount: 14,
    image: "https://via.placeholder.com/400x400.png?text=Cargo+Pants",
    images: [
      "https://via.placeholder.com/400x400.png?text=Cargo+1",
      "https://via.placeholder.com/400x400.png?text=Cargo+2",
      "https://via.placeholder.com/400x400.png?text=Cargo+3"
    ],
    category: "pants",
    rating: 4.1,
    ratingCount: 78,
    stock: 20,
    isNew: false,
    sizes: ["28", "30", "32", "34", "36"],
    colors: [
      { name: "Olive", hex: "#6b8e23" },
      { name: "Black", hex: "#000000" },
      { name: "Khaki", hex: "#f0e68c" }
    ],
    features: [
      "Cotton blend",
      "Multiple cargo pockets",
      "Drawstring waist",
      "Tapered leg",
      "Durable construction"
    ]
  },

  // TABLETS
  {
    id: 9,
    name: "iPad Pro 12.9-inch M2",
    description: "The ultimate iPad experience with M2 chip and stunning Liquid Retina XDR display.",
    price: 1099.99,
    originalPrice: 1199.99,
    discount: 8,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400",
    images: [
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400",
      "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=400"
    ],
    category: "tablets",
    rating: 4.9,
    ratingCount: 412,
    stock: 30,
    isNew: true,
    sizes: ["128GB", "256GB", "512GB", "1TB", "2TB"],
    colors: [
      { name: "Space Gray", hex: "#4a4a4a" },
      { name: "Silver", hex: "#c0c0c0" }
    ],
    features: [
      "M2 chip",
      "12.9-inch Liquid Retina XDR",
      "Apple Pencil support",
      "Face ID",
      "USB-C Thunderbolt"
    ]
  },
  {
    id: 10,
    name: "Samsung Galaxy Tab S9 Ultra",
    description: "Premium Android tablet with massive 14.6-inch display and S Pen included.",
    price: 1199.99,
    originalPrice: 1299.99,
    discount: 8,
    image: "https://images.unsplash.com/photo-1585790050230-5dd28404f3be?w=400",
    images: [
      "https://images.unsplash.com/photo-1585790050230-5dd28404f3be?w=400",
      "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400"
    ],
    category: "tablets",
    rating: 4.7,
    ratingCount: 289,
    stock: 25,
    isNew: true,
    sizes: ["256GB", "512GB", "1TB"],
    colors: [
      { name: "Graphite", hex: "#2d2d2d" },
      { name: "Beige", hex: "#d4c5b9" }
    ],
    features: [
      "14.6-inch AMOLED display",
      "S Pen included",
      "Snapdragon 8 Gen 2",
      "IP68 water resistant",
      "DeX mode"
    ]
  },

  // SMARTWATCHES
  {
    id: 11,
    name: "Apple Watch Series 9",
    description: "Advanced health and fitness tracking with all-day battery and bright display.",
    price: 429.99,
    originalPrice: 479.99,
    discount: 10,
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400",
    images: [
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400",
      "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=400"
    ],
    category: "smartwatches",
    rating: 4.8,
    ratingCount: 567,
    stock: 50,
    isNew: true,
    sizes: ["41mm", "45mm"],
    colors: [
      { name: "Midnight", hex: "#1a1a1a" },
      { name: "Starlight", hex: "#f5f5dc" },
      { name: "Pink", hex: "#ffc0cb" }
    ],
    features: [
      "S9 chip",
      "Always-On Retina display",
      "ECG & Blood Oxygen",
      "Crash Detection",
      "Water resistant"
    ]
  },
  {
    id: 12,
    name: "Samsung Galaxy Watch 6 Classic",
    description: "Premium smartwatch with rotating bezel and comprehensive health tracking.",
    price: 399.99,
    originalPrice: 449.99,
    discount: 11,
    image: "https://images.unsplash.com/photo-1617625802912-cde586faf331?w=400",
    images: [
      "https://images.unsplash.com/photo-1617625802912-cde586faf331?w=400",
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400"
    ],
    category: "smartwatches",
    rating: 4.6,
    ratingCount: 423,
    stock: 40,
    isNew: true,
    sizes: ["43mm", "47mm"],
    colors: [
      { name: "Black", hex: "#000000" },
      { name: "Silver", hex: "#c0c0c0" }
    ],
    features: [
      "Rotating bezel",
      "AMOLED display",
      "Body composition analysis",
      "Sleep tracking",
      "5ATM water resistant"
    ]
  },

  // MORE CLOTHING
  {
    id: 13,
    name: "Athletic Track Pants",
    description: "Comfortable track pants with tapered fit. Perfect for workouts or casual wear.",
    price: 44.99,
    originalPrice: 54.99,
    discount: 18,
    image: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=400",
    images: [
      "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=400",
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400"
    ],
    category: "pants",
    rating: 4.4,
    ratingCount: 167,
    stock: 45,
    isNew: false,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Black", hex: "#000000" },
      { name: "Navy", hex: "#001f3f" },
      { name: "Gray", hex: "#6c757d" }
    ],
    features: [
      "Moisture-wicking fabric",
      "Tapered fit",
      "Elastic waistband",
      "Side pockets",
      "Ankle zippers"
    ]
  },
  {
    id: 14,
    name: "Vintage Bomber Jacket",
    description: "Classic bomber jacket with ribbed cuffs and hem. Timeless streetwear style.",
    price: 129.99,
    originalPrice: 159.99,
    discount: 19,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400",
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400",
      "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=400"
    ],
    category: "jackets",
    rating: 4.7,
    ratingCount: 198,
    stock: 22,
    isNew: true,
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Olive", hex: "#6b8e23" },
      { name: "Black", hex: "#000000" },
      { name: "Navy", hex: "#001f3f" }
    ],
    features: [
      "Nylon shell",
      "Zip closure",
      "Ribbed collar and cuffs",
      "Side pockets",
      "Lightweight"
    ]
  },
  {
    id: 15,
    name: "Premium Wool Sweater",
    description: "Soft merino wool sweater with classic crewneck design. Perfect for layering.",
    price: 89.99,
    originalPrice: 109.99,
    discount: 18,
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400",
    images: [
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400",
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400"
    ],
    category: "sweaters",
    rating: 4.8,
    ratingCount: 234,
    stock: 35,
    isNew: false,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Charcoal", hex: "#36454f" },
      { name: "Burgundy", hex: "#800020" },
      { name: "Cream", hex: "#fffdd0" }
    ],
    features: [
      "100% Merino Wool",
      "Crewneck design",
      "Ribbed cuffs and hem",
      "Hand wash recommended",
      "Classic fit"
    ]
  },
  {
    id: 16,
    name: "Distressed Skinny Jeans",
    description: "Modern skinny jeans with distressed detailing. Perfect for a contemporary look.",
    price: 69.99,
    originalPrice: 84.99,
    discount: 18,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400",
    images: [
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400",
      "https://images.unsplash.com/photo-1604176354204-9268737828e4?w=400"
    ],
    category: "pants",
    rating: 4.3,
    ratingCount: 187,
    stock: 40,
    isNew: true,
    sizes: ["28", "30", "32", "34", "36"],
    colors: [
      { name: "Light Blue", hex: "#add8e6" },
      { name: "Dark Blue", hex: "#00008b" },
      { name: "Black", hex: "#000000" }
    ],
    features: [
      "Stretch denim",
      "Skinny fit",
      "Distressed details",
      "Five-pocket design",
      "Button fly"
    ]
  },
  {
    id: 17,
    name: "Running Sneakers",
    description: "Lightweight running shoes with responsive cushioning and breathable mesh.",
    price: 119.99,
    originalPrice: 139.99,
    discount: 14,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
      "https://images.unsplash.com/photo-1539185441755-769473a23570?w=400"
    ],
    category: "shoes",
    rating: 4.6,
    ratingCount: 312,
    stock: 55,
    isNew: true,
    sizes: ["7", "8", "9", "10", "11", "12", "13"],
    colors: [
      { name: "Black/White", hex: "#000000" },
      { name: "Blue/Orange", hex: "#007bff" },
      { name: "Gray/Red", hex: "#6c757d" }
    ],
    features: [
      "Breathable mesh upper",
      "Responsive foam cushioning",
      "Rubber outsole",
      "Lace-up closure",
      "Lightweight design"
    ]
  },
  {
    id: 18,
    name: "Leather Backpack",
    description: "Stylish leather backpack with multiple compartments. Perfect for daily commute.",
    price: 149.99,
    originalPrice: 179.99,
    discount: 17,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400",
      "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=400"
    ],
    category: "accessories",
    rating: 4.7,
    ratingCount: 198,
    stock: 28,
    isNew: false,
    sizes: ["One Size"],
    colors: [
      { name: "Brown", hex: "#8b4513" },
      { name: "Black", hex: "#000000" },
      { name: "Tan", hex: "#d2b48c" }
    ],
    features: [
      "Genuine leather",
      "Laptop compartment",
      "Multiple pockets",
      "Adjustable straps",
      "Top handle"
    ]
  },
  {
    id: 19,
    name: "Polarized Sunglasses",
    description: "Classic aviator sunglasses with polarized lenses. UV protection included.",
    price: 79.99,
    originalPrice: 99.99,
    discount: 20,
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400",
    images: [
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400",
      "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=400"
    ],
    category: "accessories",
    rating: 4.5,
    ratingCount: 267,
    stock: 60,
    isNew: false,
    sizes: ["One Size"],
    colors: [
      { name: "Gold/Green", hex: "#ffd700" },
      { name: "Silver/Blue", hex: "#c0c0c0" },
      { name: "Black/Gray", hex: "#000000" }
    ],
    features: [
      "Polarized lenses",
      "UV400 protection",
      "Metal frame",
      "Adjustable nose pads",
      "Includes case"
    ]
  },
  {
    id: 20,
    name: "Minimalist Wallet",
    description: "Slim leather wallet with RFID protection. Holds 6-8 cards and cash.",
    price: 34.99,
    originalPrice: 44.99,
    discount: 22,
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=400",
    images: [
      "https://images.unsplash.com/photo-1627123424574-724758594e93?w=400",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400"
    ],
    category: "accessories",
    rating: 4.6,
    ratingCount: 421,
    stock: 75,
    isNew: true,
    sizes: ["One Size"],
    colors: [
      { name: "Black", hex: "#000000" },
      { name: "Brown", hex: "#8b4513" },
      { name: "Navy", hex: "#001f3f" }
    ],
    features: [
      "Genuine leather",
      "RFID protection",
      "Slim design",
      "6-8 card slots",
      "Cash compartment"
    ]
  },

  // MORE ELECTRONICS
  {
    id: 21,
    name: "OnePlus 12 Pro",
    description: "Flagship killer with Snapdragon 8 Gen 3, Hasselblad camera, and 100W charging.",
    price: 899.99,
    originalPrice: 999.99,
    discount: 10,
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400",
    images: [
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400",
      "https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=400"
    ],
    category: "phones",
    rating: 4.6,
    ratingCount: 234,
    stock: 32,
    isNew: true,
    sizes: ["256GB", "512GB"],
    colors: [
      { name: "Flowy Emerald", hex: "#50c878" },
      { name: "Silky Black", hex: "#000000" }
    ],
    features: [
      "Snapdragon 8 Gen 3",
      "Hasselblad camera",
      "100W SuperVOOC charging",
      "6.82-inch AMOLED",
      "5400mAh battery"
    ]
  },
  {
    id: 22,
    name: "Lenovo ThinkPad X1 Carbon",
    description: "Business ultrabook with legendary ThinkPad keyboard and long battery life.",
    price: 1599.99,
    originalPrice: 1799.99,
    discount: 11,
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400",
    images: [
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400",
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400"
    ],
    category: "laptops",
    rating: 4.7,
    ratingCount: 178,
    stock: 18,
    isNew: false,
    sizes: ["512GB SSD", "1TB SSD"],
    colors: [
      { name: "Black", hex: "#000000" }
    ],
    features: [
      "Intel Core i7",
      "14-inch 2.8K display",
      "16GB RAM",
      "Military-grade durability",
      "Up to 19 hours battery"
    ]
  },
  {
    id: 23,
    name: "Bose QuietComfort Ultra",
    description: "Premium noise cancelling headphones with Immersive Audio and all-day comfort.",
    price: 429.99,
    originalPrice: 479.99,
    discount: 10,
    image: "https://images.unsplash.com/photo-1545127398-14699f92334b?w=400",
    images: [
      "https://images.unsplash.com/photo-1545127398-14699f92334b?w=400",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400"
    ],
    category: "audio",
    rating: 4.8,
    ratingCount: 523,
    stock: 38,
    isNew: true,
    sizes: ["One Size"],
    colors: [
      { name: "Black", hex: "#000000" },
      { name: "White Smoke", hex: "#f5f5f5" }
    ],
    features: [
      "World-class ANC",
      "Immersive Audio",
      "24-hour battery",
      "CustomTune technology",
      "Premium materials"
    ]
  },
  {
    id: 24,
    name: "JBL Charge 5",
    description: "Portable Bluetooth speaker with powerful sound and built-in power bank.",
    price: 179.99,
    originalPrice: 199.99,
    discount: 10,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400",
    images: [
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400",
      "https://images.unsplash.com/photo-1589003077984-894e133dabab?w=400"
    ],
    category: "audio",
    rating: 4.7,
    ratingCount: 789,
    stock: 65,
    isNew: false,
    sizes: ["One Size"],
    colors: [
      { name: "Black", hex: "#000000" },
      { name: "Blue", hex: "#007bff" },
      { name: "Red", hex: "#dc3545" },
      { name: "Gray", hex: "#6c757d" }
    ],
    features: [
      "20 hours playtime",
      "IP67 waterproof",
      "Power bank function",
      "PartyBoost compatible",
      "Bold JBL sound"
    ]
  },
  {
    id: 25,
    name: "Microsoft Surface Laptop 5",
    description: "Elegant laptop with touchscreen display and premium Alcantara keyboard.",
    price: 1299.99,
    originalPrice: 1499.99,
    discount: 13,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400",
    images: [
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400",
      "https://images.unsplash.com/photo-1587614382346-4ec70e388b28?w=400"
    ],
    category: "laptops",
    rating: 4.6,
    ratingCount: 167,
    stock: 24,
    isNew: true,
    sizes: ["512GB SSD", "1TB SSD"],
    colors: [
      { name: "Platinum", hex: "#e5e4e2" },
      { name: "Matte Black", hex: "#28282B" },
      { name: "Sage", hex: "#bcb88a" }
    ],
    features: [
      "Intel Core i7",
      "13.5-inch PixelSense",
      "Touchscreen display",
      "Alcantara keyboard",
      "18 hours battery"
    ]
  },
  {
    id: 26,
    name: "Garmin Fenix 7X Pro",
    description: "Premium multisport GPS watch with solar charging and advanced training metrics.",
    price: 899.99,
    originalPrice: 999.99,
    discount: 10,
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400",
    images: [
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=400"
    ],
    category: "smartwatches",
    rating: 4.8,
    ratingCount: 289,
    stock: 20,
    isNew: true,
    sizes: ["47mm"],
    colors: [
      { name: "Carbon Gray", hex: "#625D5D" },
      { name: "Slate Gray", hex: "#708090" }
    ],
    features: [
      "Solar charging",
      "Multi-band GPS",
      "Training readiness",
      "28-day battery",
      "100m water resistant"
    ]
  },
  {
    id: 27,
    name: "Zip-Up Track Jacket",
    description: "Sporty track jacket with contrast stripes. Perfect for athleisure style.",
    price: 64.99,
    originalPrice: 79.99,
    discount: 19,
    image: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=400",
    images: [
      "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=400",
      "https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?w=400"
    ],
    category: "jackets",
    rating: 4.4,
    ratingCount: 142,
    stock: 38,
    isNew: false,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Black/White", hex: "#000000" },
      { name: "Navy/Red", hex: "#001f3f" },
      { name: "Gray/Black", hex: "#6c757d" }
    ],
    features: [
      "Polyester blend",
      "Zip-up front",
      "Contrast stripes",
      "Elastic cuffs",
      "Side pockets"
    ]
  },
  {
    id: 28,
    name: "Longline T-Shirt",
    description: "Extended length tee with curved hem. Modern streetwear essential.",
    price: 34.99,
    originalPrice: 39.99,
    discount: 13,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=400"
    ],
    category: "t-shirts",
    rating: 4.3,
    ratingCount: 156,
    stock: 52,
    isNew: true,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "White", hex: "#ffffff" },
      { name: "Black", hex: "#000000" },
      { name: "Gray", hex: "#6c757d" },
      { name: "Olive", hex: "#6b8e23" }
    ],
    features: [
      "100% Cotton",
      "Longline cut",
      "Curved hem",
      "Drop shoulder",
      "Relaxed fit"
    ]
  }
];

export const mockCategories = [
  // Electronics
  { id: 1, name: "phones", displayName: "Phones" },
  { id: 2, name: "laptops", displayName: "Laptops" },
  { id: 3, name: "tablets", displayName: "Tablets" },
  { id: 4, name: "audio", displayName: "Headphones & Audio" },
  { id: 5, name: "smartwatches", displayName: "Smartwatches" },

  // Clothing & Fashion
  { id: 6, name: "hoodies", displayName: "Hoodies" },
  { id: 7, name: "t-shirts", displayName: "T-Shirts" },
  { id: 8, name: "pants", displayName: "Pants" },
  { id: 9, name: "jackets", displayName: "Jackets" },
  { id: 10, name: "sweaters", displayName: "Sweaters" },
  { id: 11, name: "shoes", displayName: "Shoes" },
  { id: 12, name: "accessories", displayName: "Accessories" }
];
