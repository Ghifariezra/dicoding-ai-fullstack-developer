import React from 'react';
import PropTypes from 'prop-types';
import { useParams, useNavigate } from 'react-router-dom';
import parser from 'html-react-parser';
import { FiArchive, FiInbox, FiTrash2 } from 'react-icons/fi';
import { getNote, deleteNote, archiveNote, unarchiveNote } from '../utils/local-data';
import { showFormattedDate } from '../utils';

class DetailPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            note: getNote(props.id),
        };

        this.onDeleteHandler = this.onDeleteHandler.bind(this);
        this.onArchiveHandler = this.onArchiveHandler.bind(this);
        this.onUnarchiveHandler = this.onUnarchiveHandler.bind(this);
    }

    onDeleteHandler() {
        deleteNote(this.props.id);
        this.props.navigate('/');
    }

    onArchiveHandler() {
        archiveNote(this.props.id);
        this.props.navigate('/');
    }

    onUnarchiveHandler() {
        unarchiveNote(this.props.id);
        this.props.navigate('/');
    }

    render() {
        if (!this.state.note) {
            return (
                <section className="detail-page">
                    <p>Catatan tidak ditemukan!</p>
                </section>
            );
        }

        return (
            <section className="detail-page">
                <h3 className="detail-page__title">{this.state.note.title}</h3>
                <p className="detail-page__createdAt">{showFormattedDate(this.state.note.createdAt)}</p>
                <div className="detail-page__body">{parser(this.state.note.body)}</div>

                <div className="detail-page__action">
                    {this.state.note.archived ? (
                        <button className="action" type="button" title="Aktifkan" onClick={this.onUnarchiveHandler}>
                            <FiInbox />
                        </button>
                    ) : (
                        <button className="action" type="button" title="Arsipkan" onClick={this.onArchiveHandler}>
                            <FiArchive />
                        </button>
                    )}
                    <button className="action" type="button" title="Hapus" onClick={this.onDeleteHandler}>
                        <FiTrash2 />
                    </button>
                </div>
            </section>
        );
    }
}

DetailPage.propTypes = {
    id: PropTypes.string.isRequired,
    navigate: PropTypes.func.isRequired,
};

function DetailPageWrapper() {
    const { id } = useParams();
    const navigate = useNavigate();

    return <DetailPage id={id} navigate={navigate} />;
}

export default DetailPageWrapper;