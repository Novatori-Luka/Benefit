import Link from 'next/link';

export default function GlobalNotFound() {
  return (
    <html>
      <body style={{ background: '#000', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', fontFamily: 'sans-serif', textAlign: 'center' }}>
        <div>
          <p style={{ fontSize: '8rem', fontWeight: 'bold', opacity: 0.1, lineHeight: 1, margin: 0 }}>404</p>
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '1rem' }}>Page Not Found</h1>
          <a href="/ka" style={{ display: 'inline-block', marginTop: '2rem', border: '1px solid rgba(255,255,255,0.3)', color: '#fff', padding: '1rem 2rem', textDecoration: 'none', fontSize: '12px', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            Go Home
          </a>
        </div>
      </body>
    </html>
  );
}
