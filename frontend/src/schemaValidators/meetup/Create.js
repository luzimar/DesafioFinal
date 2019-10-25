import * as Yup from 'yup';

const obj = Yup.object().shape({
  file_id: Yup.string().required('O Banner é obrigatório'),
  title: Yup.string().required('O título é obrigatório'),
  description: Yup.string().required('A descrição é obrigatória'),
  date: Yup.string().required('A data é obrigatória'),
  location: Yup.string().required('A localização é obrigatória'),
});

export default obj;
