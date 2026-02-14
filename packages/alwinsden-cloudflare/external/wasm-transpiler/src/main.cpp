/*
emcc src/main.cpp -o ../../public/wasm-transpiler/build/index.js -s EXPORT_ES6=1
-s MODULARIZE=1
*/

#include <iostream>
int main() {
  std::cout << "this is triggering from wasm layer" << "\n";
  std::cout << "transiler trigger" << "\n";
}