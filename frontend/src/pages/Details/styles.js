import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 900px;
  margin: 50px auto;
  display: flex;
  flex-direction: column;

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    h1 {
      color: #fff;
    }
    div {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  img {
    margin-top: 50px;
    max-width: 900px;
    max-height: 300px;
    border-radius: 4px;
  }

  div {
    display: flex;
    align-items: center;
    margin-top: 25px;

    p {
      display: flex;
      align-items: center;
      justify-content: center;
      color: #999;
      font-size: 16px;
      margin-right: 30px;

      svg {
        margin-right: 10px;
      }
    }
  }
`;

export const EditButton = styled.button`
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

  svg {
    margin-right: 10px;
  }
`;

export const DeleteButton = styled.button`
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

  svg {
    margin-right: 10px;
  }
`;

export const Description = styled.p`
  margin-top: 25px;
  font-size: 18px;
  line-height: 32px;
  color: #fff;
  margin-bottom: 20px;
`;
