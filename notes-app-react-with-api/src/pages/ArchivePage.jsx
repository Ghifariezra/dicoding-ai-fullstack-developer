import { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import NotesList from '../components/NotesList';
import SearchBar from '../components/SearchBar';
import { getArchivedNotes } from '../utils/network-data';
import useNoteSearch from '../hooks/useNoteSearch';
import LocaleContext from '../contexts/LocaleContext';

export async function archivePageLoader() {
    const { error, data } = await getArchivedNotes();
    if (error) {
        return [];
    }
    return data;
}

export default function ArchivePage() {
    const { locale } = useContext(LocaleContext);
    const notes = useLoaderData();
    const { keyword, handleSearch, filteredNotes } = useNoteSearch(notes);

    const isId = locale === 'id';

    return (
        <section className="archives-page">
            <h2>{isId ? 'Catatan Terarsip' : 'Archived Notes'}</h2>

            <SearchBar
                keyword={keyword}
                keywordChange={handleSearch}
                placeholder={
                    isId ? 'Cari catatan terarsip...' : 'Search archived notes...'
                }
            />

            <NotesList notes={filteredNotes} />
        </section>
    );
}