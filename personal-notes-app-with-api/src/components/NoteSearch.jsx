import React from 'react';

function NoteSearch({ searchKeyword, onSearchChange }) {
  return (
    <div className="note-search" data-testid="note-search">
      <input
        type="text"
        placeholder="Cari catatan..."
        value={searchKeyword}
        onChange={(e) => onSearchChange(e.target.value)}
        data-testid="note-search-input"
      />
      {searchKeyword && (
        <button
          type="button"
          onClick={() => onSearchChange('')}
          data-testid="note-search-clear-button"
          className='note-search__clear'
          title='Clear search'
        >
          x
        </button>
      )}
    </div>
  );
}

export default NoteSearch;