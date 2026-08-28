import React from 'react';
import PropTypes from 'prop-types';
import { Link, useSearchParams } from 'react-router-dom';
import NotesList from '../components/NotesList';
import { getActiveNotes } from '../utils/local-data';
import { FiPlus } from 'react-icons/fi';

// Component Class Utama
class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            notes: getActiveNotes(),
            keyword: props.defaultKeyword || '',
        };

        this.onKeywordChangeHandler = this.onKeywordChangeHandler.bind(this);
    }

    onKeywordChangeHandler(keyword) {
        this.setState({ keyword });
        this.props.keywordChange(keyword);
    }

    render() {
        // Filter catatan berdasarkan kata kunci pencarian (case-insensitive)
        const filteredNotes = this.state.notes.filter((note) =>
            note.title.toLowerCase().includes(this.state.keyword.toLowerCase())
        );

        return (
            <section className="homepage">
                <h2>Catatan Aktif</h2>

                {/* Input Pencarian (Kriteria Opsional 2) */}
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Cari berdasarkan judul..."
                        value={this.state.keyword}
                        onChange={(e) => this.onKeywordChangeHandler(e.target.value)}
                    />
                </div>

                {/* Component Daftar Catatan */}
                <NotesList notes={filteredNotes} />

                {/* Tombol Melayang Tambah Catatan */}
                <div className="homepage__action">
                    <Link to="/notes/new" className="action" title="Tambah Catatan">
                        <FiPlus />
                    </Link>
                </div>
            </section>
        );
    }
}

HomePage.propTypes = {
    defaultKeyword: PropTypes.string,
    keywordChange: PropTypes.func.isRequired,
};

function HomePageWrapper() {
    const [searchParams, setSearchParams] = useSearchParams();
    const keyword = searchParams.get('keyword') || '';

    function changeSearchParams(keyword) {
        setSearchParams(keyword ? { keyword } : {});
    }

    return (
        <HomePage
            defaultKeyword={keyword}
            keywordChange={changeSearchParams}
        />
    );
}

export default HomePageWrapper;