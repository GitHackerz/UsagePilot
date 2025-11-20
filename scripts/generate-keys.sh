#!/bin/bash

# Generate Tauri Update Signature Keys
# Run this once before creating releases with updater support

echo "🔐 Generating Tauri update signature keys..."
echo ""

# Check if Tauri CLI is installed
if ! command -v cargo-tauri &> /dev/null; then
    echo "❌ Tauri CLI not found. Installing..."
    cargo install tauri-cli
fi

# Generate keys
echo "Generating keys..."
npm run tauri signer generate -- -w ~/.tauri/myapp.key

echo ""
echo "✅ Keys generated successfully!"
echo ""
echo "📝 Next steps:"
echo "1. The private key is saved in ~/.tauri/myapp.key"
echo "2. Copy the PUBLIC KEY shown above"
echo "3. Update tauri.conf.json plugins.updater.pubkey with the public key"
echo "4. Add these to GitHub Secrets:"
echo "   - TAURI_PRIVATE_KEY: contents of ~/.tauri/myapp.key"
echo "   - TAURI_KEY_PASSWORD: the password you entered"
echo ""
echo "⚠️  IMPORTANT: Keep your private key secure and never commit it!"
