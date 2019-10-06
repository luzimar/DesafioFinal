import styled from 'styled-components';
import notFound from '~/assets/not_found.png';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 30px;
  background: url(${notFound});
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;

  h1 {
    color: #2454a4;
  }

  img {
    max-width: 500px;
    max-height: 900px;
    width: auto;
    height: auto;
  }
`;
