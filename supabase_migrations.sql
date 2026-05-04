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

DROP POLICY IF EXISTS "Public can insert reviews" ON reviews;
CREATE POLICY "Public can insert reviews" ON reviews FOR INSERT TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "Public can view approved reviews" ON reviews;
CREATE POLICY "Public can view approved reviews" ON reviews FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Admin can manage reviews" ON reviews;
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
  tag text,
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

-- 5. Settings Table
CREATE TABLE IF NOT EXISTS settings (
  key text PRIMARY KEY,
  value text NOT NULL,
  updated_at timestamptz DEFAULT now()
);

INSERT INTO settings (key, value) VALUES ('active_theme', 'light')
ON CONFLICT (key) DO NOTHING;

-- Ensure newer columns exist if the table was already created
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS delivery_method text;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS room_transport text;
ALTER TABLE packages ADD COLUMN IF NOT EXISTS tag text;
ALTER TABLE packages ADD COLUMN IF NOT EXISTS type text DEFAULT 'gift_box';
ALTER TABLE shop_items ADD COLUMN IF NOT EXISTS price_range text;

-- Admin Management Policies
ALTER TABLE shop_items ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can view active items" ON shop_items;
CREATE POLICY "Public can view active items" ON shop_items FOR SELECT TO anon, authenticated USING (active = true);
DROP POLICY IF EXISTS "Admin can manage items" ON shop_items;
CREATE POLICY "Admin can manage items" ON shop_items FOR ALL TO anon, authenticated USING (true);

