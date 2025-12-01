import './globals.css';

export const metadata = {
  title: 'User Dashboard',
  description: 'User authentication and dashboard application',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
