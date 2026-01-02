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

# ByteBasket

## Folders and File Architecture

This project uses a **feature-based architecture**. Each feature (Home, Categories, Products, etc.) is treated as an independent module to improve **separation of concerns**, scalability, and maintainability.

### Project Structure

```txt
bytebasket/
  src/
    assets/         # Project assets (images, fonts, etc.)
    components/     # Shared UI components used across the app
    constants/      # Global constants (colors, fonts, strings, etc.)
    features/       # Feature modules (domain-based)
      feature-1/
        components/ # Feature-specific components (used only here)
        hooks/      # Feature-specific hooks
        screens/    # Feature screens (UI routes/pages)
        services/   # Feature services / API calls (e.g., getProducts)
        types/      # Feature-specific TypeScript types
    hooks/          # Shared hooks (e.g., useThemeColor)
    navigation/     # Navigation setup and route definitions
    redux/          # Redux store + slices + configuration
    services/       # Shared services not tied to a specific feature
    types/          # Shared/global TypeScript types
    utils/          # Shared utility functions/helpers
    screenshots/    # App screenshots (iOS, Android, Web)