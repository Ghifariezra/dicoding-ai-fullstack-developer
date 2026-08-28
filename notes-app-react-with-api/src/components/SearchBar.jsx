import PropTypes from 'prop-types';

function SearchBar({ keyword, keywordChange, placeholder = 'Cari berdasarkan judul...' }) {
    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder={placeholder}
                value={keyword}
                onChange={keywordChange}
            />
        </div>
    );
}

SearchBar.propTypes = {
    keyword: PropTypes.string.isRequired,
    keywordChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
};

export default SearchBar;