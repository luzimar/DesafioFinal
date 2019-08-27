import * as Yup from 'yup';

const signInSchemaValidator = Yup.object().shape({
  email: Yup.string()
    .email('Informe um e-mail válido')
    .required('O e-mail é obrigatório'),
  password: Yup.string().required('A senha é obrigatória'),
});

export default signInSchemaValidator;
