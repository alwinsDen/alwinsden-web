/**
 * Symlink root node_modules into each package so the editor and TypeScript
 * resolve imports (e.g. react, vite) when editing files inside packages/*.
 * Root package.json remains the single source of dependencies.
 */
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const rootNodeModules = path.join(root, 'node_modules');
const packages = ['packages/alwinsden-docs', 'packages/alwinsden-cloudflare'];

if (!fs.existsSync(rootNodeModules)) {
  console.warn('scripts/link-node-modules: root node_modules not found, run pnpm install first');
  process.exit(0);
}

const isWin = process.platform === 'win32';

packages.forEach((pkg) => {
  const nodeModules = path.join(root, pkg, 'node_modules');
  if (fs.existsSync(nodeModules)) return;
  const target = path.relative(path.dirname(nodeModules), rootNodeModules);
  try {
    fs.symlinkSync(target, nodeModules, isWin ? 'junction' : 'dir');
    console.log('Linked', pkg, 'node_modules -> root node_modules');
  } catch (err) {
    console.warn('Could not link', nodeModules, err.message);
  }
});
