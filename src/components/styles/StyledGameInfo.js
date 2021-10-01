import styled from 'styled-components';

const GameInfo = styled.div`
  margin-left: 20px;
`;

const MoveList = styled.ul`
  max-height: ${(props) => props.maxHeight}px;
  overflow-y: auto;
  margin-top: 8px;
  margin: 0;
  padding: 0;
  padding-right: 4px;
  list-style-type: none;
`;

const MoveButton = styled.button`
  border: none;
  background: #ddd;
  padding: 8px 16px;
  margin-bottom: 4px;
  width: 100%;

  &:hover {
    opacity: 0.8;
  }

  ${(props) =>
    props.selected &&
    `
      background: #444;
      color: #fff;
    `}
`;

const SortButton = styled.button`
  width: 100%;
  border: 0;
  border-radius: 4px 4px 0 0;
  background: #222;
  color: #fff;
  padding: 4px;
  margin: 4px 0;
  margin-top: 8px;

  &:hover{
    opacity: 0.9;
  }
}
`;

const GameStatus = styled.div`
  margin-bottom: 12px;

  ${(props) =>
    props.won &&
    `color: red; 
    font-weight: bold`}
  ${(props) =>
    props.draw &&
    `color: blue ; 
    font-weight: bold`}
`;

export { GameInfo, MoveList, MoveButton, SortButton, GameStatus };
