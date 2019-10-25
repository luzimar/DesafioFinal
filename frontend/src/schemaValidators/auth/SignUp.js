import * as Yup from 'yup';

const obj = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  email: Yup.string()
    .email('Informe um e-mail válido')
    .required('O e-mail é obrigatório'),
  password: Yup.string()
    .min(6, 'Senha deve ter no mínimo 6 caracteres')
    .required('A senha é obrigatória'),
});
export default obj;
