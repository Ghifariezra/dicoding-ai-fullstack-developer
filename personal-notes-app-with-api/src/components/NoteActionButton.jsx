import React from 'react';

function NoteActionButton({ variant, onClick, children }) {
  const className =
        variant === 'delete' ? 'note-item__delete-button' : 'note-item__archive-button';
  const testId =
        variant === 'delete' ? 'note-item-delete-button' : 'note-item-archive-button';

  return (
    <button className={className} type="button" onClick={onClick} data-testid={testId}>
      {children}
    </button>
  );
}

export default NoteActionButton;