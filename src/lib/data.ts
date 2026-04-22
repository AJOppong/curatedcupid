export interface ShopItem {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  emoji: string;
}

export const shopItems: ShopItem[] = [
  {
    id: "raffaello",
    name: "Raffaello Chocolates",
    price: 60,
    category: "Treats",
    description: "Premium almond and coconut confections",
    emoji: "🍬",
  },
  {
    id: "ferrero",
    name: "Ferrero Rocher",
    price: 120,
    category: "Treats",
    description: "Gold-wrapped hazelnut milk chocolates",
    emoji: "🍫",
  },
  {
    id: "jewelry",
    name: "Jewelry",
    price: 50,
    category: "Gifts",
    description: "Elegant necklace or bracelet in a luxury box",
    emoji: "💍",
  },
  {
    id: "premium-jewelry",
    name: "Premium Jewelry",
    price: 70,
    category: "Gifts",
    description: "High-end jewelry selection for special occasions",
    emoji: "💎",
  },
  {
    id: "wine",
    name: "Wine",
    price: 90,
    category: "Drinks",
    description: "Carefully selected vintage for romantic evenings",
    emoji: "🍷",
  },
  {
    id: "vals-card",
    name: "Valentine's Day Card",
    price: 20,
    category: "Personal",
    description: "Handcrafted romantic card with your message",
    emoji: "💌",
  },
  {
    id: "wallet",
    name: "Wallet",
    price: 80,
    category: "Gifts",
    description: "Genuine leather wallet in a sleek design",
    emoji: "👛",
  },
  {
    id: "custom-slippers",
    name: "Custom Slippers",
    price: 100,
    category: "Gifts",
    description: "Comfortable plush slippers with custom embroidery",
    emoji: "🩴",
  },
  {
    id: "nike-slides",
    name: "Nike Slides",
    price: 150,
    category: "Gifts",
    description: "Authentic Nike comfort slides for him",
    emoji: "👟",
  },
  {
    id: "handwritten-letter",
    name: "Custom Handwritten Letter",
    price: 30,
    category: "Personal",
    description: "Calligraphy letter on premium parchment paper",
    emoji: "✉️",
  },
  {
    id: "shirt",
    name: "Shirt",
    price: 120,
    category: "Gifts",
    description: "High-quality cotton shirt in his size",
    emoji: "👔",
  },
  {
    id: "db-perfume",
    name: "David Beckham Perfume",
    price: 350,
    category: "Gifts",
    description: "Signature designer fragrance by David Beckham",
    emoji: "🧪",
  },
  {
    id: "food-basket",
    name: "Food Basket",
    price: 250,
    category: "Treats",
    description: "Gourmet selection of snacks, fruits and delicacies",
    emoji: "🧺",
  },
  {
    id: "oxford-shoes",
    name: "Oxford Shoes",
    price: 300,
    category: "Gifts",
    description: "Classic handcrafted leather Oxford shoes",
    emoji: "👞",
  },
  {
    id: "fuel-coupons",
    name: "Fuel Coupons",
    price: 200,
    category: "Gifts",
    description: "Prepaid fuel vouchers for easy mobility",
    emoji: "⛽",
  },
  {
    id: "room-diffuser",
    name: "Room Diffuser",
    price: 120,
    category: "Decor",
    description: "Essential oil diffuser for a romantic atmosphere",
    emoji: "💨",
  },
  {
    id: "car-freshener",
    name: "Car Freshener",
    price: 30,
    category: "Decor",
    description: "Premium scent for his vehicle",
    emoji: "🌲",
  },
  {
    id: "birkenstocks",
    name: "Birkenstocks",
    price: 325,
    category: "Gifts",
    description: "Authentic comfort footwear by Birkenstock",
    emoji: "🩴",
  },
  {
    id: "body-products",
    name: "Body Products",
    price: 150,
    category: "Personal",
    description: "Luxury grooming and body care collection",
    emoji: "🧴",
  },
  {
    id: "custom-jersey",
    name: "Custom Jersey",
    price: 200,
    category: "Gifts",
    description: "His favorite team's jersey with custom name",
    emoji: "👕",
  },
  {
    id: "grooming-products",
    name: "Grooming Products",
    price: 150,
    category: "Personal",
    description: "Complete beard and face care grooming set",
    emoji: "🪒",
  },
];

export const baseServices = [
  {
    id: "room-aesthetics",
    name: "Room Aesthetics",
    description: "Transform any space into a breathtaking romantic scene with curated decor, lighting and ambiance.",
    emoji: "🛏️",
    color: "from-[#F2B8C6]/20 to-[#9b87f5]/10",
  },
  {
    id: "surprise-package",
    name: "Surprise Package",
    description: "A fully curated secret experience delivered to your loved one — we handle everything.",
    emoji: "🎁",
    color: "from-[#D4AF37]/20 to-[#F2B8C6]/10",
  },
  {
    id: "custom-setup",
    name: "Custom Setup",
    description: "Build your dream setup from scratch. Mix and match items exactly the way you envision it.",
    emoji: "✨",
    color: "from-[#9b87f5]/20 to-[#F2B8C6]/10",
  },
];
export const predefinedPackages = [
  {
    id: "el-capo",
    name: "EL CAPO",
    price: 250,
    items: ["raffaello", "jewelry", "wine", "vals-card"]
  },
  {
    id: "non-anchora",
    name: "NON ANCHORA",
    price: 350,
    items: ["raffaello", "jewelry", "wallet", "wine", "vals-card"]
  },
  {
    id: "fuori-orario",
    name: "FUORI ORARIO",
    price: 500,
    items: ["raffaello", "jewelry", "wallet", "wine", "custom-slippers", "handwritten-letter"]
  },
  {
    id: "il-devoto",
    name: "IL DEVOTO",
    price: 700,
    items: ["raffaello", "jewelry", "wallet", "wine", "custom-slippers", "nike-slides", "handwritten-letter"]
  },
  {
    id: "re-del-mio",
    name: "RE DEL MIO",
    price: 830,
    items: ["raffaello", "jewelry", "wallet", "wine", "custom-slippers", "nike-slides", "shirt", "handwritten-letter"]
  },
  {
    id: "perche-sei-mio",
    name: "PERCHÉ SEI MIO",
    price: 1400,
    items: ["ferrero", "premium-jewelry", "wallet", "wine", "custom-slippers", "db-perfume", "nike-slides", "shirt", "handwritten-letter"]
  },
  {
    id: "oltre-leternita",
    name: "OLTRE L’ETERNITÀ",
    price: 2000,
    items: ["ferrero", "premium-jewelry", "wallet", "wine", "custom-slippers", "nike-slides", "db-perfume", "shirt", "food-basket", "oxford-shoes", "handwritten-letter"]
  },
];
