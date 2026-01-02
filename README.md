# Welcome to bytebasket mobile aapplication

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. run the app

   ```bash
   npx expo run:ios
   npx expo run:andoird
   ```

2. try deep linking

   ```bash
   npx uri-scheme open "bytebasket://product/3" --ios
   npx uri-scheme open "bytebasket://product/3" --android
   ```

## Folders and files Architecture

   This project use feature-based architecture:
      we can think like every feature home,categiores,products,et.. as indiviual core (separation of concerns)
   
   bytebasket/src
      assets: all project assets (images, fonts, etc.)
      components: app components (shared components that can be used globally in the app)
      constants: static values used globally in the app (colors, fonts, names, etc.)
      features: application features as mentioned above
         - feature-1/
            - components: feature-1 components (used only in feature-1)
            - hooks: feature-1 hooks (used only in feature 1)
            - screens: feature-1 screens (anything shown as a screen for feature-1)
            - services: services or API calls for feature 1 (getProducts, etc.)
            - types: types only for feature 1
      hooks: app hooks (shared hooks used globally in the app, e.g., useThemeColor)
      navigation: holds all navigation declarations and how navigation works
      redux: all Redux implementation, including slices and store configuration
      services: services not related to a specific feature
      types: types for general purpose
      utils: utilities used across the app
      screenshots: screenshots for the app incuding (iOS, Web,Android) 

## Screenshots

   iOS:
      (src/screenshots/iOS/Simulator Screenshot - iPhone 16 Pro - 2026-01-02 at 12.20.11.png)
      (src/screenshots/iOS/Simulator Screenshot - iPhone 16 Pro - 2026-01-02 at 12.20.20.png)
      (src/screenshots/iOS/Simulator Screenshot - iPhone 16 Pro - 2026-01-02 at 12.20.29.png)
      (src/screenshots/iOS/Simulator Screenshot - iPhone 16 Pro - 2026-01-02 at 12.21.00.png)
   Android:
      (src/screenshots/android/Fav_Android.png.png)
      (src/screenshots/android/Home_Android.png)
      (src/screenshots/android/Search_Android.png)
   web:
      (src/screenshots/web/Screenshot 2026-01-02 at 12.00.13 PM.png)
      (src/screenshots/web/Screenshot 2026-01-02 at 12.00.48 PM.png)
      (src/screenshots/web/Screenshot 2026-01-02 at 12.01.09 PM.png)
      (src/screenshots/web/Screenshot 2026-01-02 at 12.01.29 PM.png)
