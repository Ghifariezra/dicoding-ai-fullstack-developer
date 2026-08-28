import { describe, it, expect } from 'vitest';
import { render, screen } from '../test-utils';
import NotesItem from './NotesItem';
import { showFormattedDate } from '../utils';

const dummyNotesList = [
    {
        id: 'notes-1',
        title: 'Catatan React',
        body: 'Mempelajari React dasar',
        createdAt: '2026-08-29T00:00:00.000Z',
        archived: false,
    },
    {
        id: 'notes-2',
        title: 'Catatan Vitest',
        body: 'Membuat unit testing komponen',
        createdAt: '2026-08-29T00:00:00.000Z',
        archived: false,
    },
];

describe('NotesItem Component', () => {
    const dummyNote = dummyNotesList[0];

    it('renders note content correctly', () => {
        render(<NotesItem {...dummyNote} />);

        expect(screen.getByRole('heading', { level: 3, name: dummyNote.title })).toBeInTheDocument();
        expect(screen.getByText(showFormattedDate(dummyNote.createdAt))).toBeInTheDocument();
        expect(screen.getByText(dummyNote.body)).toBeInTheDocument();
    });

    it('renders a link to detail page', () => {
        render(<NotesItem {...dummyNote} />);

        const linkElement = screen.getByRole('link', { name: dummyNote.title });
        expect(linkElement).toHaveAttribute('href', `/notes/${dummyNote.id}`);
    });
});
