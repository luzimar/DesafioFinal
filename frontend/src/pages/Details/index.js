import React from 'react';

// import { Container } from './styles';

export default function Details({ match }) {
  const id = decodeURIComponent(match.params.id);
  return <h1>Detalhes do meetup { id }</h1>;
}
