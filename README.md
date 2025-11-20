<div align="center">
  <img src="public/favicon.svg" alt="UsagePilot Logo" width="120" height="120">
  
  # UsagePilot
  
  ### Track and Visualize Your Application Usage Patterns
  
  [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
  [![CI](https://github.com/yourusername/UsagePilot/workflows/CI/badge.svg)](https://github.com/yourusername/UsagePilot/actions)
  [![Release](https://img.shields.io/github/v/release/yourusername/UsagePilot)](https://github.com/yourusername/UsagePilot/releases)
  [![Rust](https://img.shields.io/badge/Rust-1.75%2B-orange.svg)](https://www.rust-lang.org/)
  [![Node](https://img.shields.io/badge/Node-20%2B-green.svg)](https://nodejs.org/)
  [![Tauri](https://img.shields.io/badge/Tauri-2.0-blue.svg)](https://tauri.app/)
  
  [Features](#features) • [Installation](#installation) • [Usage](#usage) • [Contributing](#contributing) • [License](#license)
</div>

---

## 🚀 Features

UsagePilot is a **privacy-first**, **local-only** desktop application that helps you understand your digital habits by tracking application usage patterns.

### 🎯 Core Features

- **🔍 Active Window Tracking** - Automatically detects and tracks the focused application in real-time
- **⏸️ Smart Idle Detection** - Pauses tracking when you're away (no mouse/keyboard activity)
- **🔒 Privacy-First** - All data stored locally in SQLite. **No cloud, no telemetry, no data collection**
- **📊 Beautiful Dashboard** - Visualize your daily usage with interactive charts and insights
- **📱 Apps Overview** - Detailed breakdown of time spent per application with friendly names
- **🌓 Dark Mode** - Sleek UI with automatic system theme detection and manual toggle
- **🚀 Autostart** - Optional automatic launch on system startup
- **📈 Usage Analytics** - Track productivity patterns and time distribution
- **💻 Native Performance** - Built with Rust and Tauri for minimal resource usage

### 🎨 User Experience

- Modern, responsive UI with Tailwind CSS
- Real-time updates without page refresh
- Intuitive navigation with sidebar
- Color-coded visualizations
- Friendly application names (e.g., "Google Chrome" instead of "chrome.exe")

---

## 📦 Installation

### Download Pre-built Binaries

Download the latest release for your platform from the [Releases page](https://github.com/yourusername/UsagePilot/releases).

**Windows**:
- Download `.msi` or `.exe` installer
- Run the installer and follow the prompts
- Launch UsagePilot from Start Menu

**macOS**:
- Download `.dmg` file (choose `x64` for Intel or `aarch64` for Apple Silicon)
- Open and drag to Applications
- Launch from Applications folder

**Linux**:
- Download `.deb`, `.AppImage`, or `.rpm`
- Install using your package manager or run AppImage directly

📖 **[Full Installation Guide](docs/INSTALLATION.md)** with troubleshooting and platform-specific instructions

### Build from Source

#### Prerequisites

- [Node.js](https://nodejs.org/) 20+
- [Rust](https://www.rust-lang.org/tools/install) 1.75+
- Platform-specific dependencies:
  - **Windows**: Microsoft C++ Build Tools
  - **macOS**: Xcode Command Line Tools
  - **Linux**: webkit2gtk, libappindicator3, librsvg2
    ```bash
    # Ubuntu/Debian
    sudo apt-get update
    sudo apt-get install -y libwebkit2gtk-4.1-dev libappindicator3-dev librsvg2-dev patchelf
    ```

#### Build Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/UsagePilot.git
   cd UsagePilot
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run in development mode:
   ```bash
   npm run tauri dev
   ```

4. Build for production:
   ```bash
   npm run tauri build
   ```
   
   The installer will be in `src-tauri/target/release/bundle/`

---

## 🎮 Usage

### First Launch

1. Launch UsagePilot
2. Click **"Start Tracking"** to begin monitoring your application usage
3. Navigate through the sidebar:
   - **Dashboard**: Overview and charts
   - **Applications**: Detailed app breakdown
   - **Settings**: Theme, autostart, and preferences

### Understanding the Data

- **Duration**: Total time an application was in focus
- **Percentage**: Relative time compared to other apps
- **Today's Stats**: Resets at midnight
- **Idle Time**: Automatically excluded from tracking

### Tips

- Enable **Autostart** in Settings to track usage from system boot
- Toggle **Dark Mode** for comfortable viewing in different lighting
- All data is stored in `usage_tracker.db` in the app's data directory

---

## 🛠️ Tech Stack

### Backend
- **[Rust](https://www.rust-lang.org/)** - Systems programming language
- **[Tauri 2.0](https://tauri.app/)** - Desktop app framework
- **[SQLite](https://www.sqlite.org/)** with [sqlx](https://github.com/launchbadge/sqlx) - Local database
- **Windows API** - Native window tracking

### Frontend
- **[React 19](https://react.dev/)** - UI framework
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[Tailwind CSS](https://tailwindcss.com/)** - Styling
- **[Zustand](https://zustand-demo.pmnd.rs/)** - State management
- **[Recharts](https://recharts.org/)** - Data visualization
- **[Vite](https://vitejs.dev/)** - Build tool

---

## 🤝 Contributing

We love contributions! Whether you're fixing bugs, adding features, or improving documentation, all contributions are welcome.

### Ways to Contribute

- 🐛 Report bugs via [GitHub Issues](https://github.com/yourusername/UsagePilot/issues)
- 💡 Suggest features with [Feature Requests](https://github.com/yourusername/UsagePilot/issues/new?template=feature_request.md)
- 📝 Improve documentation
- 🔧 Submit pull requests

### Getting Started

1. Read our [Contributing Guidelines](CONTRIBUTING.md)
2. Check out our [Code of Conduct](CODE_OF_CONDUCT.md)
3. Fork the repository
4. Create a feature branch
5. Make your changes
6. Submit a pull request

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed instructions.

---

## 📄 License

UsagePilot is licensed under the [MIT License](LICENSE).

```
MIT License - Copyright (c) 2025 UsagePilot Contributors
```

---

## 🔄 Auto-Updates

UsagePilot includes an automatic updater that checks for new releases:
- Notifies you when a new version is available
- One-click download and installation
- Your data is preserved during updates

## 🙏 Acknowledgments

- Built with [Tauri](https://tauri.app/)
- Icons and UI inspired by modern design principles
- Thanks to all [contributors](https://github.com/yourusername/UsagePilot/graphs/contributors)

---

## 📞 Support

- 📖 [Documentation](https://github.com/yourusername/UsagePilot/wiki)
- 📦 [Installation Guide](docs/INSTALLATION.md)
- 🚀 [Release Process](docs/RELEASE.md)
- 💬 [Discussions](https://github.com/yourusername/UsagePilot/discussions)
- 🐛 [Issue Tracker](https://github.com/yourusername/UsagePilot/issues)

---

<div align="center">
  
  **[⬆ back to top](#usagepilot)**
  
  Made with ❤️ by the UsagePilot community
  
  ⭐ Star us on GitHub — it helps!
  
</div>
