import React from 'react';
import NoteItem from './NoteItem';
import { groupNotesByMonthYear } from '../utils';

function NotesList({ notes, searchKeyword, onDelete, onArchive, dataTestId = 'notes-list' }) {
  // TODO [Basic] validasi notes agar tidak kosong.
  const hasNotes = Array.isArray(notes) && notes.length > 0;

  if (!hasNotes) {
    return (
      <div className="notes-list" data-testid={dataTestId}>
        {/* TODO [Basic] tampilkan pesan kosong yang informatif ketika tidak ada catatan. */}
        <p
          className="notes-list__empty-message"
          data-testid={`${dataTestId}-empty`}
        >
          Belum ada catatan
        </p>
      </div>
    );
  }

  const groupedNotes = groupNotesByMonthYear(notes);
  return (
    <div className="notes-list notes-list--grouped" data-testid={dataTestId}>
      {Object.keys(groupedNotes).map((groupKey) => (
        <section
          key={groupKey}
          data-testid={`${groupKey}-group`}
          className="notes-group"
        >
          {/* Pembungkus Header Group */}
          <div className="notes-group__header">
            <h3 className="notes-group__title">
              {groupedNotes[groupKey].title}
            </h3>
            <span
              data-testid={`${groupKey}-group-count`}
              className="notes-group__count"
            >
              {groupedNotes[groupKey].items.length} catatan
            </span>
          </div>

          {/* Pembungkus Grid Items */}
          <div className="notes-group__items">
            {groupedNotes[groupKey].items.map((note) => (
              <NoteItem
                key={note.id}
                note={note}
                searchKeyword={searchKeyword}
                onDelete={onDelete}
                onArchive={onArchive}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

export default NotesList;
