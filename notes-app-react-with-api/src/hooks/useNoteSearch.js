import { useMemo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import useInput from './useInput.js';

function useNoteSearch(notes = []) {
    const [searchParams, setSearchParams] = useSearchParams();
    const defaultKeyword = searchParams.get('keyword') || '';

    const [keyword, onKeywordChange] = useInput(defaultKeyword);

    const handleSearch = useCallback((event) => {
        onKeywordChange(event);
        const searchKeyword = event.target.value;
        setSearchParams(searchKeyword ? { keyword: searchKeyword } : {});
    }, [onKeywordChange, setSearchParams]);

    const filteredNotes = useMemo(() => {
        return notes.filter((note) =>
            note.title.toLowerCase().includes(keyword.toLowerCase())
        );
    }, [notes, keyword]);

    return {
        keyword,
        handleSearch,
        filteredNotes,
    };
}

export default useNoteSearch;