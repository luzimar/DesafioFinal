import styled from 'styled-components';

export const Container = styled.div`
  height: 300px;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 4px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  label {
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;

    &:hover {
      opacity: 0.7;
    }

    strong {
      font-size: 20px;
      color: #666;
    }

    input {
      display: none;
    }

    img {
      max-width: 900px;
      max-height: 300px;
      border-radius: 4px;
    }
  }
`;
