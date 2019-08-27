import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import logo from '~/assets/logo.svg';
import SignUpSchemaValidator from '~/schemaValidators/SignUpSchemaValidator';

export default function SignUp() {
  function handleSubmit(data) {}

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
        <button type="submit">Criar conta</button>
        <Link to="/">Já tenho login</Link>
      </Form>
    </>
  );
}
