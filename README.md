# 🧘 Self Care Routing 🌅


## 🎨 Frontend-Only Features (Can implement immediately)

### ✅ Core Features

- [x] Local Storage Persistence - Zustand persist(localStorage)
- [x] Browser's localStorage API - Zustand persist(localStorage)
- [ ] Drag-and-drop Reordering - React DnD or native HTML5
- [ ] Sound Effects - Web Audio API
- [ ] Browser Notifications - Notification API
- [ ] PWA Support - Service workers + manifest.json
- [ ] Custom Routines (CRUD) - Local state management
- [ ] Habit Streaks - Track in localStorage
- [ ] Quick Stats Widget - Computed from local data
- [ ] Basic Analytics - Calculate from localStorage data
- [ ] Basic Timer/Countdown - JavaScript timers
- [ ] Weather Integration - Direct API calls from frontend
- [ ] Export to Calendar (.ics) - Generate files client-side
- [ ] Import/Export Routines (JSON) - File API]
- [ ] Customizable UI - CSS + React state
- [ ] Responsive Design - CSS media queries
- [ ] Accessibility Features - ARIA attributes + semantic HTML
- [ ] Multi-language Support - i18next or similar library
- [ ] Customizable Notifications - Notification API + localStorage
- [ ] Pomodoro Timer - JavaScript timers + localStorage
- [ ] Daily Affirmations - Local state management
- [ ] Meditation Timer - JavaScript timers + localStorage
- [ ] Habit Tracker - Local state management
- [ ] Mood Journal - Local state management
- [ ] Gratitude Journal - Local state management
- [ ] Daily Reflection Prompts - Local state management
- [ ] Customizable Reminders - Notification API + localStorage
- [ ] Routine Templates - Local state management
- [ ] Routine Sharing (local) - Local state management
- [ ] Theme Toggle/Dark Mode Schedule - CSS + localStorage

## 🔧 Backend Required Features

### 🌐 Need Authentication & Database

### Social Features

- [ ] User accounts
- [ ] OAuth login (Google/Facebook/Apple/GitHub)]
- [ ] User profiles
- [ ] Profile pictures
- [ ] User bios
- [ ] User notifications
- [ ] User settings
- [ ] Social connections
- [ ] Friend requests
- [ ] Comments/likes


### Public Routine Library

- [ ] User-generated content
- [ ] Search/filter/rating system
- [ ] Moderation


### Accountability Partners

- [ ] Real-time sync
- [ ] Notifications between users



## 📊 Need Data Processing

### Advanced Analytics

Cross-device data sync
ML-based insights
Long-term data storage
Comparative analysis


### AI Coach Integration

GPT/Claude API integration
Personalized recommendations
Pattern analysis



## 🔌 Need External Services

### Health Integrations

- OAuth with Fitbit/Apple Health
- Webhook processing
- Data normalization


### Calendar Sync

- Google Calendar API
- Outlook integration
- Two-way sync


### Spotify Integration

- OAuth authentication
- Playlist management
- Playback control



## 🏆 Need Persistent Storage

### Gamification System

- Global leaderboards
- Achievement tracking
- XP/level persistence
- Daily challenges distribution



## 🚀 Hybrid Features (Start frontend, add backend later)

- Notifications - Start with browser notifications, add push notifications with backend
- Analytics - Basic charts frontend, advanced ML insights with backend
- Routines Storage - localStorage first, cloud sync later
- Achievements - Local badges first, social achievements with backend

Recommendation: Start with all the frontend-only features to make your app fully functional offline, then gradually add backend features based on user demand.

-------

------

------




# Turborepo starter with shadcn/ui

![Static Badge](https://img.shields.io/badge/shadcn%2Fui-2.1.2-blue?link=https%3A%2F%2Fgithub.com%2Fshadcn%2Fui)

This is Turborepo starter with shadcn/ui pre-configured.

> [!NOTE]
> This example uses `pnpm` as package manager.

[npm version](https://github.com/dan5py/turborepo-shadcn-ui/tree/npm)
[bun version](https://github.com/dan5py/turborepo-shadcn-ui/tree/bun)

## Using this example

Clone the repository:

```sh
git clone https://github.com/dan5py/turborepo-shadcn-ui.git
```

Install dependencies:

```sh
cd turborepo-shadcn-ui
pnpm install
```

### Add ui components

Use the pre-made script:

```sh
pnpm ui add <component-name>
```

> This works just like the `shadcn/ui` CLI.

### Add a new app

Turborepo offer a simple command to add a new app:

```sh
pnpm turbo gen workspace --name <app-name>
```

This will create a new empty app in the `apps` directory.

If you want, you can copy an existing app with:

```sh
pnpm turbo gen workspace --name <app-name> --copy
```

> [!NOTE]
> Remember to run `pnpm install` after copying an app.

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `docs`: a [Next.js](https://nextjs.org/) app
- `@repo/ui`: a stub React component library (🚀 powered by **shadcn/ui**)
- `@repo/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

```sh
cd turborepo-shadcn-ui
pnpm build
```

### Develop

To develop all apps and packages, run the following command:

```sh
cd turborepo-shadcn-ui
pnpm dev
```

### Remote Caching

Turborepo can use a technique known as [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup), then enter the following commands:

```
cd turborepo-shadcn-ui
npx turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your Turborepo:

```sh
npx turbo link
```

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)

Learn more about shadcn/ui:

- [Documentation](https://ui.shadcn.com/docs)
