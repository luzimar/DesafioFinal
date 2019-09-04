import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import { BounceLoader } from 'react-spinners';
import logo from '~/assets/logo.svg';
import SignInSchemaValidator from '~/schemaValidators/SignInSchemaValidator';
import { signInRequest } from '~/store/modules/auth/actions';
import Loading from '~/styles/loading';

export default function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  return (
    <>
      <img src={logo} alt="Meetapp" />
      <Form schema={SignInSchemaValidator} onSubmit={handleSubmit}>
        <Input name="email" type="email" placeholder="Digite seu e-mail" />
        <Input
          name="password"
          type="password"
          placeholder="Sua senha secreta"
        />
        <button type="submit">
          {loading ? (
            <Loading>
              <BounceLoader sizeUnit="px" size={34} color="#fff" />
            </Loading>
          ) : (
            'Entrar'
          )}
        </button>
        <Link to="/register">Criar conta grátis</Link>
      </Form>
    </>
  );
}
