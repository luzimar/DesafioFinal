import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      file_id: Yup.number().required(),
      title: Yup.string()
        .required('Título é obrigatório')
        .min(5, 'Título deve ter no mínimo 5 caracteres'),
      description: Yup.string()
        .required('Descrição é obrigatória')
        .min(10, 'Descrição deve ter no mínimo 10 caracteres'),
      location: Yup.string()
        .required('Localização é obrigatória')
        .min(15, 'Localização deve ter no mínimo 15 caracteres'),
      date: Yup.date('Data inválida').required('Data é obrigatória'),
    });
    await schema.validate(req.body, { abortEarly: false });
    return next();
  } catch (error) {
    return res.json({
      success: false,
      message:
        error.inner.length > 1
          ? error.inner.map(m => m.message)
          : error.message,
    });
  }
};
