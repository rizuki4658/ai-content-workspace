# AI Content Workspace

A modern SaaS-style dashboard for generating, managing, and analyzing AI-powered content.

This project was built as a portfolio-grade frontend product to demonstrate product thinking, clean UI architecture, realistic user flows, client-side persistence, and dashboard experience.

## Overview

AI Content Workspace is a frontend application that simulates a real content operations workflow.

It allows users to generate AI-powered content, manage saved content, review analytics, and configure app/user preferences inside a clean SaaS-style dashboard.

The project is not designed as a simple UI prototype. It focuses on realistic frontend behavior, structured data flow, responsive layouts, and maintainable architecture.

## Data & Privacy

This project stores demo data locally in the browser using IndexedDB.

There is no backend server, account system, or external database. Generated content, settings, and preferences are stored only on the user’s device/browser.

This project does not collect, sell, or share personal data. It is built as a frontend portfolio demo to simulate a realistic SaaS-style product experience.

## Core Features

- Dashboard overview with real computed stats
- AI content generation flow with preview state
- Content management with CRUD operations
- Filtering and pagination
- Responsive desktop and mobile content views
- Analytics dashboard with charts, summaries, and insights
- App-level settings
- User-level settings
- Client-side persistence with IndexedDB
- Fake API layer for async simulation
- Clean SaaS-style UI using shadcn/ui and Tailwind CSS

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/ui
- Recharts
- IndexedDB
- idb
- Fake API layer

## Project Goals

The goal of this project was to build a realistic frontend product that shows more than UI implementation.

This project demonstrates:

- frontend architecture
- product flow thinking
- dashboard UI design
- responsive UX decisions
- client-side persistence
- state and data handling
- reusable component structure
- practical engineering decisions

## Architecture

The application is structured with separation of concerns between:

- UI components
- page-level flows
- fake API services
- IndexedDB persistence
- data transformation
- reusable utilities

The fake API layer simulates server-like behavior while keeping the project backend-free.

IndexedDB is used to persist generated and managed content locally in the browser.

## UX Decisions

Several UX decisions were intentionally made to keep the product realistic:

- Analytics are based on real computed data instead of fake static numbers
- Badges use semantic meaning for content type, tone, and status
- Charts are paired with summaries and insights
- Mobile layouts are designed differently from desktop layouts
- Loading states are kept smooth and realistic
- Settings update the UI without unnecessary page reloads
- The interface stays clean, minimal, and product-focused

## Pages

### Dashboard

Shows high-level stats, charts, and recent activity based on stored content data.

### Generate

Provides a content generation flow with form input, preview, and generated output handling.

### Contents

Allows users to manage generated content with CRUD operations, filters, pagination, and responsive views.

### Analytics

Displays real computed analytics using charts, summaries, and insight cards.

### Settings

Handles app-level preferences and configuration.

### My Settings

Handles user-level preferences and profile-related settings.

## Data Persistence

This project uses IndexedDB through the `idb` package.

Data is persisted locally in the browser, allowing the app to behave more like a real product without requiring a backend.

## Fake API Layer

The fake API layer is used to simulate async behavior and server-like operations.

This keeps the frontend structure realistic while avoiding unnecessary backend complexity for a portfolio project.

## Getting Started

Install dependencies:

```sh
npm install