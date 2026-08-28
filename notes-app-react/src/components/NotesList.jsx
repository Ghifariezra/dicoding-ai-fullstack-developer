import PropTypes from 'prop-types';
import NotesItem from './NotesItem';

function NotesList({ notes }) {
    if (!notes || notes.length === 0) {
        return (
            <section className="notes-list-empty">
                <p>Tidak ada catatan</p>
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