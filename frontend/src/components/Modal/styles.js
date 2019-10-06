import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.dialog`
  display: flex;
  flex-direction: column;
  width: 400px;
  margin: auto;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  border: 0;
`;

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 20px;

  h2 {
    color: #22202c;
  }

  div {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 20px;
    align-self: stretch;
    justify-content: space-between;
  }
`;

export const ConfirmButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  height: 42px;
  width: 116px;
  background: #1cacf4;
  font-weight: bold;
  color: #fff;
  border: 0;
  border-radius: 4px;
  font-size: 16px;
  transition: background 0.2s;

  &:hover {
    background: ${darken(0.08, '#1CACF4')};
  }
`;

export const DismissButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 42px;
  width: 138px;
  background: #f94d6a;
  font-weight: bold;
  color: #fff;
  border: 0;
  border-radius: 4px;
  font-size: 16px;
  transition: background 0.2s;

  &:hover {
    background: ${darken(0.08, '#f94d6a')};
  }
`;
