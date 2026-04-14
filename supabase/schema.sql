-- ============================================================
-- BENEFIT Magazine — Supabase Database Schema
-- Run this in Supabase SQL Editor
-- ============================================================

-- Articles / Blog
CREATE TABLE IF NOT EXISTS articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title_ka TEXT NOT NULL,
  title_en TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content_ka TEXT DEFAULT '',
  content_en TEXT DEFAULT '',
  category TEXT NOT NULL DEFAULT 'business',
  cover_image_url TEXT DEFAULT '',
  author TEXT NOT NULL,
  published_at TIMESTAMPTZ DEFAULT NOW(),
  is_published BOOLEAN DEFAULT FALSE,
  meta_title TEXT DEFAULT '',
  meta_description TEXT DEFAULT '',
  read_time INTEGER DEFAULT 5,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Magazine Issues
CREATE TABLE IF NOT EXISTS magazine_issues (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  issue_number INTEGER NOT NULL,
  title_ka TEXT NOT NULL,
  title_en TEXT NOT NULL,
  cover_image_url TEXT DEFAULT '',
  pdf_url TEXT DEFAULT '',
  published_date DATE NOT NULL,
  topics_ka TEXT[] DEFAULT '{}',
  topics_en TEXT[] DEFAULT '{}',
  is_published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Events
CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title_ka TEXT NOT NULL,
  title_en TEXT NOT NULL,
  description_ka TEXT DEFAULT '',
  description_en TEXT DEFAULT '',
  date TIMESTAMPTZ NOT NULL,
  venue_ka TEXT DEFAULT '',
  venue_en TEXT DEFAULT '',
  cover_image_url TEXT DEFAULT '',
  capacity INTEGER DEFAULT 100,
  is_registration_open BOOLEAN DEFAULT TRUE,
  is_published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Event Registrations
CREATE TABLE IF NOT EXISTS event_registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  company TEXT DEFAULT '',
  position TEXT DEFAULT '',
  email TEXT NOT NULL,
  phone TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Partners
CREATE TABLE IF NOT EXISTS partners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name TEXT NOT NULL,
  logo_url TEXT DEFAULT '',
  website_url TEXT DEFAULT '',
  tier TEXT NOT NULL DEFAULT 'print' CHECK (tier IN ('print', 'event', 'full')),
  category TEXT DEFAULT '',
  is_visible BOOLEAN DEFAULT TRUE,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Contact Messages
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  is_read BOOLEAN DEFAULT FALSE
);

-- Newsletter Subscribers
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  is_active BOOLEAN DEFAULT TRUE
);

-- Partner Applications
CREATE TABLE IF NOT EXISTS partner_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name TEXT NOT NULL,
  industry TEXT DEFAULT '',
  contact_person TEXT DEFAULT '',
  email TEXT NOT NULL,
  phone TEXT DEFAULT '',
  partnership_interest TEXT[] DEFAULT '{}',
  message TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- RLS (Row Level Security) Policies
-- ============================================================

ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE magazine_issues ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE partner_applications ENABLE ROW LEVEL SECURITY;

-- Public can read published content
CREATE POLICY "Public read published articles" ON articles FOR SELECT USING (is_published = TRUE);
CREATE POLICY "Public read published issues" ON magazine_issues FOR SELECT USING (is_published = TRUE);
CREATE POLICY "Public read published events" ON events FOR SELECT USING (is_published = TRUE);
CREATE POLICY "Public read visible partners" ON partners FOR SELECT USING (is_visible = TRUE);

-- Public can insert (forms)
CREATE POLICY "Public insert registrations" ON event_registrations FOR INSERT WITH CHECK (TRUE);
CREATE POLICY "Public insert contact" ON contact_messages FOR INSERT WITH CHECK (TRUE);
CREATE POLICY "Public insert newsletter" ON newsletter_subscribers FOR INSERT WITH CHECK (TRUE);
CREATE POLICY "Public insert applications" ON partner_applications FOR INSERT WITH CHECK (TRUE);
CREATE POLICY "Public upsert newsletter" ON newsletter_subscribers FOR UPDATE USING (TRUE);

-- Authenticated (admin) can do everything
CREATE POLICY "Admin full access articles" ON articles FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access issues" ON magazine_issues FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access events" ON events FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access registrations" ON event_registrations FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access partners" ON partners FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access messages" ON contact_messages FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access newsletter" ON newsletter_subscribers FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access applications" ON partner_applications FOR ALL USING (auth.role() = 'authenticated');

-- ============================================================
-- Indexes for performance
-- ============================================================
CREATE INDEX IF NOT EXISTS articles_slug_idx ON articles(slug);
CREATE INDEX IF NOT EXISTS articles_category_idx ON articles(category);
CREATE INDEX IF NOT EXISTS articles_published_idx ON articles(is_published, published_at DESC);
CREATE INDEX IF NOT EXISTS events_date_idx ON events(date DESC);
CREATE INDEX IF NOT EXISTS partners_order_idx ON partners(order_index);
