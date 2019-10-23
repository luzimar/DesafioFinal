import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string(),
      oldPassword: Yup.string(),
      password: Yup.string().when('oldPassword', (oldPassword, field) =>
        oldPassword
          ? field.min(6, 'Senha deve ter no mínimo 6 caracteres')
          : field
      ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password
          ? field.oneOf(
              [Yup.ref('password')],
              'Confirmação de senha não confere'
            )
          : field
      ),
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