ALTER TABLE packages ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can view active packages" ON packages;
CREATE POLICY "Public can view active packages" ON packages FOR SELECT TO anon, authenticated USING (active = true);
DROP POLICY IF EXISTS "Admin can manage packages" ON packages;
CREATE POLICY "Admin can manage packages" ON packages FOR ALL TO anon, authenticated USING (true);

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can insert bookings" ON bookings;
CREATE POLICY "Public can insert bookings" ON bookings FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "Admin can manage bookings" ON bookings;
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
('raffaello', 'Raffaello Chocolates', 60, 'Treats', 'Premium almond and coconut confections', 'Candy', '/item_chocolates.png', 'all', true),
('ferrero', 'Ferrero Rocher', 120, 'Treats', 'Gold-wrapped hazelnut milk chocolates', 'Gift', '/item_chocolates.png', 'all', true),
('jewelry', 'Jewelry', 50, 'Gifts', 'Elegant necklace or bracelet in a luxury box', 'Gem', '/item_jewelry.png', 'ladies', true),
('premium-jewelry', 'Premium Jewelry', 70, 'Gifts', 'High-end jewelry selection for special occasions', 'Gem', '/item_jewelry.png', 'ladies', true),
('wine', 'Wine', 90, 'Drinks', 'Carefully selected vintage for romantic evenings', 'Wine', '/item_wine.png', 'all', true),
('wallet', 'Wallet', 80, 'Gifts', 'Genuine leather wallet in a sleek design', 'Wallet', '/item_wallet.png', 'guys', true),
('custom-slippers', 'Custom Slippers', 100, 'Gifts', 'Comfortable plush slippers with custom embroidery', 'Footprints', '/item_shoes.png', 'guys', true),
('handwritten-letter', 'Custom Handwritten Letter', 30, 'Personal', 'Calligraphy letter on premium parchment paper', 'Mail', '/item_letter.png', 'all', true),
('vals-card', 'Valentine''s Day Card', 20, 'Personal', 'Handcrafted romantic card with your message', 'MailHeart', '/item_card.png', 'all', true),
('nike-slides', 'Nike Slides', 150, 'Gifts', 'Authentic Nike comfort slides for him', 'Footprints', '/item_shoes.png', 'guys', true),
('shirt', 'Shirt', 120, 'Gifts', 'High-quality cotton shirt in his size', 'Shirt', '/item_shirt.png', 'guys', true),
('db-perfume', 'David Beckham Perfume', 350, 'Gifts', 'Signature designer fragrance by David Beckham', 'Beaker', '/item_perfume.png', 'guys', true),
('food-basket', 'Food Basket', 250, 'Treats', 'Gourmet selection of snacks, fruits and delicacies', 'ShoppingBag', '/item_basket.png', 'all', true),
('oxford-shoes', 'Oxford Shoes', 300, 'Gifts', 'Classic handcrafted leather Oxford shoes', 'Footprints', '/item_shoes.png', 'guys', true),
('fuel-coupons', 'Fuel Coupons', 200, 'Gifts', 'Prepaid fuel vouchers for easy mobility', 'Fuel', '/item_coupons.png', 'guys', true),
('room-diffuser', 'Room Diffuser', 120, 'Decor', 'Essential oil diffuser for a romantic atmosphere', 'Wind', '/item_diffuser.png', 'all', true),
('car-freshener', 'Car Freshener', 30, 'Decor', 'Premium scent for his vehicle', 'TreePine', '/item_freshener.png', 'guys', true),
('birkenstocks', 'Birkenstocks', 325, 'Gifts', 'Authentic comfort footwear by Birkenstock', 'Footprints', '/item_shoes.png', 'all', true),
('body-products', 'Body Products', 150, 'Personal', 'Luxury grooming and body care collection', 'Droplet', '/item_body_products.png', 'all', true),
('custom-jersey', 'Custom Jersey', 200, 'Gifts', 'His favourite team''s jersey with custom name', 'Shirt', '/item_jersey.png', 'guys', true),
('grooming-products', 'Grooming Products', 150, 'Personal', 'Complete beard and face care grooming set', 'Scissors', '/item_grooming.png', 'guys', true),
('single-rose', 'Single Rose', 20, 'Flowers', 'A timeless symbol of love and affection', 'Flower2', '/flower_rose.png', 'all', true),
('rose-bouquet-12', 'Rose Bouquet (12)', 150, 'Flowers', 'A dozen premium long-stem red roses', 'Flower', '/flower_bouquet_12.png', 'all', true),
('rose-bouquet-24', 'Rose Bouquet (24)', 280, 'Flowers', 'Two dozen premium roses, beautifully wrapped', 'Flower2', '/flower_bouquet_24.png', 'all', true),
('mixed-bouquet', 'Mixed Floral Bouquet', 200, 'Flowers', 'Seasonal mixed flowers in a stunning arrangement', 'Flower2', '/flower_mixed.png', 'all', true),
('sunflowers', 'Sunflower Bouquet', 100, 'Flowers', 'Bright and cheerful sunflowers to lift any mood', 'Sun', '/flower_sunflowers.png', 'all', true),
('lilies', 'White Lilies', 120, 'Flowers', 'Elegant pure white lilies in a classic wrap', 'Flower', '/flower_lilies.png', 'all', true),
('custom-arrangement', 'Custom Arrangement', 350, 'Flowers', 'Bespoke floral design crafted for your unique occasion', 'Sparkles', '/flower_custom.png', 'all', true),
('condolence-wreath', 'Condolence Wreath', 250, 'Flowers', 'A dignified white flower wreath for funerals and tributes', 'Circle', '/flower_wreath.png', 'all', true)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  category = EXCLUDED.category,
  description = EXCLUDED.description,
  emoji = EXCLUDED.emoji,
  image = EXCLUDED.image,
  gender = EXCLUDED.gender,
  active = EXCLUDED.active;

