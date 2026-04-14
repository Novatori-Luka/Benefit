import { Toaster } from 'react-hot-toast';

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#000',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: '0',
            fontFamily: 'var(--font-inter)',
            fontSize: '13px',
          },
        }}
      />
      {children}
    </>
  );
}
