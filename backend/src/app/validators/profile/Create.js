import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      name: Yup.string().required('Nome é obrigatório'),
      email: Yup.string()
        .email('E-mail inválido')
        .required('E-mail é obrigatório'),
      password: Yup.string()
        .required('Senha é obrigatória')
        .min(6, 'Senha deve ter no mínimo 6 caracteres'),
    });

    await schema.validate(req.body, { abortEarly: false });
    return next();
  } catch (error) {
    return res.json({
      success: false,
      message:
        error.inner.length > 1
          ? error.inner.map(m => `${m.message}\n`)
          : error.message,
    });
  }
};