-- Seed Packages
INSERT INTO packages (id, name, price, items, gender, tag, active) VALUES
('el-capo', 'EL CAPO', 250, ARRAY['raffaello', 'jewelry', 'wine', 'vals-card'], 'guys', null, true),
('non-anchora', 'NON ANCHORA', 350, ARRAY['raffaello', 'jewelry', 'wallet', 'wine', 'vals-card'], 'guys', null, true),
('fuori-orario', 'FUORI ORARIO', 500, ARRAY['raffaello', 'jewelry', 'wallet', 'wine', 'custom-slippers', 'handwritten-letter'], 'guys', null, true),
('il-devoto', 'IL DEVOTO', 700, ARRAY['raffaello', 'jewelry', 'wallet', 'wine', 'custom-slippers', 'nike-slides', 'handwritten-letter'], 'guys', 'Most Popular', true),
('re-del-mio', 'RE DEL MIO', 830, ARRAY['raffaello', 'jewelry', 'wallet', 'wine', 'custom-slippers', 'nike-slides', 'shirt', 'handwritten-letter'], 'guys', null, true),
('perche-sei-mio', 'PERCHÉ SEI MIO', 1400, ARRAY['ferrero', 'premium-jewelry', 'wallet', 'wine', 'custom-slippers', 'db-perfume', 'nike-slides', 'shirt', 'handwritten-letter'], 'guys', null, true),
('oltre-leternita', 'OLTRE L''ETERNITÀ', 2000, ARRAY['ferrero', 'premium-jewelry', 'wallet', 'wine', 'custom-slippers', 'nike-slides', 'db-perfume', 'shirt', 'food-basket', 'oxford-shoes', 'handwritten-letter'], 'guys', null, true),
('bella', 'BELLA', 250, ARRAY['raffaello', 'jewelry', 'vals-card'], 'ladies', null, true),
('cara-mia', 'CARA MIA', 350, ARRAY['raffaello', 'jewelry', 'wine', 'vals-card'], 'ladies', null, true),
('dolce-vita', 'DOLCE VITA', 500, ARRAY['raffaello', 'premium-jewelry', 'wine', 'body-products', 'handwritten-letter'], 'ladies', null, true),
('la-principessa', 'LA PRINCIPESSA', 700, ARRAY['ferrero', 'premium-jewelry', 'wine', 'body-products', 'handwritten-letter', 'room-diffuser'], 'ladies', 'Most Popular', true),
('il-tesoro', 'IL TESORO', 850, ARRAY['ferrero', 'premium-jewelry', 'wine', 'body-products', 'handwritten-letter', 'room-diffuser', 'vals-card'], 'ladies', null, true),
('la-regina', 'LA REGINA', 1400, ARRAY['ferrero', 'premium-jewelry', 'wine', 'body-products', 'handwritten-letter', 'room-diffuser', 'birkenstocks'], 'ladies', null, true),
('lamore-eterno', 'L''AMORE ETERNO', 2000, ARRAY['ferrero', 'premium-jewelry', 'wine', 'body-products', 'handwritten-letter', 'room-diffuser', 'birkenstocks', 'food-basket'], 'ladies', null, true)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  items = EXCLUDED.items,
  gender = EXCLUDED.gender,
  tag = EXCLUDED.tag,
  active = EXCLUDED.active;

