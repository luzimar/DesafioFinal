import React, { useState } from 'react';
import { MdAddCircleOutline } from 'react-icons/md';
import { Form, Input } from '@rocketseat/unform';
import { useDispatch, useSelector } from 'react-redux';
import { BounceLoader } from 'react-spinners';
import { Container } from './styles';
import EditProfileSchemaValidator from '~/schemaValidators/EditProfileSchemaValidator';
import { updateProfileRequest } from '~/store/modules/user/actions';

import Loading from '~/styles/loading';

export default function Profile() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.user.loading);
  const user = useSelector(state => state.user.profile);

  function handleSubmit({
    name,
    email,
    oldPassword,
    password,
    confirmPassword,
  }) {
    dispatch(
      updateProfileRequest(name, email, oldPassword, password, confirmPassword)
    );
  }

  return (
    <Container>
      <Form
        schema={EditProfileSchemaValidator}
        initialData={user}
        onSubmit={handleSubmit}
      >
        <Input name="name" />

        <Input name="email" />

        <hr />
        <Input type="password" name="oldPassword" placeholder="Senha atual" />
        <Input type="password" name="password" placeholder="Nova senha" />
        <Input
          type="password"
          name="confirmPassword"
          placeholder="Confirmação de senha"
        />

        <div className="btn-save-meetup">
          <button type="submit">
            {loading ? (
              <Loading>
                <BounceLoader sizeUnit="px" size={24} color="#fff" />
              </Loading>
            ) : (
              <>
                <MdAddCircleOutline size={24} color="#fff" />
                Salvar perfil
              </>
            )}
          </button>
        </div>
      </Form>
    </Container>
  );
}
