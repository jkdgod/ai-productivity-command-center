# Desktop App

This directory is the desktop launcher configuration for the AI Productivity Command Center. It is intended to wrap the React web client using Tauri, producing native builds for Windows, macOS, and Linux.

## Planned local-first features

- Encrypted or OS-keychain-protected provider credentials
- Local task workspace and optional SQLite persistence
- Today dashboard, task board, exports, and keyboard-first capture
- Explicit approval before any external AI request, reminder, or calendar action

## Development direction

Install Rust and the Tauri prerequisites for your operating system, then use the Tauri CLI to initialize or connect the web frontend as the desktop application UI. Keep provider keys in the operating system credential store or local environment, never in the repository.
