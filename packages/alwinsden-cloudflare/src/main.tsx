import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import './index.css';
import App from './App.tsx';
import AlwinT from './pages/teamProfiles/alwint.tsx';
import WasmTranspiler from './apps/wasm-transpiler/index.tsx';
import SynapseUI from './apps/synapse/index.tsx';
const router = createBrowserRouter([
  { path: 'alwin', Component: AlwinT },
  { path: 'demo/wasm-transpiler', Component: WasmTranspiler },
  { path: 'process/synapse', Component: SynapseUI },
  {
    path: '/',
    Component: App,
  },
]);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
