import { useContext } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import NotesList from '../components/NotesList';
import SearchBar from '../components/SearchBar';
import { getActiveNotes } from '../utils/network-data';
import { FiPlus } from 'react-icons/fi';
import useNoteSearch from '../hooks/useNoteSearch';
import LocaleContext from '../contexts/LocaleContext';

export async function homePageLoader() {
    const { error, data } = await getActiveNotes();
    if (error) {
        return [];
    }
    return data;
}

export default function HomePage() {
    const { locale } = useContext(LocaleContext);
    const notes = useLoaderData();
    const { keyword, handleSearch, filteredNotes } = useNoteSearch(notes);

    return (
        <section className="homepage">
            <h2>{locale === 'id' ? 'Catatan Aktif' : 'Active Notes'}</h2>

            <SearchBar keyword={keyword} keywordChange={handleSearch} />

            <NotesList notes={filteredNotes} />

            <div className="homepage__action">
                <Link
                    to="/notes/new"
                    className="action"
                    title={locale === 'id' ? 'Tambah Catatan' : 'Add Note'}
                >
                    <FiPlus />
                </Link>
            </div>
        </section>
    );
}