# Notes App

A React-based notes application for creating, searching, archiving, and deleting notes. The application uses the Dicoding Notes API for authentication and data storage.

## Features

- User registration and login
- Displaying active and archived notes
- Adding notes with a title and body
- Searching notes by keyword
- Archiving and unarchiving notes
- Deleting notes
- Light and dark theme options
- Indonesian and English language options
- Note detail view with locale-aware date formatting

## Technology

- React 18
- Vite
- React Router
- Vitest and React Testing Library
- `react-icons`
- `html-react-parser`
- API: `https://notes-api.dicoding.dev/v1`

## Running the Application

### Prerequisites

- Node.js 18 or later
- npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open the URL displayed by Vite, usually [http://localhost:5173](http://localhost:5173).

### Production Build

```bash
npm run build
npm run preview
```

## Testing

Run Vitest in watch mode:

```bash
npm test
```

To run the tests once without watch mode:

```bash
npm test -- --run
```

## Directory Structure

```text
src/
|-- components/   Reusable UI components
|-- contexts/     Theme and language contexts
|-- hooks/        Custom React hooks
|-- pages/        Login, registration, notes, archive, and detail pages
|-- styles/       Application styles
`-- utils/        API integration and helpers
```

The access token and theme/language preferences are stored in the browser's `localStorage`. No environment file is required to run this application.
