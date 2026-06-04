import { renderToString } from 'react-dom/server';
import App from './App.jsx';

// Called by scripts/prerender.js to produce the static HTML injected into index.html.
export function render() {
  return renderToString(<App />);
}
