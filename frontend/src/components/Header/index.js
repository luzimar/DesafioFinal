import React from 'react';
import { Link } from 'react-router-dom';
import logo from '~/assets/logo.svg';

import { Container, Content } from './styles';

export default function Header() {
  return (
    <Container>
      <Content>
        <Link to="/dashboard">
          <img src={logo} alt="Meetapp" />
        </Link>
        <aside>
          <div>
            <strong>Luzimar Oliveira</strong>
            <Link to="/profile">Meu perfil</Link>
          </div>
          <button>Sair</button>
        </aside>
      </Content>
    </Container>
  );
}
