import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  background: rgba(0, 0, 0, 0.4);
  padding: 0 30px;
`;

export const Content = styled.div`
  height: 64px;
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  aside {
    display: flex;
    align-items: center;

    div {
      text-align: right;
      margin-right: 20px;

      strong {
        display: block;
        color: #fff;
      }

      a {
        display: block;
        margin-top: 2px;
        font-size: 12px;
        color: #999;
      }
    }

    button {
      margin: 5px 0 0;
      height: 35px;
      width: 60px;
      background: #f94d6a;
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.03, '#f94d6a')};
      }
    }
  }
`;
