import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 900px;
  margin: 50px auto;
  display: flex;
  flex-direction: column;

  form {
    display: flex;
    flex-direction: column;

    .btn-save-meetup {
      display: flex;
      justify-content: flex-end;

      button {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 5px 0 0;
        height: 40px;
        width: 180px;
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

        svg {
          margin-right: 10px;
        }
      }
    }
    input {
      background: rgba(0, 0, 0, 0.2);
      border: 0;
      border-radius: 4px;
      height: 50px;
      padding: 14px 20px;
      color: #fff;
      margin: 0 0 10px;
      font-size: 18px;
      width: 100%;

      &::placeholder {
        color: gray;
      }
    }

    textarea {
      background: rgba(0, 0, 0, 0.2);
      border: 0;
      border-radius: 4px;
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
  }
`;
