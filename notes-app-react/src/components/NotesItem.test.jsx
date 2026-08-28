import { describe, it, expect } from 'vitest';
import { render, screen } from '../test-utils';
import { getAllNotes } from '../utils/local-data';
import NotesItem from './NotesItem';
import { showFormattedDate } from '../utils';

describe('NotesItem Component', () => {
    const dummyNote = getAllNotes()[0];
    
    it('renders note content correctly', () => {
        render(<NotesItem {...dummyNote} />);

        expect(screen.getByRole('heading', { level: 3, name: dummyNote.title })).toBeInTheDocument();
        expect(screen.getByText(showFormattedDate(dummyNote.createdAt))).toBeInTheDocument();
        expect(screen.getByText(/ECMAScript 2015\+ menjadi sintaks yang/i)).toBeInTheDocument();
    });

    it('renders a link to detail page', () => {
        render(<NotesItem {...dummyNote} />);

        const linkElement = screen.getByRole('link', { name: dummyNote.title });
        expect(linkElement).toHaveAttribute('href', `/notes/${dummyNote.id}`);
    });
});

