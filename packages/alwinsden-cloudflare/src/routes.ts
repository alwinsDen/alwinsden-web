import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('./App.tsx'),
  route('alwin', './pages/teamProfiles/alwint.tsx'),
  route('articles', './pages/articles/articleList.tsx'),
  route('articles/:slug', './pages/articles/articlePost.tsx'),
  route('demo/wasm-transpiler', './apps/wasm-transpiler/index.tsx'),
  route('process/synapse', './apps/synapse/index.tsx'),
  // Catch-all: keeps unmatched URLs (Chrome DevTools probes, junk bot paths)
  // from throwing "No route matches URL" server errors.
  route('*', './pages/notFound.tsx'),
] satisfies RouteConfig;