-- Seed Mother's Day Shop Items
-- (Safety: ensure new columns exist before inserting)
ALTER TABLE shop_items ADD COLUMN IF NOT EXISTS price_range text;
ALTER TABLE packages ADD COLUMN IF NOT EXISTS type text DEFAULT 'gift_box';
INSERT INTO shop_items (id, name, price, price_range, category, description, emoji, image, gender, active) VALUES
('basmati-1kg', '1 kg Basmati rice', 40, null, 'Groceries', 'Premium basmati rice', 'RiceBowl', '/item_rice.png', 'all', true),
('basmati-2kg', '2 kg Basmati rice', 80, null, 'Groceries', 'Premium basmati rice', 'RiceBowl', '/item_rice.png', 'all', true),
('basmati-5kg', '5 kg Basmati rice', 200, null, 'Groceries', 'Premium basmati rice', 'RiceBowl', '/item_rice.png', 'all', true),
('sunflower-oil', 'Sunflower Oil', 50, null, 'Groceries', 'Healthy sunflower cooking oil', 'Droplet', '/item_oil.png', 'all', true),
('tomato-paste', 'Tomato paste', 20, null, 'Groceries', 'Rich tomato paste', 'Tomato', '/item_tomato.png', 'all', true),
('tea-bags', 'Tea bags', 30, null, 'Groceries', 'Premium tea bags', 'Coffee', '/item_tea.png', 'all', true),
('spaghetti', 'Spaghetti', 15, null, 'Groceries', 'Long pasta', 'Utensils', '/item_pasta.png', 'all', true),
('milk', 'Milk', 40, null, 'Groceries', 'Evaporated milk', 'Milk', '/item_milk.png', 'all', true),
('sardines', 'Sardines', 25, null, 'Groceries', 'Canned sardines', 'Fish', '/item_sardine.png', 'all', true),
('juice', 'Juice', 35, null, 'Drinks', 'Fruit juice', 'CupSoda', '/item_juice.png', 'all', true),
('napkin', 'Napkin', 10, null, 'Decor', 'Table napkins', 'Square', '/item_napkin.png', 'all', true),
('card', 'Card', 50, null, 'Personal', 'Custom greeting card', 'Mail', '/item_card.png', 'all', true),
('oats', 'Oats', 45, null, 'Groceries', 'Rolled oats', 'Bowl', '/item_oats.png', 'all', true),
('corned-beef', 'Corned beef', 60, null, 'Groceries', 'Canned corned beef', 'Beef', '/item_beef.png', 'all', true),
('milo', 'Milo', 55, null, 'Groceries', 'Chocolate malt powder', 'Coffee', '/item_milo.png', 'all', true),
('brown-sugar', 'Brown Sugar', 30, null, 'Groceries', 'Natural brown sugar', 'Box', '/item_sugar.png', 'all', true),
('baked-beans', 'Baked Beans', 25, null, 'Groceries', 'Canned baked beans', 'Bean', '/item_beans.png', 'all', true),
('ketchup', 'Ketchup', 20, null, 'Groceries', 'Tomato ketchup', 'Bottle', '/item_ketchup.png', 'all', true),
('mayonnaise', 'Mayonnaise', 35, null, 'Groceries', 'Creamy mayonnaise', 'Bottle', '/item_mayo.png', 'all', true),
('corned-flakes', 'Corned Flakes', 40, null, 'Groceries', 'Breakfast cereal', 'Bowl', '/item_cereal.png', 'all', true),
('bread-spread', 'Bread spread', 45, null, 'Groceries', 'Butter or margarine', 'Sandwich', '/item_spread.png', 'all', true),
('custard', 'Custard', 35, null, 'Groceries', 'Custard powder', 'Bowl', '/item_custard.png', 'all', true),
('mackerel', 'Mackerel', 30, null, 'Groceries', 'Canned mackerel', 'Fish', '/item_mackerel.png', 'all', true),
('mug', 'Mug', 40, null, 'Gifts', 'Customized mug', 'Coffee', '/item_mug.png', 'all', true),
('hitarget-3', '3 yards Hitarget Cloth', 150, null, 'Gifts', 'Authentic African print fabric', 'Scissors', '/item_cloth.png', 'ladies', true),
('hitarget-4', '4 yards Hitarget Cloth', 200, null, 'Gifts', 'Authentic African print fabric', 'Scissors', '/item_cloth.png', 'ladies', true),
('hitarget-6', '6 yards Hitarget Cloth', 300, null, 'Gifts', 'Authentic African print fabric', 'Scissors', '/item_cloth.png', 'ladies', true),
('vs-splash', 'Victoria''s Secret Splash', 140, null, 'Gifts', 'Body mist', 'Spray', '/item_perfume.png', 'ladies', true),
('necklace', 'Necklace', 100, null, 'Gifts', 'Elegant necklace', 'Gem', '/item_jewelry.png', 'ladies', true),
('scarf', 'Scarf', 100, null, 'Gifts', 'Silk scarf', 'Wind', '/item_scarf.png', 'ladies', true),
('earrings', 'Earrings set', 50, null, 'Gifts', 'Beautiful earrings', 'Gem', '/item_jewelry.png', 'ladies', true),
('scented-candle', 'Scented Candle', 400, null, 'Decor', 'Luxury scented candle', 'Flame', '/item_candle.png', 'all', true),
('hand-fan', 'Hand Fan', 200, null, 'Gifts', 'Decorative hand fan', 'Wind', '/item_fan.png', 'ladies', true),
('ferrero-range', 'Ferrero Rocher chocolates', 90, '90-300', 'Treats', 'Hazelnut chocolates', 'Gift', '/item_chocolates.png', 'all', true),
('bracelet', 'Bracelet', 100, null, 'Gifts', 'Elegant bracelet', 'Gem', '/item_jewelry.png', 'ladies', true),
('dove-care', 'Dove care set', 300, null, 'Personal', 'Body care products', 'Droplet', '/item_body_products.png', 'ladies', true),
('purse', 'Purse', 200, null, 'Gifts', 'Women''s purse', 'Wallet', '/item_purse.png', 'ladies', true),
('watch', 'Watch', 200, null, 'Gifts', 'Elegant wristwatch', 'Clock', '/item_watch.png', 'ladies', true),
('diffuser-2', 'Diffuser', 200, null, 'Decor', 'Room diffuser', 'Wind', '/item_diffuser.png', 'all', true),
('perfume-range', 'Perfume', 200, '200-5000', 'Gifts', 'Luxury perfume', 'Beaker', '/item_perfume.png', 'ladies', true),
('wine-range', 'Wine', 150, '150-5000', 'Drinks', 'Premium wine', 'Wine', '/item_wine.png', 'all', true),
('hand-bag', 'Hand bag', 300, null, 'Gifts', 'Luxury handbag', 'ShoppingBag', '/item_bag.png', 'ladies', true),
('cadbury', 'Cadbury gift chocolate set', 200, null, 'Treats', 'Chocolate assortment', 'Candy', '/item_chocolates.png', 'all', true),
('jollof', 'Jollof', 80, null, 'Treats', 'Delicious Ghana Jollof', 'Utensils', '/item_food.png', 'all', true),
('jollof-2', 'Jollof-2', 160, null, 'Treats', 'Double portion Jollof', 'Utensils', '/item_food.png', 'all', true),
('fried-rice', 'Fried rice', 80, null, 'Treats', 'Delicious Fried Rice', 'Utensils', '/item_food.png', 'all', true),
('fried-rice-2', 'Fried rice-2', 160, null, 'Treats', 'Double portion Fried Rice', 'Utensils', '/item_food.png', 'all', true),
('pastries', 'Pastries', 100, null, 'Treats', 'Assorted pastries', 'Croissant', '/item_pastries.png', 'all', true),
('water', 'Water', 10, null, 'Drinks', 'Bottled water', 'Droplet', '/item_water.png', 'all', true),
('meat-bowl', 'Meat bowl', 120, null, 'Treats', 'Assorted meat platter', 'Beef', '/item_meat.png', 'all', true),
('salad', 'Salad', 50, null, 'Treats', 'Fresh vegetable salad', 'Leaf', '/item_salad.png', 'all', true),
('stir-spaghetti', 'Stir fried spaghetti', 90, null, 'Treats', 'Stir-fried pasta', 'Utensils', '/item_pasta.png', 'all', true),
('stir-spaghetti-2', 'Stir fried spaghetti-2', 180, null, 'Treats', 'Double portion pasta', 'Utensils', '/item_pasta.png', 'all', true),
('fruits', 'Fruits', 80, null, 'Treats', 'Fresh fruit platter', 'Apple', '/item_fruits.png', 'all', true),
('bento-cake', 'Custom bento cake', 150, null, 'Treats', 'Mini customized cake', 'Cake', '/item_cake.png', 'all', true),
('milkshake', 'Milkshake', 60, null, 'Drinks', 'Creamy milkshake', 'CupSoda', '/item_juice.png', 'all', true),
('snacks', 'Snacks', 100, null, 'Treats', 'Assorted snacks', 'Cookie', '/item_snacks.png', 'all', true)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  price_range = EXCLUDED.price_range,
  category = EXCLUDED.category,
  description = EXCLUDED.description,
  emoji = EXCLUDED.emoji,
  image = EXCLUDED.image,
  gender = EXCLUDED.gender,
  active = EXCLUDED.active;

