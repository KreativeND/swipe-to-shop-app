# Swipe to Shop - A Tinder-like Product Discovery App

Swipe to Shop is a mobile application prototype featuring a Tinder-like swiping interface for discovering products. Users can swipe cards left, right, or up to indicate their preferences for products.

![Swipe to Shop Preview](https://lovable.dev/projects/7cdd3d87-5b81-47e6-b652-cdb316bb8e9b/preview.png)

## Project URL

**Live Demo**: https://lovable.dev/projects/7cdd3d87-5b81-47e6-b652-cdb316bb8e9b

## Features

- **Interactive Card Swiping**: Tinder-like card swiping interaction for product discovery
- **Multiple Swipe Actions**: 
  - Swipe Right to like products
  - Swipe Left to pass on products
  - Swipe Up to add products to cart
- **Product Information Display**:
  - Product Image
  - Product Name
  - Brand Name
  - Current Price
  - Original Price (if discounted)
  - Discount Percentage (where applicable)
- **Smooth Animations**: GSAP-powered animations for a fluid user experience
- **State Management**: Zustand-based state management
- **Mobile Ready**: Packaged with Capacitor for native mobile deployment

## Technologies Used

This project is built with:
- **React**: UI component library
- **TypeScript**: Type-safe JavaScript
- **GSAP**: Animation library for smooth swipe interactions
- **Zustand**: Lightweight state management
- **React Query**: Data fetching and caching
- **Tailwind CSS**: Utility-first CSS framework
- **Vite**: Next-generation frontend tooling
- **Capacitor.js**: Native runtime for cross-platform apps

## Running the Project

### Web Development

```sh
# Install dependencies
npm install

# Start the development server
npm run dev

# Build for production
npm run build
```

### Mobile Development with Capacitor

After cloning and installing dependencies:

```sh
# Initialize Capacitor (already done in this project)
# npx cap init

# Build the web app first
npm run build

# Sync the web code to the native projects
npx cap sync

# Add platforms if needed
npx cap add android
npx cap add ios

# Open native IDEs
npx cap open android
npx cap open ios
```

## Project Structure

- `src/components/`: React components including CardStack and ProductCard
- `src/store/`: Zustand state management
- `src/pages/`: Application pages
- `capacitor.config.ts`: Capacitor configuration for mobile builds

## Interactions

- **Like a Product**: Swipe card right
- **Pass on a Product**: Swipe card left
- **Add to Cart**: Swipe card up
- **View Next Product**: After swiping, the next product automatically appears
- **Reset**: When all products are viewed, you can start over

## Mobile Deployment

To deploy as a mobile application:
1. Transfer the project to your own Github repository
2. Git pull the project
3. Run `npm install` to install dependencies
4. Add platforms: `npx cap add ios` and/or `npx cap add android`
5. Update native platforms: `npx cap update ios` and/or `npx cap update android`
6. Build the project: `npm run build`
7. Sync with native projects: `npx cap sync`
8. Run on device/emulator: `npx cap run android` or `npx cap run ios`

## Author

Created by [Your Name] via Lovable AI
