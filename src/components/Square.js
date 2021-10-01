import React from 'react';
import '../index.css';
import { StyledSquare } from './styles/StyledSquare';

export default function Square({ value, won, selected, onClick }) {
  return (
    <StyledSquare won={won} selected={selected} onClick={onClick}>
      {value}
    </StyledSquare>
  );
}