-- Seed Mother's Day Packages
INSERT INTO packages (id, name, price, type, items, gender, tag, active) VALUES
-- Hampers
('hamper-p1', 'P1 Hamper', 380, 'hamper', ARRAY['basmati-1kg', 'sunflower-oil', 'tomato-paste', 'tea-bags', 'spaghetti', 'milk', 'sardines'], 'ladies', 'Hamper', true),
('hamper-p2', 'P2 Hamper', 480, 'hamper', ARRAY['basmati-2kg', 'sunflower-oil', 'tomato-paste', 'tea-bags', 'spaghetti', 'milk', 'juice', 'napkin', 'sardines', 'card'], 'ladies', 'Hamper', true),
('hamper-p3', 'P3 Hamper', 580, 'hamper', ARRAY['basmati-5kg', 'tomato-paste', 'sunflower-oil', 'tea-bags', 'spaghetti', 'milk', 'oats', 'juice', 'napkin', 'sardines', 'card'], 'ladies', 'Hamper', true),
('hamper-p4', 'P4 Hamper', 750, 'hamper', ARRAY['basmati-5kg', 'tomato-paste', 'sunflower-oil', 'tea-bags', 'spaghetti', 'corned-beef', 'oats', 'milo', 'milk', 'napkin', 'juice', 'sardines', 'card'], 'ladies', 'Hamper', true),
('hamper-p5', 'P5 Hamper', 900, 'hamper', ARRAY['basmati-5kg', 'brown-sugar', 'tomato-paste', 'sunflower-oil', 'spaghetti', 'tea-bags', 'oats', 'baked-beans', 'ketchup', 'mayonnaise', 'corned-beef', 'milo', 'milk', 'napkin', 'juice', 'sardines', 'card'], 'ladies', 'Hamper', true),
('hamper-p6', 'P6 Hamper', 1500, 'hamper', ARRAY['basmati-5kg', 'spaghetti', 'oats', 'tea-bags', 'corned-flakes', 'brown-sugar', 'tomato-paste', 'sunflower-oil', 'baked-beans', 'ketchup', 'mayonnaise', 'corned-beef', 'bread-spread', 'custard', 'wine-range', 'milo', 'milk', 'mackerel', 'mug', 'juice', 'card'], 'ladies', 'Hamper', true),
-- Gift Boxes
('giftbox-1', 'DETALLE ESPECIAL', 380, 'gift_box', ARRAY['hitarget-3', 'vs-splash', 'necklace', 'card'], 'ladies', 'Gift Box', true),
('giftbox-2', 'DETALLES QUE ABRAZAN', 580, 'gift_box', ARRAY['hitarget-3', 'vs-splash', 'scarf', 'necklace', 'earrings', 'card'], 'ladies', 'Gift Box', true),
('giftbox-3', 'MOMENTOS PARA ELLA', 750, 'gift_box', ARRAY['hitarget-3', 'vs-splash', 'scented-candle', 'hand-fan', 'scarf', 'necklace', 'earrings', 'ferrero-range', 'card'], 'ladies', 'Gift Box', true),
('giftbox-4', 'AMOR EN CADA DETALLE', 880, 'gift_box', ARRAY['hitarget-4', 'vs-splash', 'hand-fan', 'scented-candle', 'scarf', 'necklace', 'earrings', 'bracelet', 'ferrero-range', 'card'], 'ladies', 'Gift Box', true),
('giftbox-5', 'AMOR INOLVIDABLE', 1200, 'gift_box', ARRAY['hitarget-6', 'vs-splash', 'scented-candle', 'dove-care', 'hand-fan', 'wine-range', 'ferrero-range', 'scarf', 'necklace', 'bracelet', 'earrings', 'card'], 'ladies', 'Gift Box', true),
('giftbox-6', 'PARA MAMÁ, CON TODO MI AMOR', 1500, 'gift_box', ARRAY['hitarget-6', 'vs-splash', 'scented-candle', 'dove-care', 'purse', 'hand-fan', 'watch', 'wine-range', 'ferrero-range', 'scarf', 'necklace', 'bracelet', 'earrings', 'card'], 'ladies', 'Gift Box', true),
('giftbox-7', 'LUJO, AMOR Y GRATITUD', 1750, 'gift_box', ARRAY['hitarget-6', 'vs-splash', 'scented-candle', 'dove-care', 'purse', 'hand-fan', 'diffuser-2', 'perfume-range', 'ferrero-range', 'watch', 'wine-range', 'scarf', 'necklace', 'bracelet', 'earrings', 'card'], 'ladies', 'Gift Box', true),
('giftbox-8', 'LA MEJOR MAMÁ, LO MERECE TODO', 2250, 'gift_box', ARRAY['hitarget-6', 'hand-bag', 'vs-splash', 'scented-candle', 'dove-care', 'purse', 'hand-fan', 'diffuser-2', 'perfume-range', 'watch', 'cadbury', 'wine-range', 'scarf', 'necklace', 'bracelet', 'earrings', 'card'], 'ladies', 'Gift Box', true),
-- Food Baskets
('foodbasket-1', 'P1 Food Basket', 450, 'food_basket', ARRAY['jollof', 'fried-rice', 'pastries', 'juice', 'water', 'card'], 'ladies', 'Food Basket', true),
('foodbasket-2', 'P2 Food Basket', 750, 'food_basket', ARRAY['jollof', 'fried-rice', 'meat-bowl', 'salad', 'pastries', 'juice', 'water', 'card'], 'ladies', 'Food Basket', true),
('foodbasket-3', 'P3 Food Basket', 900, 'food_basket', ARRAY['jollof', 'fried-rice', 'stir-spaghetti', 'salad', 'meat-bowl', 'pastries', 'juice', 'water', 'fruits', 'card'], 'ladies', 'Food Basket', true),
('foodbasket-4', 'P4 Food Basket', 1600, 'food_basket', ARRAY['jollof-2', 'fried-rice-2', 'stir-spaghetti-2', 'salad', 'meat-bowl', 'pastries', 'bento-cake', 'juice', 'milkshake', 'wine-range', 'snacks', 'water', 'fruits', 'card'], 'ladies', 'Food Basket', true)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  type = EXCLUDED.type,
  items = EXCLUDED.items,
  gender = EXCLUDED.gender,
  tag = EXCLUDED.tag,
  active = EXCLUDED.active;

