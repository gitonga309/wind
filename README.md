# wind

A WhatsApp-inspired cross-platform letter app for Android and iOS.

## Overview

`wind` is a mobile app idea for writing thoughtful notes, love letters, birthday messages, and personal letters in a chat-style experience. It supports emoji, short notes, and a simple conversation layout built for everyday communication.

## Stack

- Expo + React Native + TypeScript
- Firebase for auth and data layer
- WhatsApp-inspired UI design

## Getting started

1. Install dependencies
   ```bash
   npm install
   ```

2. Start the Expo app
   ```bash
   npm start
   ```

3. Run on Android/iOS
   ```bash
   npm run android
   npm run ios
   ```

## Firebase setup

1. Create a Firebase project at https://console.firebase.google.com/
2. Add Android and iOS apps in Firebase
3. Replace the placeholder values in `src/firebase/config.ts`
4. Enable Authentication (Email/Password + Google)
5. Enable Firestore or Realtime Database if you want real chat persistence

## Project structure

```text
App.tsx
src/
  data/
    mockData.ts
  firebase/
    config.ts
```

## Notes

This is the initial MVP scaffold. It includes a polished UI, emoji composer, and mock conversation data so the app is ready to extend into real user authentication and letter storage.

## Future roadmap

- user sign-up / sign-in
- real-time letter threads
- image and attachment support
- export/share letters
- push notifications
- App Store / Play Store build preparation
