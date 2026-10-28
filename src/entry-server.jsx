import { renderToString } from "react-dom/server";
import App from "./App.jsx";
export { getRoutes, getPageMeta } from "./seo.js";
export function render(path = "/") {
  return renderToString(<App path={path} />);
}