-- Seed Bookings (Orders)
INSERT INTO bookings (name, phone, recipient_name, recipient_phone, event_date, event_time, location, theme, instructions, base_service, room_vibe, items, total_amount, delivery_method, room_transport, status) VALUES
('Kwame Mensah', '0241234567', 'Akosua Asare', '0549876543', '2026-05-14', '14:00', 'KNUST Campus, Republic Hall', 'Red and Gold', 'Please call before arriving, it is a surprise.', 'Surprise Package', null, '[{"id": "bella", "name": "BELLA", "price": 250, "image": "👑", "quantity": 1}]', 300, 'Bike Delivery', null, 'completed'),
('Ama Serwaa', '0205556666', 'Yaw Boakye', '0244445555', '2026-06-20', '18:30', 'Tech Junction, Apartment 4B', 'Dark Academic', 'Leave the package at the front desk if he is not in.', 'Room Aesthetics', 'Romantic', '[{"id": "el-capo", "name": "EL CAPO", "price": 250, "image": "👑", "quantity": 1}]', 550, 'Car Delivery', 'Car Transport', 'confirmed'),
('David Osei', '0551112222', 'Efua Osei', '0263334444', '2026-07-01', '10:00', 'Ahodwo Roundabout, House 12', 'Pastel Pink', 'Call my sister when you get there.', 'Custom Setup', null, '[{"id": "ferrero", "name": "Ferrero Rocher", "price": 120, "image": "🍫", "quantity": 2}, {"id": "jewelry", "name": "Jewelry", "price": 50, "image": "💍", "quantity": 1}]', 340, 'Pickup', null, 'pending');

