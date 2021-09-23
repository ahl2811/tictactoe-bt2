import React from 'react';
import '../index.css';

export default function Square({ value, won, selected, onClick }) {
  let style = 'square';
  if (won) style += ' won';
  if (selected) style += ' selected';
  return (
    <button className={style} onClick={onClick}>
      {value}
    </button>
  );
}
