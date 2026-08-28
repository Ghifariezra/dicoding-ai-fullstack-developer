import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LocaleContext from '../contexts/LocaleContext';
import NotesList from './NotesList';

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

const renderWithProviders = (ui, { locale = 'id' } = {}) => {
    return render(
        <MemoryRouter>
            <LocaleContext.Provider value={{ locale }}>
                {ui}
            </LocaleContext.Provider>
        </MemoryRouter>
    );
};

describe('NotesList Component', () => {
    it('renders list of notes correctly', () => {
        renderWithProviders(<NotesList notes={dummyNotesList} />);

        expect(screen.getByText('Catatan React')).toBeInTheDocument();
        expect(screen.getByText('Catatan Vitest')).toBeInTheDocument();
    });

    it('renders empty message in Indonesian when notes array is empty', () => {
        renderWithProviders(<NotesList notes={[]} />, { locale: 'id' });

        expect(screen.getByText('Tidak ada catatan')).toBeInTheDocument();
    });

    it('renders empty message in English when locale is set to "en"', () => {
        renderWithProviders(<NotesList notes={[]} />, { locale: 'en' });

        expect(screen.getByText('No notes')).toBeInTheDocument();
    });
});