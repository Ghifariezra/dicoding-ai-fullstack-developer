import React from 'react';
import PropTypes from 'prop-types';
import { useSearchParams } from 'react-router-dom';
import NotesList from '../components/NotesList';
import { getArchivedNotes } from '../utils/local-data';

class ArchiveNotes extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            notes: getArchivedNotes(),
            keyword: props.defaultKeyword || '',
        };

        this.onKeywordChangeHandler = this.onKeywordChangeHandler.bind(this);
    }

    onKeywordChangeHandler(keyword) {
        this.setState({ keyword });
        this.props.keywordChange(keyword);
    }

    render() {
        const filteredNotes = this.state.notes.filter((note) =>
            note.title.toLowerCase().includes(this.state.keyword.toLowerCase())
        );

        return (
            <section className="archives-page">
                <h2>Catatan Terarsip</h2>

                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Cari catatan terarsip..."
                        value={this.state.keyword}
                        onChange={(e) => this.onKeywordChangeHandler(e.target.value)}
                    />
                </div>

                <NotesList notes={filteredNotes} />
            </section>
        );
    }
}

ArchiveNotes.propTypes = {
    defaultKeyword: PropTypes.string,
    keywordChange: PropTypes.func.isRequired,
};

function ArchiveNotesWrapper() {
    const [searchParams, setSearchParams] = useSearchParams();
    const keyword = searchParams.get('keyword') || '';

    function changeSearchParams(keyword) {
        setSearchParams(keyword ? { keyword } : {});
    }

    return (
        <ArchiveNotes
            defaultKeyword={keyword}
            keywordChange={changeSearchParams}
        />
    );
}

export default ArchiveNotesWrapper;