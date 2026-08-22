import type { LinksFunction, MetaFunction } from 'react-router';
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router';
import icon from './assets/xgamma-icon.png';
import './index.css';

export const meta: MetaFunction = () => [
  { title: 'alw1nsDen' },
  { name: 'description', content: 'Away from syntax towards intent.' },
  { property: 'og:title', content: 'alw1nsDen' },
  { property: 'og:image', content: 'https://alwinsden.com/landscape-icon.png' },
  { property: 'og:type', content: 'website' },
  { name: 'twitter:card', content: 'summary_large_image' },
  { name: 'theme-color', content: '#F3DB00' },
];

export const links: LinksFunction = () => [
  { rel: 'icon', type: 'image/png', href: icon },
  {
    rel: 'preload',
    href: '/fonts/montserrat-latin.woff2',
    as: 'font',
    type: 'font/woff2',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'preload',
    href: '/fonts/eb-garamond-latin.woff2',
    as: 'font',
    type: 'font/woff2',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'preload',
    href: '/fonts/jacquard-24-latin.woff2',
    as: 'font',
    type: 'font/woff2',
    crossOrigin: 'anonymous',
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
