import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const Content = styled.div`
  width: 100%;
  max-width: 315px;

  img {
    margin: auto;
    display: block;
  }

  form {
    display: flex;
    flex-direction: column;
    margin-top: 50px;

    input {
      background: rgba(0, 0, 0, 0.2);
      border: 0;
      border-radius: 4px;
      height: 50px;
      padding: 14px 20px;
      color: #fff;
      margin: 0 0 10px;
      font-size: 18px;

      &::placeholder {
        color: gray;
      }
    }

    span {
      color: #f94d6a;
      align-self: flex-start;
      margin-bottom: 10px;
    }

    button {
      margin: 5px 0 0;
      height: 50px;
      background: #f94d6a;
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 18px;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.08, '#f94d6a')};
      }
    }
    a {
      text-align: center;
      color: #fff;
      margin-top: 20px;
      font-size: 16px;
      opacity: 0.6;

      &:hover {
        opacity: 1;
      }
    }
  }
`;
