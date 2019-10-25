import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email('E-mail inválido')
        .required('Informe o e-mail'),
      password: Yup.string().required('Informe a senha'),
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
