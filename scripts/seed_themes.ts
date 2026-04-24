import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing Supabase env vars");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const initialThemes = [
  {
    name: "light",
    type: "default",
    colors: {
      background: "#FDF6F7",
      surface: "rgba(255, 255, 255, 0.85)",
      primary: "#C9748A",
      primaryLight: "#E8AABB",
      primaryGlow: "rgba(201, 116, 138, 0.15)",
      secondary: "#B5838D",
      textMain: "#4A2030",
      textMuted: "#9E7382",
      border: "rgba(201, 116, 138, 0.15)",
      glassBg: "rgba(255, 255, 255, 0.75)",
      glassBorder: "rgba(201, 116, 138, 0.12)",
      heroBg: "radial-gradient(ellipse at top left, #FCE8ED 0%, #FDF6F7 45%, #FEF0F3 100%)"
    },
    fonts: {
      heading: "var(--font-playfair)",
      body: "var(--font-montserrat)",
      accent: "var(--font-great-vibes)"
    },
    hero_text: {
      title: "Romantic Gestures",
      desc: "Transform ordinary moments into unforgettable memories. Experience the art of gifting with Curated Cupid.",
      accent: "unforgettable"
    },
    is_active: false,
    is_default: true,
    priority: 0
  },
  {
    name: "dark",
    type: "default",
    colors: {
      background: "#0A0914",
      surface: "#12101F",
      primary: "#E91E8C",
      primaryLight: "#FF6BB5",
      primaryGlow: "rgba(233, 30, 140, 0.2)",
      secondary: "#D4AF37",
      textMain: "#FAFAFA",
      textMuted: "rgba(250, 250, 250, 0.4)",
      border: "rgba(255, 255, 255, 0.05)",
      glassBg: "rgba(18, 16, 31, 0.65)",
      glassBorder: "rgba(255, 255, 255, 0.05)",
      heroBg: "radial-gradient(ellipse at top, #1a0d1f 0%, #0A0914 60%)"
    },
    fonts: {
      heading: "var(--font-playfair)",
      body: "var(--font-montserrat)",
      accent: "var(--font-great-vibes)"
    },
    hero_text: {
      title: "Midnight Magic",
      desc: "An enchanting evening of surprise and elegance. Create an unforgettable vibe in the dark.",
      accent: "enchanting"
    },
    is_active: false,
    is_default: false,
    priority: 0
  },
  {
    name: "valentine",
    type: "occasion",
    colors: {
      background: "#3B0008",
      surface: "#5C0014",
      primary: "#FF1447",
      primaryLight: "#FF5E82",
      primaryGlow: "rgba(255, 20, 71, 0.25)",
      secondary: "#D4AF37",
      textMain: "#FFFFFF",
      textMuted: "#FFB3C6",
      border: "rgba(255, 20, 71, 0.25)",
      glassBg: "rgba(92, 0, 20, 0.6)",
      glassBorder: "rgba(255, 20, 71, 0.2)",
      heroBg: "radial-gradient(ellipse at center, #8A0022 0%, #5C0014 50%, #3B0008 100%)"
    },
    fonts: {
      heading: "var(--font-playfair)",
      body: "var(--font-montserrat)",
      accent: "var(--font-great-vibes)"
    },
    hero_text: {
      title: "Love in Every Detail",
      desc: "Celebrate your love story with breathtaking reds and passionate setups. Make this Valentine's deeply romantic.",
      accent: "deeply romantic"
    },
    is_active: false,
    is_default: false,
    priority: 10
  },
  {
    name: "mothers-day",
    type: "occasion",
    colors: {
      background: "#FDF6FF",
      surface: "rgba(255, 255, 255, 0.88)",
      primary: "#B05CB0",
      primaryLight: "#D4A0D4",
      primaryGlow: "rgba(176, 92, 176, 0.15)",
      secondary: "#8B6BB1",
      textMain: "#3B0764",
      textMuted: "#7E4B9E",
      border: "rgba(176, 92, 176, 0.15)",
      glassBg: "rgba(253, 246, 255, 0.8)",
      glassBorder: "rgba(176, 92, 176, 0.12)",
      heroBg: "linear-gradient(135deg, #fce7ff 0%, #f5d7f5 25%, #ecdeff 60%, #fdf6ff 100%)"
    },
    fonts: {
      heading: "var(--font-playfair)",
      body: "var(--font-montserrat)",
      accent: "var(--font-great-vibes)"
    },
    hero_text: {
      title: "Honor Her Spirit",
      desc: "Show Mom how much she means to you with soft, beautiful setups designed to warm her heart.",
      accent: "warm her heart"
    },
    is_active: false,
    is_default: false,
    priority: 10
  },
  {
    name: "fathers-day",
    type: "occasion",
    colors: {
      background: "#0D1B2A",
      surface: "#162337",
      primary: "#D4AF37",
      primaryLight: "#EDD56A",
      primaryGlow: "rgba(212, 175, 55, 0.2)",
      secondary: "#2D6A4F",
      textMain: "#F0EAD6",
      textMuted: "#8DA9C4",
      border: "rgba(212, 175, 55, 0.2)",
      glassBg: "rgba(22, 35, 55, 0.75)",
      glassBorder: "rgba(212, 175, 55, 0.15)",
      heroBg: "linear-gradient(160deg, #0d1b2a 0%, #1a2e45 40%, #0f2233 70%, #0d1b2a 100%)"
    },
    fonts: {
      heading: "var(--font-playfair)",
      body: "var(--font-montserrat)",
      accent: "var(--font-great-vibes)"
    },
    hero_text: {
      title: "For the King",
      desc: "A bold, sophisticated celebration for Dad. Luxury setups featuring his favorites.",
      accent: "sophisticated"
    },
    is_active: false,
    is_default: false,
    priority: 10
  },
  {
    name: "eid",
    type: "occasion",
    colors: {
      background: "#FDFBF2",
      surface: "rgba(255, 255, 255, 0.9)",
      primary: "#1B6B45",
      primaryLight: "#2E9E6A",
      primaryGlow: "rgba(27, 107, 69, 0.15)",
      secondary: "#C9962A",
      textMain: "#1A3A28",
      textMuted: "#6B7C6B",
      border: "rgba(201, 150, 42, 0.2)",
      glassBg: "rgba(253, 251, 242, 0.85)",
      glassBorder: "rgba(201, 150, 42, 0.15)",
      heroBg: "radial-gradient(ellipse at top right, #f5f0dc 0%, #fdfbf2 40%, #eef5ec 80%, #fdfbf2 100%)"
    },
    fonts: {
      heading: "var(--font-playfair)",
      body: "var(--font-montserrat)",
      accent: "var(--font-great-vibes)"
    },
    hero_text: {
      title: "Eid Mubarak",
      desc: "Celebrate the joy of Eid with elegant, luxurious setups and thoughtful gifting for loved ones.",
      accent: "elegant, luxurious"
    },
    is_active: false,
    is_default: false,
    priority: 10
  },
  {
    name: "christmas",
    type: "occasion",
    colors: {
      background: "#FFF0F2",
      surface: "rgba(255, 255, 255, 0.9)",
      primary: "#E63030",
      primaryLight: "#F07070",
      primaryGlow: "rgba(230, 48, 48, 0.25)",
      secondary: "#D4AF37",
      textMain: "#4A0010",
      textMuted: "#9B4A5A",
      border: "rgba(212, 175, 55, 0.2)",
      glassBg: "rgba(255, 240, 242, 0.8)",
      glassBorder: "rgba(212, 175, 55, 0.15)",
      heroBg: "radial-gradient(ellipse at center top, #ffe0e5 0%, #ffd6dc 30%, #ffeef0 70%, #fff0f2 100%)"
    },
    fonts: {
      heading: "var(--font-playfair)",
      body: "var(--font-montserrat)",
      accent: "var(--font-great-vibes)"
    },
    hero_text: {
      title: "A Festive Dream",
      desc: "Transform your home into a winter wonderland of joy and celebration. Festive magic handcrafted for you.",
      accent: "merry & bright"
    },
    is_active: false,
    is_default: false,
    priority: 10
  },
  {
    name: "new-year",
    type: "occasion",
    colors: {
      background: "#F8F9FA",
      surface: "rgba(255, 255, 255, 0.9)",
      primary: "#1A1A2E",
      primaryLight: "#444466",
      primaryGlow: "rgba(26, 26, 46, 0.12)",
      secondary: "#B8BCC4",
      textMain: "#1A1A2E",
      textMuted: "#6B7280",
      border: "rgba(184, 188, 196, 0.3)",
      glassBg: "rgba(255, 255, 255, 0.75)",
      glassBorder: "rgba(184, 188, 196, 0.2)",
      heroBg: "radial-gradient(ellipse at top right, #f8f9fa 0%, #e2e4e8 40%, #ffffff 100%)"
    },
    fonts: {
      heading: "var(--font-playfair)",
      body: "var(--font-montserrat)",
      accent: "var(--font-great-vibes)"
    },
    hero_text: {
      title: "A Fresh Chapter",
      desc: "Minimalist and fresh setups to welcome the new year with elegance, silver accents, and pure joy.",
      accent: "new beginnings"
    },
    is_active: false,
    is_default: false,
    priority: 10
  }
];

async function seed() {
  console.log("Seeding themes...");
  for (const theme of initialThemes) {
    const { error } = await supabase.from('themes').upsert(theme, { onConflict: 'name' });
    if (error) {
      console.error(`Error inserting theme ${theme.name}:`, error);
    } else {
      console.log(`Inserted theme: ${theme.name}`);
    }
  }
  
  // Set light as the active theme in settings just in case (though we will deprecate this)
  await supabase.from('settings').upsert({ key: 'active_theme', value: 'light' });
  console.log("Done seeding themes.");
}

seed();
