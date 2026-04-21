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
    id: "balloons",
    name: "Balloon Setup",
    price: 45,
    category: "Decor",
    description: "Romantic balloon arch with metallic accents",
    emoji: "🎈",
  },
  {
    id: "led-lights",
    name: "LED Light Display",
    price: 60,
    category: "Lighting",
    description: "Warm fairy lights & LED strips for that perfect ambiance",
    emoji: "✨",
  },
  {
    id: "rose-petals",
    name: "Rose Petal Trail",
    price: 35,
    category: "Flowers",
    description: "Fresh rose petals arranged in a romantic path",
    emoji: "🌹",
  },
  {
    id: "cake",
    name: "Celebration Cake",
    price: 80,
    category: "Treats",
    description: "Custom 2-tier surprise cake with personal message",
    emoji: "🎂",
  },
  {
    id: "gift-box",
    name: "Luxury Gift Box",
    price: 95,
    category: "Gifts",
    description: "Curated premium gift box with chocolates & keepsakes",
    emoji: "🎁",
  },
  {
    id: "personal-note",
    name: "Personalized Note",
    price: 15,
    category: "Personal",
    description: "Handcrafted love letter with calligraphy",
    emoji: "💌",
  },
  {
    id: "candles",
    name: "Candle Arrangement",
    price: 40,
    category: "Lighting",
    description: "Pillar & floating candles with aromatherapy scents",
    emoji: "🕯️",
  },
  {
    id: "photo-frame",
    name: "Photo Frame Set",
    price: 55,
    category: "Personal",
    description: "Personalized collage frames for your precious memories",
    emoji: "🖼️",
  },
  {
    id: "champagne",
    name: "Champagne Setup",
    price: 75,
    category: "Drinks",
    description: "Two crystal flutes with chilled premium champagne",
    emoji: "🥂",
  },
  {
    id: "chocolates",
    name: "Artisan Chocolates",
    price: 30,
    category: "Treats",
    description: "Belgian handcrafted chocolate assortment box",
    emoji: "🍫",
  },
  {
    id: "flower-bouquet",
    name: "Flower Bouquet",
    price: 65,
    category: "Flowers",
    description: "Signature mixed bloom bouquet of fresh seasonal flowers",
    emoji: "💐",
  },
  {
    id: "music-setup",
    name: "Ambient Music",
    price: 50,
    category: "Experience",
    description: "Bluetooth speaker with curated romantic playlist",
    emoji: "🎵",
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