-- 6. Themes Table
CREATE TABLE IF NOT EXISTS themes (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL UNIQUE,
  type text NOT NULL DEFAULT 'default', -- 'default' | 'occasion'
  colors jsonb NOT NULL,
  fonts jsonb NOT NULL,
  background_image text,
  default_items jsonb,
  hero_text jsonb,
  is_active boolean DEFAULT false,
  is_default boolean DEFAULT false,
  priority int DEFAULT 0,
  start_date timestamptz,
  end_date timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Themes Policies
ALTER TABLE themes ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can view themes" ON themes;
CREATE POLICY "Public can view themes" ON themes FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "Admin can manage themes" ON themes;
CREATE POLICY "Admin can manage themes" ON themes FOR ALL TO anon, authenticated USING (true);

-- 7. Storage Bucket for Item Images
INSERT INTO storage.buckets (id, name, public) VALUES ('item_images', 'item_images', true) ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Public can view item_images" ON storage.objects;
CREATE POLICY "Public can view item_images" ON storage.objects FOR SELECT TO public USING (bucket_id = 'item_images');

DROP POLICY IF EXISTS "Admin can insert item_images" ON storage.objects;
CREATE POLICY "Admin can insert item_images" ON storage.objects FOR INSERT TO public WITH CHECK (bucket_id = 'item_images');

DROP POLICY IF EXISTS "Admin can update item_images" ON storage.objects;
CREATE POLICY "Admin can update item_images" ON storage.objects FOR UPDATE TO public USING (bucket_id = 'item_images');

DROP POLICY IF EXISTS "Admin can delete item_images" ON storage.objects;
CREATE POLICY "Admin can delete item_images" ON storage.objects FOR DELETE TO public USING (bucket_id = 'item_images');
