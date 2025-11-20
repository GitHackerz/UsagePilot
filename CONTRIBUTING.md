# Contributing to UsagePilot

First off, thank you for considering contributing to UsagePilot! It's people like you that make UsagePilot such a great tool.

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible using our [bug report template](.github/ISSUE_TEMPLATE/bug_report.md).

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. Create an issue using our [feature request template](.github/ISSUE_TEMPLATE/feature_request.md) and provide the following information:

- Use a clear and descriptive title
- Provide a step-by-step description of the suggested enhancement
- Provide specific examples to demonstrate the steps
- Describe the current behavior and explain which behavior you expected to see instead
- Explain why this enhancement would be useful

### Pull Requests

1. Fork the repo and create your branch from `main`
2. If you've added code that should be tested, add tests
3. Ensure the test suite passes
4. Make sure your code follows the existing code style
5. Write a convincing description of your PR and why we should land it

## Development Setup

### Prerequisites

- Node.js 20+ and npm
- Rust 1.75+
- Platform-specific requirements:
  - **Windows**: Microsoft C++ Build Tools
  - **macOS**: Xcode Command Line Tools
  - **Linux**: webkit2gtk, libappindicator3, librsvg2

### Getting Started

1. Clone your fork of the repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/UsagePilot.git
   cd UsagePilot
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run tauri dev
   ```

### Project Structure

```
UsagePilot/
├── src/                    # React frontend source
│   ├── components/         # Reusable UI components
│   ├── pages/              # Page components
│   ├── store/              # Zustand state management
│   └── types.ts            # TypeScript type definitions
├── src-tauri/              # Rust backend source
│   ├── src/
│   │   ├── main.rs         # Application entry point
│   │   ├── lib.rs          # Library exports
│   │   ├── tracker.rs      # Usage tracking logic
│   │   └── db.rs           # Database operations
│   └── Cargo.toml          # Rust dependencies
├── public/                 # Static assets
└── .github/                # GitHub templates and workflows
```

## Coding Standards

### TypeScript/React

- Use TypeScript for all new code
- Follow the existing ESLint configuration
- Use functional components with hooks
- Use meaningful variable and function names
- Add JSDoc comments for complex functions

### Rust

- Run `cargo fmt` before committing
- Run `cargo clippy` and fix any warnings
- Write documentation for public APIs
- Follow Rust naming conventions
- Add unit tests for new functionality

### Commit Messages

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters or less
- Reference issues and pull requests liberally after the first line

Example:
```
Add dark mode toggle functionality

- Implement theme switcher in settings
- Add system theme detection
- Update all components to support dark mode

Fixes #123
```

## Building for Production

```bash
npm run tauri build
```

This will create platform-specific installers in `src-tauri/target/release/bundle/`.

## Testing

### Frontend Tests
```bash
npm run test
```

### Backend Tests
```bash
cd src-tauri
cargo test
```

### Type Checking
```bash
npx tsc --noEmit
```

## Documentation

- Update the README.md if you change functionality
- Comment your code where necessary
- Update type definitions for any API changes

## Community

- Join discussions in GitHub Issues
- Be respectful and constructive
- Help others when you can

## Questions?

Feel free to open an issue with the question label or reach out to the maintainers.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
