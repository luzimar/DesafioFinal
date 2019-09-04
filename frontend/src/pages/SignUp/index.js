import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import { BounceLoader } from 'react-spinners';
import logo from '~/assets/logo.svg';
import SignUpSchemaValidator from '~/schemaValidators/SignUpSchemaValidator';
import { signUpRequest } from '~/store/modules/auth/actions';
import Loading from '~/styles/loading';

export default function SignUp() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  function handleSubmit({ name, email, password }) {
    dispatch(signUpRequest(name, email, password));
  }

  return (
    <>
      <img src={logo} alt="Meetapp" />
      <Form schema={SignUpSchemaValidator} onSubmit={handleSubmit}>
        <Input name="name" type="text" placeholder="Nome completo" />
        <Input name="email" type="email" placeholder="Digite seu e-mail" />
        <Input
          name="password"
          type="password"
          placeholder="Sua senha secreta"
        />
        <button type="submit">
          {' '}
          {loading ? (
            <Loading>
              <BounceLoader sizeUnit="px" size={34} color="#fff" loading />
            </Loading>
          ) : (
            'Criar conta'
          )}
        </button>
        <Link to="/">Já tenho login</Link>
      </Form>
    </>
  );
}
