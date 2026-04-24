-- Run this in your Supabase SQL Editor

-- 1. Reviews Table
CREATE TABLE IF NOT EXISTS reviews (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  rating int NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment text NOT NULL,
  role text,
  created_at timestamptz DEFAULT now(),
  approved boolean DEFAULT false
);

-- Enable RLS for reviews
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can insert reviews" ON reviews FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Public can view approved reviews" ON reviews FOR SELECT TO anon, authenticated USING (true); -- or (approved = true)
CREATE POLICY "Admin can manage reviews" ON reviews FOR ALL TO authenticated USING (true);

-- 2. Shop Items Table
CREATE TABLE IF NOT EXISTS shop_items (
  id text PRIMARY KEY,
  name text NOT NULL,
  price int NOT NULL,
  category text NOT NULL,
  description text,
  emoji text,
  image text,
  gender text DEFAULT 'all', -- 'ladies', 'guys', 'all'
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- 3. Packages Table
CREATE TABLE IF NOT EXISTS packages (
  id text PRIMARY KEY,
  name text NOT NULL,
  price int NOT NULL,
  items text[], -- array of shop_item ids
  gender text DEFAULT 'all', -- 'ladies', 'guys', 'all'
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- 4. Bookings Table (Assuming it doesn't exist yet, if it does, omit this creation block)
CREATE TABLE IF NOT EXISTS bookings (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  phone text NOT NULL,
  recipient_name text NOT NULL,
  recipient_phone text NOT NULL,
  event_date text NOT NULL,
  event_time text NOT NULL,
  location text NOT NULL,
  theme text,
  instructions text,
  base_service text,
  room_vibe text,
  items jsonb, -- array of cart items
  total_amount int NOT NULL,
  delivery_method text,
  room_transport text,
  status text DEFAULT 'pending', -- 'pending', 'confirmed', 'completed', 'cancelled'
  created_at timestamptz DEFAULT now()
);

-- Admin Management Policies
ALTER TABLE shop_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view active items" ON shop_items FOR SELECT TO anon, authenticated USING (active = true);
CREATE POLICY "Admin can manage items" ON shop_items FOR ALL TO anon, authenticated USING (true);

ALTER TABLE packages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view active packages" ON packages FOR SELECT TO anon, authenticated USING (active = true);
CREATE POLICY "Admin can manage packages" ON packages FOR ALL TO anon, authenticated USING (true);

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can insert bookings" ON bookings FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Admin can manage bookings" ON bookings FOR ALL TO anon, authenticated USING (true);

-- ============================================================================
-- 📌 DUMMY DATA SEEDING
-- ============================================================================

-- Seed Reviews
INSERT INTO reviews (name, rating, comment, role, approved) VALUES
('Sarah K.', 5, 'The attention to detail was incredible. My husband was speechless! They made our regular Tuesday feel like a fairy tale.', 'Anniversary Surprise', true),
('Michael O.', 5, 'Fast, professional, and absolutely stunning. The room vibe was exactly what I wanted. Highly recommended!', 'Birthday Setup', true),
('Emily B.', 5, 'I wanted to surprise my bestie for no reason, and Curated Cupid delivered! The gift box was so thoughtful.', 'Just Because', true);

-- Seed Shop Items
INSERT INTO shop_items (id, name, price, category, description, emoji, image, gender, active) VALUES
('raffaello', 'Raffaello Chocolates', 60, 'Treats', 'Premium almond and coconut confections', '🍬', '/item_chocolates.png', 'all', true),
('ferrero', 'Ferrero Rocher', 120, 'Treats', 'Gold-wrapped hazelnut milk chocolates', '🍫', '/item_chocolates.png', 'all', true),
('jewelry', 'Jewelry', 50, 'Gifts', 'Elegant necklace or bracelet in a luxury box', '💍', '/item_jewelry.png', 'ladies', true),
('premium-jewelry', 'Premium Jewelry', 70, 'Gifts', 'High-end jewelry selection for special occasions', '💎', '/item_jewelry.png', 'ladies', true),
('wine', 'Wine', 90, 'Drinks', 'Carefully selected vintage for romantic evenings', '🍷', '/item_wine.png', 'all', true),
('wallet', 'Wallet', 80, 'Gifts', 'Genuine leather wallet in a sleek design', '👛', '/item_wallet.png', 'guys', true),
('custom-slippers', 'Custom Slippers', 100, 'Gifts', 'Comfortable plush slippers with custom embroidery', '🩴', '/item_shoes.png', 'guys', true),
('handwritten-letter', 'Custom Handwritten Letter', 30, 'Personal', 'Calligraphy letter on premium parchment paper', '✉️', null, 'all', true);

-- Seed Packages
INSERT INTO packages (id, name, price, items, gender, active) VALUES
('el-capo', 'EL CAPO', 250, ARRAY['raffaello', 'jewelry', 'wine', 'handwritten-letter'], 'guys', true),
('non-anchora', 'NON ANCHORA', 350, ARRAY['raffaello', 'jewelry', 'wallet', 'wine', 'handwritten-letter'], 'guys', true),
('bella', 'BELLA', 250, ARRAY['raffaello', 'jewelry', 'handwritten-letter'], 'ladies', true),
('dolce-vita', 'DOLCE VITA', 450, ARRAY['raffaello', 'premium-jewelry', 'wine', 'handwritten-letter'], 'ladies', true);

-- Seed Bookings (Orders)
INSERT INTO bookings (name, phone, recipient_name, recipient_phone, event_date, event_time, location, theme, instructions, base_service, room_vibe, items, total_amount, delivery_method, room_transport, status) VALUES
('Kwame Mensah', '0241234567', 'Akosua Asare', '0549876543', '2026-05-14', '14:00', 'KNUST Campus, Republic Hall', 'Red and Gold', 'Please call before arriving, it is a surprise.', 'Surprise Package', null, '[{"id": "bella", "name": "BELLA", "price": 250, "image": "👑", "quantity": 1}]', 300, 'Bike Delivery', null, 'completed'),
('Ama Serwaa', '0205556666', 'Yaw Boakye', '0244445555', '2026-06-20', '18:30', 'Tech Junction, Apartment 4B', 'Dark Academic', 'Leave the package at the front desk if he is not in.', 'Room Aesthetics', 'Romantic', '[{"id": "el-capo", "name": "EL CAPO", "price": 250, "image": "👑", "quantity": 1}]', 550, 'Car Delivery', 'Car Transport', 'confirmed'),
('David Osei', '0551112222', 'Efua Osei', '0263334444', '2026-07-01', '10:00', 'Ahodwo Roundabout, House 12', 'Pastel Pink', 'Call my sister when you get there.', 'Custom Setup', null, '[{"id": "ferrero", "name": "Ferrero Rocher", "price": 120, "image": "🍫", "quantity": 2}, {"id": "jewelry", "name": "Jewelry", "price": 50, "image": "💍", "quantity": 1}]', 340, 'Pickup', null, 'pending');
