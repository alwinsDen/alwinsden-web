# service (Rust API)

Rust workspace member (axum API server). Repo-wide rules: see ../AGENTS.md (loaded in every session).

- Requires cargo 1.97. `service/` lives outside `packages/*` on purpose so pnpm ignores it; the pnpm and Cargo workspaces coexist at root.
- Commands (run from repo root): `cargo run -p service` / `cargo build` / `cargo test` / `cargo clippy` — no root pnpm alias; the root `Cargo.toml` defines the workspace.
- Root `Cargo.toml` centralizes shared Rust versions in `[workspace.dependencies]` (currently axum) — the Rust analog of the pnpm `catalog:`. Add shared deps there, not per-member. `Cargo.lock` is committed; `target/` is gitignored.
- `src/main.rs` is a placeholder, not the real API yet.
