import EventsPage from '@/components/events/EventsPage';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'BENEFIT Talks — Events' };

export default function Events() {
  return <EventsPage />;
}
