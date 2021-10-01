import styled from 'styled-components';

const StyledSquare = styled.div`
  background: #fff;
  border: 1px solid #999;
  float: left;
  font-size: 24px;
  font-weight: 600;
  line-height: 34px;
  height: 40px;
  margin-right: -1px;
  margin-top: -1px;
  padding: 0;
  text-align: center;
  width: 40px;
  cursor: default;

  ${(props) => props.won && `color: red;`}

  ${(props) => props.selected && `background: #eee;`}
`;
export { StyledSquare };
