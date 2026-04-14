export interface Article {
  id: string;
  title_ka: string;
  title_en: string;
  slug: string;
  content_ka: string;
  content_en: string;
  category: string;
  cover_image_url: string;
  author: string;
  published_at: string;
  is_published: boolean;
  meta_title: string;
  meta_description: string;
  read_time: number;
}

export interface MagazineIssue {
  id: string;
  issue_number: number;
  title_ka: string;
  title_en: string;
  cover_image_url: string;
  pdf_url: string;
  published_date: string;
  topics_ka: string[];
  topics_en: string[];
  is_published: boolean;
}

export interface Event {
  id: string;
  title_ka: string;
  title_en: string;
  description_ka: string;
  description_en: string;
  date: string;
  venue_ka: string;
  venue_en: string;
  cover_image_url: string;
  capacity: number;
  is_registration_open: boolean;
  is_published: boolean;
}

export interface EventRegistration {
  id: string;
  event_id: string;
  name: string;
  company: string;
  position: string;
  email: string;
  phone: string;
  created_at: string;
}

export interface Partner {
  id: string;
  company_name: string;
  logo_url: string;
  website_url: string;
  tier: 'print' | 'event' | 'full';
  category: string;
  is_visible: boolean;
  order_index: number;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
  is_read: boolean;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  created_at: string;
  is_active: boolean;
}

export interface PartnerApplication {
  id: string;
  company_name: string;
  industry: string;
  contact_person: string;
  email: string;
  phone: string;
  partnership_interest: string[];
  message: string;
  created_at: string;
}

export type Locale = 'ka' | 'en';
export type ArticleCategory = 'business' | 'fashion' | 'lifestyle' | 'hospitality' | 'gastronomy';
