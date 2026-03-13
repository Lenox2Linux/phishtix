# PhishTix Mobile

Expo React Native mobile app for PhishTix, built with TypeScript, Expo Router, and React Native `StyleSheet`.

## Included screens

- Landing / Home
- Intake
- AI Results
- Hybrid Investigation
- Ticket Export
- Login
- Analyst Dashboard
- Analyst Ticket Create / Detail / Workflow / Notes
- Reports

All data is currently powered by local mock ticket records in `src/data/tickets.ts`.

## Project structure

```text
Mobile/
  app/                  Expo Router screens
    (app)/              Authenticated app routes
  src/
    components/         Shared presentational UI
    data/               Mock local ticket data
    features/           Feature hooks and domain logic
    providers/          App-level state/context
    services/           Export and future integration helpers
    theme/              Shared colors and visual tokens
    types/              Shared TypeScript types
```

## Run locally

1. Install dependencies:

   ```bash
   npm install
   ```

2. Refresh dependencies after the styling-system cleanup:

   ```bash
   npm install
   ```

3. Start Expo:

   ```bash
   npm run start
   ```

4. Open the app in one of the following ways:

- Press `a` in the Expo terminal for Android.
- Press `i` in the Expo terminal for iOS on macOS.
- Scan the QR code with Expo Go.
- Run `npm run web` for the browser preview.

## Notes

- The login screen is a mock entry point and routes directly into the app.
- Creating a ticket adds a seeded mock ticket to local in-memory state.
- The app uses a single React Native `StyleSheet`-based styling system for Expo stability.
- Replace the mock provider in `src/providers/AppProvider.tsx` when backend APIs are ready.
