const WasmTranspiler = () => {
  return (
    <div>
      test
      <button
        onClick={async () => {
          // @ts-ignore
          const wasm_import = await import('/public/wasm-transpiler/build/index.js');
          const loadWasm = wasm_import.default;
          await loadWasm({
            // @ts-ignore
            locateFile: path => {
              if (path.endsWith('.wasm')) {
                return '/public/wasm-transpiler/build/index.wasm';
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
