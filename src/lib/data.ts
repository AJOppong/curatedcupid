export interface ShopItem {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  emoji: string;
  image?: string;
}

export interface FlowerItem {
  id: string;
  name: string;
  price: number;
  description: string;
  emoji: string;
  image?: string;
}

export interface DeliveryMethod {
  id: string;
  label: string;
  desc: string;
  icon: string;
  hasDetails: boolean;
}

export interface TransportOption {
  id: string;
  label: string;
  price: number;
  desc: string;
}

export const ROOM_DESIGN_PRICE = 200;

export const shopItems: ShopItem[] = [
  { id: "raffaello", name: "Raffaello Chocolates", price: 60, category: "Treats", description: "Premium almond and coconut confections", emoji: "🍬", image: "/item_chocolates.png" },
  { id: "ferrero", name: "Ferrero Rocher", price: 120, category: "Treats", description: "Gold-wrapped hazelnut milk chocolates", emoji: "🍫", image: "/item_chocolates.png" },
  { id: "jewelry", name: "Jewelry", price: 50, category: "Gifts", description: "Elegant necklace or bracelet in a luxury box", emoji: "💍", image: "/item_jewelry.png" },
  { id: "premium-jewelry", name: "Premium Jewelry", price: 70, category: "Gifts", description: "High-end jewelry selection for special occasions", emoji: "💎", image: "/item_jewelry.png" },
  { id: "wine", name: "Wine", price: 90, category: "Drinks", description: "Carefully selected vintage for romantic evenings", emoji: "🍷", image: "/item_wine.png" },
  { id: "vals-card", name: "Valentine's Day Card", price: 20, category: "Personal", description: "Handcrafted romantic card with your message", emoji: "💌" },
  { id: "wallet", name: "Wallet", price: 80, category: "Gifts", description: "Genuine leather wallet in a sleek design", emoji: "👛", image: "/item_wallet.png" },
  { id: "custom-slippers", name: "Custom Slippers", price: 100, category: "Gifts", description: "Comfortable plush slippers with custom embroidery", emoji: "🩴", image: "/item_shoes.png" },
  { id: "nike-slides", name: "Nike Slides", price: 150, category: "Gifts", description: "Authentic Nike comfort slides for him", emoji: "👟", image: "/item_shoes.png" },
  { id: "handwritten-letter", name: "Custom Handwritten Letter", price: 30, category: "Personal", description: "Calligraphy letter on premium parchment paper", emoji: "✉️" },
  { id: "shirt", name: "Shirt", price: 120, category: "Gifts", description: "High-quality cotton shirt in his size", emoji: "👔" },
  { id: "db-perfume", name: "David Beckham Perfume", price: 350, category: "Gifts", description: "Signature designer fragrance by David Beckham", emoji: "🧪", image: "/item_perfume.png" },
  { id: "food-basket", name: "Food Basket", price: 250, category: "Treats", description: "Gourmet selection of snacks, fruits and delicacies", emoji: "🧺" },
  { id: "oxford-shoes", name: "Oxford Shoes", price: 300, category: "Gifts", description: "Classic handcrafted leather Oxford shoes", emoji: "👞", image: "/item_shoes.png" },
  { id: "fuel-coupons", name: "Fuel Coupons", price: 200, category: "Gifts", description: "Prepaid fuel vouchers for easy mobility", emoji: "⛽" },
  { id: "room-diffuser", name: "Room Diffuser", price: 120, category: "Decor", description: "Essential oil diffuser for a romantic atmosphere", emoji: "💨" },
  { id: "car-freshener", name: "Car Freshener", price: 30, category: "Decor", description: "Premium scent for his vehicle", emoji: "🌲" },
  { id: "birkenstocks", name: "Birkenstocks", price: 325, category: "Gifts", description: "Authentic comfort footwear by Birkenstock", emoji: "🩴", image: "/item_shoes.png" },
  { id: "body-products", name: "Body Products", price: 150, category: "Personal", description: "Luxury grooming and body care collection", emoji: "🧴" },
  { id: "custom-jersey", name: "Custom Jersey", price: 200, category: "Gifts", description: "His favourite team's jersey with custom name", emoji: "👕" },
  { id: "grooming-products", name: "Grooming Products", price: 150, category: "Personal", description: "Complete beard and face care grooming set", emoji: "🪒" },
];

