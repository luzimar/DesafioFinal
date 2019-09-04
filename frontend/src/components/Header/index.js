import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import logo from '~/assets/logo.svg';
import { Container, Content } from './styles';
import { signOut } from '~/store/modules/auth/actions';

export default function Header() {
  const user = useSelector(state => state.user.profile);
  const dispatch = useDispatch();

  function logout() {
    dispatch(signOut());
  }
  return (
    <Container>
      <Content>
        <Link to="/dashboard">
          <img src={logo} alt="Meetapp" />
        </Link>
        <aside>
          <div>
            <strong>{user.name}</strong>
            <Link to="/profile">Meu perfil</Link>
          </div>
          <button onClick={logout}>Sair</button>
        </aside>
      </Content>
    </Container>
  );
}
