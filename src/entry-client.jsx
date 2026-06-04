import './styles.css';
import './craft.css';
import { hydrateRoot, createRoot } from 'react-dom/client';
import App from './App.jsx';

const root = document.getElementById('root');

// Production builds prerender the app into #root (see scripts/prerender.js), so
// we hydrate. In dev there's no prerendered markup, so render from scratch.
if (root.firstElementChild) {
  hydrateRoot(root, <App />);
} else {
  createRoot(root).render(<App />);
}