export const flowerItems: FlowerItem[] = [
  { id: "single-rose", name: "Single Rose", price: 20, description: "A timeless symbol of love and affection", emoji: "🌹" },
  { id: "rose-bouquet-12", name: "Rose Bouquet (12)", price: 150, description: "A dozen premium long-stem red roses", emoji: "💐" },
  { id: "rose-bouquet-24", name: "Rose Bouquet (24)", price: 280, description: "Two dozen premium roses, beautifully wrapped", emoji: "🌹" },
  { id: "mixed-bouquet", name: "Mixed Floral Bouquet", price: 200, description: "Seasonal mixed flowers in a stunning arrangement", emoji: "🌸" },
  { id: "sunflowers", name: "Sunflower Bouquet", price: 100, description: "Bright and cheerful sunflowers to lift any mood", emoji: "🌻" },
  { id: "lilies", name: "White Lilies", price: 120, description: "Elegant pure white lilies in a classic wrap", emoji: "🌷" },
  { id: "custom-arrangement", name: "Custom Arrangement", price: 350, description: "Bespoke floral design crafted for your unique occasion", emoji: "✨" },
  { id: "condolence-wreath", name: "Condolence Wreath", price: 250, description: "A dignified white flower wreath for funerals and tributes", emoji: "⚪" },
];

export const deliveryMethods: DeliveryMethod[] = [
  { id: "pickup", label: "Pickup", desc: "Collect from our location in Ayeduase", icon: "🏪", hasDetails: false },
  { id: "bike", label: "Bike Delivery", desc: "Fast delivery via motorbike within Kumasi", icon: "🛵", hasDetails: false },
  { id: "car", label: "Car Delivery", desc: "Premium delivery via car, anywhere in Kumasi", icon: "🚗", hasDetails: false },
  { id: "other", label: "Other", desc: "Specify your preferred delivery arrangement", icon: "📦", hasDetails: true },
];

export const roomTransportOptions: TransportOption[] = [
  { id: "self", label: "Self-Arranged", price: 0, desc: "I will arrange transportation to the venue myself" },
  { id: "bike", label: "Bike Transport", price: 50, desc: "Décor items transported by motorbike" },
  { id: "car", label: "Car Transport", price: 100, desc: "Décor items transported by car — ideal for larger setups" },
];

export const baseServices = [
  {
    id: "room-aesthetics",
    name: "Room Aesthetics",
    description: "Transform any space into a breathtaking romantic or celebratory scene with curated décor, lighting and ambiance.",
    emoji: "🛏️",
    color: "from-[#F2B8C6]/20 to-[#9b87f5]/10",
  },
  {
    id: "surprise-package",
    name: "Surprise Package",
    description: "A fully curated secret experience delivered to your loved one — we handle everything for any occasion.",
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
  // ── Guys ──────────────────────────────────────────────────────────────────────
  { id: "el-capo", name: "EL CAPO", price: 250, gender: "guys", items: ["raffaello", "jewelry", "wine", "vals-card"] },
  { id: "non-anchora", name: "NON ANCHORA", price: 350, gender: "guys", items: ["raffaello", "jewelry", "wallet", "wine", "vals-card"] },
  { id: "fuori-orario", name: "FUORI ORARIO", price: 500, gender: "guys", items: ["raffaello", "jewelry", "wallet", "wine", "custom-slippers", "handwritten-letter"] },
  { id: "il-devoto", name: "IL DEVOTO", price: 700, gender: "guys", tag: "Most Popular", items: ["raffaello", "jewelry", "wallet", "wine", "custom-slippers", "nike-slides", "handwritten-letter"] },
  { id: "re-del-mio", name: "RE DEL MIO", price: 830, gender: "guys", items: ["raffaello", "jewelry", "wallet", "wine", "custom-slippers", "nike-slides", "shirt", "handwritten-letter"] },
  { id: "perche-sei-mio", name: "PERCHÉ SEI MIO", price: 1400, gender: "guys", items: ["ferrero", "premium-jewelry", "wallet", "wine", "custom-slippers", "db-perfume", "nike-slides", "shirt", "handwritten-letter"] },
  { id: "oltre-leternita", name: "OLTRE L'ETERNITÀ", price: 2000, gender: "guys", items: ["ferrero", "premium-jewelry", "wallet", "wine", "custom-slippers", "nike-slides", "db-perfume", "shirt", "food-basket", "oxford-shoes", "handwritten-letter"] },
  // ── Ladies ────────────────────────────────────────────────────────────────────
  { id: "bella", name: "BELLA", price: 250, gender: "ladies", items: ["raffaello", "jewelry", "vals-card", "handwritten-letter"] },
  { id: "dolce-vita", name: "DOLCE VITA", price: 450, gender: "ladies", tag: "Most Popular", items: ["raffaello", "premium-jewelry", "wine", "body-products", "handwritten-letter"] },
  { id: "la-principessa", name: "LA PRINCIPESSA", price: 700, gender: "ladies", items: ["ferrero", "premium-jewelry", "wine", "body-products", "handwritten-letter", "room-diffuser"] },
  { id: "la-regina", name: "LA REGINA", price: 1200, gender: "ladies", items: ["ferrero", "premium-jewelry", "wine", "body-products", "handwritten-letter", "room-diffuser", "birkenstocks", "grooming-products"] },
];
