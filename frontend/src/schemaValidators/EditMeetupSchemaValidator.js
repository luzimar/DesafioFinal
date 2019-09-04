import * as Yup from 'yup';

const editMeetupSchemaValidator = Yup.object().shape({
  title: Yup.string().required('O título é obrigatório'),
  description: Yup.string().required('A descrição é obrigatória'),
  date: Yup.string().required('A data é obrigatória'),
  location: Yup.string().required('A localização é obrigatória'),
});

export default editMeetupSchemaValidator;
