import React from 'react';
import logo from '~/assets/logo.png';
import { Image } from 'react-native';
import { Container } from './styles';

export default function Header() {
  return (
    <Container>
      <Image source={logo} style={{ width: 30, height: 30 }} />
    </Container>
  );
}
