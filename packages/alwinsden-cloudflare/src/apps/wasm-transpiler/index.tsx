import type { MetaFunction } from 'react-router';

export const meta: MetaFunction = () => [
  { title: 'WASM Transpiler Demo — alw1nsDen' },
  {
    name: 'description',
    content: 'C++ compiled to WebAssembly, running in the browser.',
  },
  { property: 'og:title', content: 'WASM Transpiler Demo — alw1nsDen' },
];

const WasmTranspiler = () => {
  return (
    <div>
      test
      <button
        onClick={async () => {
          const wasmJsPath = `${window.location.origin}/wasm-transpiler/build/index.js`;
          // Emscripten glue JS is served from /public and loaded at runtime —
          // Vite must not try to bundle it, and it has no type declarations.
          const wasm_import = (await import(/* @vite-ignore */ wasmJsPath)) as {
            default: (opts: { locateFile: (path: string) => string }) => Promise<void>;
          };
          const loadWasm = wasm_import.default;
          await loadWasm({
            locateFile: (path) => {
              if (path.endsWith('.wasm')) {
                return '/wasm-transpiler/build/index.wasm';
              }
              return path;
            },
          });
        }}
      >
        test
      </button>
    </div>
  );
};

export default WasmTranspiler;
