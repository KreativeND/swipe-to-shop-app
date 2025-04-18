
# Capacitor Setup for Swipe to Shop

This file provides instructions for deploying the Swipe to Shop application as a mobile app using Capacitor.

## Prerequisites

- Node.js and npm installed
- For iOS: macOS with Xcode installed
- For Android: Android Studio installed

## Setup Steps

1. **Initialize Capacitor** (already done in this project):
   The `capacitor.config.ts` file is already configured with the following settings:
   - App ID: `app.lovable.7cdd3d875b8147e6b652cdb316bb8e9b`
   - App Name: `swipe-to-shop-app`
   - Web Directory: `dist`
   - Live Reload URL: `https://7cdd3d87-5b81-47e6-b652-cdb316bb8e9b.lovableproject.com?forceHideBadge=true`

2. **Build the Web Application**:
   ```sh
   npm run build
   ```

3. **Add Platforms**:
   ```sh
   npx cap add android
   npx cap add ios
   ```

4. **Sync Web Code to Native Projects**:
   ```sh
   npx cap sync
   ```

5. **Update Native Projects**:
   ```sh
   npx cap update android
   npx cap update ios
   ```

6. **Open Native IDEs**:
   ```sh
   npx cap open android  # For Android
   npx cap open ios      # For iOS
   ```

7. **Run on Devices/Emulators**:
   ```sh
   npx cap run android
   npx cap run ios
   ```

## Additional Resources

- [Capacitor Documentation](https://capacitorjs.com/docs)
- [iOS Development Guide](https://capacitorjs.com/docs/ios)
- [Android Development Guide](https://capacitorjs.com/docs/android)

## Troubleshooting

If you encounter issues:

1. Ensure your web build is up to date (`npm run build`)
2. Re-sync with Capacitor (`npx cap sync`)
3. Check platform-specific logs in Android Studio or Xcode
4. For Android permission issues, check the AndroidManifest.xml
5. For iOS permission issues, check Info.plist
