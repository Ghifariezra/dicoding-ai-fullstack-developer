# Personal Notes App

A React-based personal notes application built as the final project for Dicoding's *"Belajar Membuat Aplikasi Web dengan React"* class. The app lets users create, search, group, archive, and delete personal notes using React class components, controlled forms, and array methods (`map` / `filter`).

## Tech Stack
- React 19
- Vite 7 (dev server & bundler)
- ESLint (Dicoding Academy config)
- Vanilla CSS (provided by the starter project, unmodified)

## Features

### 1. Array Function Mastery — Advanced
- `NotesList` renders every note using `Array.prototype.map`.
- `onDelete` removes a note using `Array.prototype.filter`.
- Notes are filtered by `searchKeyword` (case-insensitive) before rendering.
- Notes are grouped by month–year (`groupNotesByMonthYear`) and rendered as `<section class="notes-group">` blocks, each with a header and item count.

### 2. Reusable Components — Advanced
- The UI is split into `App`, `NoteInput`, `NoteSearch`, `NotesList`, `NoteItem`, and `NoteActionButton`, communicating through props.
- `NoteActionButton` is a shared button component (`variant` + `onClick` props) reused by `NoteItem` for both the delete and archive actions.
- `NoteItem` defines a reusable `highlightText()` helper that wraps matching search terms in `<mark>`, used for both the note title and body.

### 3. State & Event Management — Advanced
- `onAddNoteHandler` adds a new note (with a generated `id`, `createdAt`, `archived: false`) to state.
- `onDeleteHandler` removes a note from state; an empty-state message is shown when a list has no notes.
- `NoteSearch` stores `searchKeyword` in `App`'s state, and the rendered list reflects the filtered result live.
- `onArchiveHandler` toggles a note's `archived` flag. The UI is split into two sections — **Catatan Aktif** and **Arsip** — each showing its item count.

### 4. Controlled Form — Advanced
- Title and body inputs are fully controlled components; the form resets after a successful submit.
- Title is capped at 50 characters via state (not the `maxLength` attribute), with a live character counter (`note-input__title__char-limit`).
- Submitting is blocked when the body is under 10 characters, showing an error message with the `note-input__feedback--error` class. A success message is shown after a valid submit.

## Project Structure
```
src/
├─ components/
│  ├─ App.jsx              # Root component: state, handlers, filtering & grouping
│  ├─ NoteInput.jsx        # Controlled form to create a note
│  ├─ NoteSearch.jsx       # Controlled search input
│  ├─ NotesList.jsx        # Renders grouped notes / empty state
│  ├─ NoteItem.jsx         # Single note card + search highlighting
│  └─ NoteActionButton.jsx # Shared delete/archive button (variant + onClick)
├─ utils/
│  └─ index.js             # getInitialData, showFormattedDate, groupNotesByMonthYear
├─ styles/
│  └─ style.css            # Provided by the starter project (unmodified)
└─ index.jsx               # App entry point
```

## Getting Started
1. Install dependencies:
   ```bash
   npm install
   ```
2. Run the development server:
   ```bash
   npm run dev
   ```
3. Open `http://localhost:5173` in your browser.

Requires **Node.js 18+**.

## Testing Hooks (`data-testid`)
All `data-testid` attributes required by the Dicoding grading rubric (app structure, form, note list, empty state, search, archive buttons, character counter) are preserved exactly as provided in the starter project — none were renamed, removed, or moved.