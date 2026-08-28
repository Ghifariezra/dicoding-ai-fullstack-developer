import { describe, it, expect } from 'vitest';
import { render, screen } from '../test-utils';
import { getAllNotes } from '../utils/local-data';
import NotesList from './NotesList';

describe('NotesList Component', () => {
    const dummyNotesList = getAllNotes();

    it('renders list of notes correctly', () => {
        render(<NotesList notes={dummyNotesList} />);
        expect(screen.getByText('Functional Component')).toBeInTheDocument();
    });

    it('renders empty message when notes array is empty', () => {
        render(<NotesList notes={[]} />);
        expect(screen.getByText('Tidak ada catatan')).toBeInTheDocument();
    });
});