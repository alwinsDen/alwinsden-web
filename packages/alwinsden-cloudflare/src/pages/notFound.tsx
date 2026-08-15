import type { MetaFunction } from 'react-router';
import { data } from 'react-router';
import Entry from '../components/Entry';

// Return (not throw) a 404 status so unmatched URLs aren't indexed as soft-404s,
// while the route component below still renders.
export const loader = () => data(null, { status: 404 });

export const meta: MetaFunction = () => [
  { title: '404 — alw1nsDen' },
  { name: 'description', content: 'This page does not exist.' },
];

export default function NotFound() {
  return (
    <Entry backgroundColor="#fff">
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '60vh',
          gap: '12px',
          textAlign: 'center',
        }}
      >
        <h1>404</h1>
        <p>This page wandered off.</p>
        <a href="/">← Back to alw1nsDen</a>
      </div>
    </Entry>
  );
}
