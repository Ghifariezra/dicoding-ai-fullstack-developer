import { useContext } from 'react';
import PropTypes from 'prop-types';
import NotesItem from './NotesItem';
import LocaleContext from '../contexts/LocaleContext';

function NotesList({ notes }) {
    const { locale } = useContext(LocaleContext);

    if (!notes || notes.length === 0) {
        return (
            <section className="notes-list-empty">
                <p>{locale === 'id' ? 'Tidak ada catatan' : 'No notes'}</p>
            </section>
        );
    }

    return (
        <section className="notes-list">
            {notes.map((note) => (
                <NotesItem key={note.id} {...note} />
            ))}
        </section>
    );
}

NotesList.propTypes = {
    notes: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            body: PropTypes.string.isRequired,
            createdAt: PropTypes.string.isRequired,
            archived: PropTypes.bool.isRequired,
        })
    ).isRequired,
};

export default NotesList;