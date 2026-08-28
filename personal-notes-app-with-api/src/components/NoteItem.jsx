import React from 'react';
import { showFormattedDate } from '../utils';
import NoteActionButton from './NoteActionButton';

function highlightText(text, searchKeyword) {
  if (!searchKeyword || !searchKeyword.trim()) return text;

  const escapedKeyword = searchKeyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escapedKeyword})`, 'gi');

  const parts = text.split(regex);
  return parts.map((part, index) => {
    if (part.toLowerCase() === searchKeyword.toLowerCase()) {
      return <mark key={index}>{part}</mark>;
    }
    return part;
  });
}

function NoteItem({ note, searchKeyword, onDelete, onArchive }) {
  return (
    <div
      className="note-item"
      data-testid="note-item"
      data-note-id={note?.id}
    >
      <div className="note-item__content" data-testid="note-item-content">
        {/* TODO [Basic] tampilkan judul catatan menggunakan note.title */}
        {/* TODO [Advanced] sorot kata kunci pencarian dalam judul menggunakan elemen <mark>. */}
        <h3 className="note-item__title" data-testid="note-item-title">
          {highlightText(note.title, searchKeyword)}
        </h3>
        {/* TODO [Basic] gunakan util showFormattedDate untuk menampilkan tanggal dibuat. */}
        <p className="note-item__date" data-testid="note-item-date">
          {showFormattedDate(note.createdAt)}
        </p>
        {/* TODO [Basic] tampilkan isi catatan dari note.body */}
        {/* TODO [Advanced] sorot kata kunci pencarian dalam isi menggunakan elemen <mark>. */}
        <p className="note-item__body" data-testid="note-item-body">
          {highlightText(note.body, searchKeyword)}
        </p>
      </div>
      <div className="note-item__action" data-testid="note-item-action">
        {/* TODO [Skilled] pecah tombol aksi menjadi komponen terpisah bernama `NoteActionButton` dengan menerima props `variant` dan `onClick` */}
        <NoteActionButton variant="delete" onClick={() => onDelete(note.id)}>
          Delete
        </NoteActionButton>

        {/* TODO [Advanced] implementasikan tombol arsip untuk fitur mengarsipkan catatan */}
        <NoteActionButton variant="archive" onClick={() => onArchive(note.id)}>
          {note.archived ? 'Unarchive' : 'Archive'}
        </NoteActionButton>
      </div>
    </div>
  );
}

export default NoteItem;
