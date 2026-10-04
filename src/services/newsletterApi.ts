import { NewsletterSubscriber } from '../types/freight';

interface NewsletterResponse {
  status: 'success' | 'error';
  message?: string;
  sender?: string;
  mailAvailable?: boolean;
  subscribers?: NewsletterSubscriber[];
}

export async function subscribeToNewsletter(email: string, consent: boolean, company = ''): Promise<string> {
  const response = await fetch('/api/newsletter.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, consent, company }),
  });
  const result = await response.json() as NewsletterResponse;
  if (!response.ok || result.status !== 'success') {
    throw new Error(result.message || 'Pendaftaran newsletter belum dapat diproses.');
  }
  return result.message || 'Periksa email untuk menyelesaikan pendaftaran.';
}

export async function fetchNewsletterSubscribers(): Promise<{
  subscribers: NewsletterSubscriber[];
  sender: string;
  mailAvailable: boolean;
}> {
  const response = await fetch('/api/newsletter.php', { credentials: 'same-origin', cache: 'no-store' });
  const result = await response.json() as NewsletterResponse;
  if (!response.ok || result.status !== 'success') {
    throw new Error(result.message || 'Daftar pelanggan belum dapat dimuat.');
  }
  return {
    subscribers: result.subscribers || [],
    sender: result.sender || 'news@gaeks.com',
    mailAvailable: Boolean(result.mailAvailable),
  };
}
