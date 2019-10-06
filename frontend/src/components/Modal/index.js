import React from 'react';

import {
  Container,
  Header,
  Body,
  ConfirmButton,
  DismissButton,
} from './styles';

export default function BaseModal({
  handleClose,
  handleConfirm,
  description,
  show,
}) {
  return (
    <>
      {show && (
        <Container>
          <Body>
            <h2>{description}</h2>
            <div>
              <ConfirmButton onClick={handleConfirm}>Sim</ConfirmButton>
              <DismissButton onClick={handleClose}>Não</DismissButton>
            </div>
          </Body>
        </Container>
      )}
    </>
  );
}
