import * as Yup from 'yup';

const editMeetupSchemaValidator = Yup.object().shape(
  {
    name: Yup.string().required('O nome é obrigatório'),
    email: Yup.string()
      .email('Informe um e-mail válido')
      .required('O e-mail é obrigatório'),
    oldPassword: Yup.string().when('password', {
      is: val => val != '',
      then: Yup.string().required('Senha antiga é obrigatória'),
      otherwise: Yup.string(),
    }),
    password: Yup.string().when('oldPassword', {
      is: val => val != '',
      then: Yup.string().required('Senha é obrigatória'),
      otherwise: Yup.string(),
    }),
    confirmPassword: Yup.string().when('password', (password, field) =>
      password
        ? field.oneOf([Yup.ref('password')], 'Confirmação de senha não confere')
        : field
    ),
  },
  ['password', 'oldPassword']
);

export default editMeetupSchemaValidator;
