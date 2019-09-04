import * as Yup from 'yup';

const editMeetupSchemaValidator = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  email: Yup.string()
    .email('Informe um e-mail válido')
    .required('O e-mail é obrigatório'),
  oldPassword: Yup.string().required('A senha atual é obrigatória'),
  password: Yup.string().required('A senha é obrigatória'),
  confirmPassword: Yup.string().required(
    'A confirmação da senha é obrigatória'
  ),
});

export default editMeetupSchemaValidator;
