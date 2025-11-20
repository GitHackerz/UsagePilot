# Installation Guide

## System Requirements

### Windows
- **OS**: Windows 10 (version 1903+) or Windows 11
- **RAM**: 2GB minimum, 4GB recommended
- **Disk Space**: 100MB

### macOS
- **OS**: macOS 10.13 (High Sierra) or later
- **RAM**: 2GB minimum, 4GB recommended
- **Disk Space**: 100MB
- **Architecture**: Intel (x86_64) or Apple Silicon (ARM64)

### Linux
- **OS**: Ubuntu 18.04+, Debian 10+, Fedora 32+, or equivalent
- **RAM**: 2GB minimum, 4GB recommended
- **Disk Space**: 100MB
- **Desktop**: GNOME, KDE, or similar

## Installation Methods

### Windows Installation

#### Method 1: MSI Installer (Recommended)
1. Download `UsagePilot_x.x.x_x64_en-US.msi` from [Releases](https://github.com/yourusername/UsagePilot/releases)
2. Double-click the `.msi` file
3. Follow the installation wizard
4. Launch from Start Menu

#### Method 2: NSIS Installer
1. Download `UsagePilot_x.x.x_x64-setup.exe` from [Releases](https://github.com/yourusername/UsagePilot/releases)
2. Run the `.exe` file
3. Follow the installation prompts
4. Launch from Start Menu or Desktop shortcut

**Note**: Windows may show a SmartScreen warning for unsigned installers. Click "More info" → "Run anyway"

### macOS Installation

#### Using DMG (Recommended)
1. Download `UsagePilot_x.x.x_x64.dmg` or `UsagePilot_x.x.x_aarch64.dmg` from [Releases](https://github.com/yourusername/UsagePilot/releases)
   - Choose `x64` for Intel Macs
   - Choose `aarch64` for Apple Silicon (M1/M2/M3) Macs
2. Open the `.dmg` file
3. Drag **UsagePilot** to the **Applications** folder
4. Launch from Applications

#### First Launch on macOS
macOS may prevent the app from opening due to Gatekeeper:
1. Go to **System Preferences** → **Security & Privacy**
2. Click **Open Anyway** next to the UsagePilot message
3. Or right-click the app → **Open** → **Open**

### Linux Installation

#### Ubuntu/Debian (DEB package)
```bash
# Download the .deb file
wget https://github.com/yourusername/UsagePilot/releases/download/vx.x.x/usagepilot_x.x.x_amd64.deb

# Install
sudo dpkg -i usagepilot_x.x.x_amd64.deb

# Fix dependencies if needed
sudo apt-get install -f

# Launch
usagepilot
```

#### AppImage (Universal)
```bash
# Download the AppImage
wget https://github.com/yourusername/UsagePilot/releases/download/vx.x.x/usagepilot_x.x.x_amd64.AppImage

# Make it executable
chmod +x usagepilot_x.x.x_amd64.AppImage

# Run
./usagepilot_x.x.x_amd64.AppImage
```

#### Fedora/RHEL (RPM package)
```bash
# Download and install
sudo rpm -i usagepilot-x.x.x-1.x86_64.rpm

# Launch
usagepilot
```

## Post-Installation

### First Run
1. Launch UsagePilot
2. Grant necessary permissions (if prompted)
3. Click **Start Tracking** to begin monitoring

### Enable Autostart (Optional)
1. Go to **Settings** in the app
2. Toggle **Launch at startup**
3. The app will now start automatically when you log in

### Data Location

UsagePilot stores all data locally:

- **Windows**: `%APPDATA%\com.usagepilot.app\`
- **macOS**: `~/Library/Application Support/com.usagepilot.app/`
- **Linux**: `~/.local/share/com.usagepilot.app/`

Database file: `usage_tracker.db`

## Updating

### Automatic Updates
UsagePilot checks for updates automatically:
1. When an update is available, you'll see a notification
2. Click **Download** to install the latest version
3. Restart the app to complete the update

### Manual Updates
1. Download the latest version from [Releases](https://github.com/yourusername/UsagePilot/releases)
2. Install over the existing installation
3. Your data will be preserved

## Uninstallation

### Windows
1. Go to **Settings** → **Apps** → **Installed apps**
2. Find **UsagePilot**
3. Click **Uninstall**

Or use the uninstaller:
- `Control Panel` → `Programs` → `Uninstall a program`

### macOS
1. Open **Finder** → **Applications**
2. Drag **UsagePilot** to **Trash**
3. Empty Trash

To remove data:
```bash
rm -rf ~/Library/Application\ Support/com.usagepilot.app/
```

### Linux

#### DEB package
```bash
sudo apt-get remove usagepilot
```

#### AppImage
```bash
rm usagepilot_x.x.x_amd64.AppImage
```

To remove data:
```bash
rm -rf ~/.local/share/com.usagepilot.app/
```

## Troubleshooting

### Windows: App won't start
- Install [WebView2 Runtime](https://developer.microsoft.com/en-us/microsoft-edge/webview2/)
- Update Windows to the latest version

### macOS: "App is damaged"
```bash
# Remove quarantine attribute
xattr -cr /Applications/UsagePilot.app
```

### Linux: Missing dependencies
```bash
# Ubuntu/Debian
sudo apt-get install libwebkit2gtk-4.1 libgtk-3-0

# Fedora
sudo dnf install webkit2gtk4.1 gtk3
```

### Database issues
If the app behaves strangely:
1. Close UsagePilot
2. Backup your database
3. Delete `usage_tracker.db`
4. Restart the app (a new database will be created)

## Support

- 📖 [Full Documentation](https://github.com/yourusername/UsagePilot/wiki)
- 🐛 [Report Issues](https://github.com/yourusername/UsagePilot/issues)
- 💬 [Discussions](https://github.com/yourusername/UsagePilot/discussions)
