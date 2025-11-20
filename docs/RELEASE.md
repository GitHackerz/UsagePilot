# Release Process Documentation

## Automated Releases

UsagePilot uses automated workflows to create releases when you push to the `main` branch.

### Automatic Version Bumping

The version is automatically bumped based on your commit messages:

- **Patch** (0.0.x): Default for regular commits
- **Minor** (0.x.0): Commits prefixed with `feat:` or `feature:`
- **Major** (x.0.0): Commits prefixed with `breaking:` or `major:`

#### Examples:
```bash
git commit -m "fix: resolve memory leak"          # Bumps 0.1.0 -> 0.1.1
git commit -m "feat: add export functionality"    # Bumps 0.1.0 -> 0.2.0
git commit -m "breaking: change API structure"    # Bumps 0.1.0 -> 1.0.0
```

### Release Process

1. **Commit your changes** to a feature branch
2. **Create a Pull Request** to `main`
3. **Merge PR** to `main`
4. **Automatic workflow** will:
   - Detect version bump type from commits
   - Update version in `package.json`, `Cargo.toml`, and `tauri.conf.json`
   - Create a git tag
   - Build installers for all platforms (Windows, macOS, Linux)
   - Create a GitHub release with installers attached

### Platform-Specific Installers

After the release workflow completes, you'll find:

- **Windows**:
  - `.msi` - Windows Installer
  - `.exe` - Standalone executable (NSIS installer)

- **macOS**:
  - `.dmg` - Disk Image for easy installation
  - `.app.tar.gz` - Application bundle

- **Linux**:
  - `.deb` - Debian/Ubuntu package
  - `.AppImage` - Universal Linux binary
  - `.rpm` - RedHat/Fedora package (if configured)

## Manual Releases

You can also trigger a manual release:

1. Go to **Actions** tab on GitHub
2. Select **Manual Release** workflow
3. Click **Run workflow**
4. Enter the version number (e.g., `1.0.0`)
5. Click **Run**

## Updater Configuration

The app includes an updater that checks for new versions:

- Checks GitHub releases for updates
- Prompts users to download and install
- Configured in `tauri.conf.json` under `plugins.updater`

### Setting Up Updater

1. Generate update signature keys:
   ```bash
   npm run tauri signer generate
   ```

2. Add public key to `tauri.conf.json` (already done)

3. Add private key to GitHub Secrets:
   - Go to repository Settings → Secrets
   - Add `TAURI_PRIVATE_KEY` and `TAURI_KEY_PASSWORD`

## Code Signing

### Windows

To sign Windows installers:

1. Obtain a code signing certificate
2. Add certificate thumbprint to GitHub Secrets
3. Update `windows.certificateThumbprint` in `tauri.conf.json`

### macOS

To sign macOS apps:

1. Enroll in Apple Developer Program
2. Create certificates in Xcode
3. Add to GitHub Secrets for CI/CD
4. Configure `macOS.signingIdentity` in `tauri.conf.json`

## Pre-release vs Stable

- **Stable releases**: Automatically created from `main` branch
- **Pre-releases**: Tag with suffix like `v1.0.0-beta.1`
- **Release candidates**: Tag with `v1.0.0-rc.1`

## Changelog

The changelog is automatically updated when a new tag is created. Make sure your commit messages are descriptive!

## Troubleshooting

### Build fails on specific platform

- Check platform-specific dependencies in CI logs
- Test build locally before pushing

### Version not updating

- Ensure commit messages use the correct prefixes
- Check that `auto-release.yml` workflow is enabled

### Installers not appearing

- Check GitHub Actions logs for errors
- Ensure `GITHUB_TOKEN` has write permissions

## Best Practices

1. **Test locally** before pushing to main
2. **Write clear commit messages** for meaningful changelogs
3. **Use feature branches** and PRs for changes
4. **Review CI logs** if builds fail
5. **Test installers** on target platforms before distributing

## Resources

- [Tauri Release Documentation](https://tauri.app/v1/guides/building/)
- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [Semantic Versioning](https://semver.org/)
