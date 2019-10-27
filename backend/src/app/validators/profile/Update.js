import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    console.log('TESTE');
    const schema = Yup.object().shape(
      {
        name: Yup.string().required('O nome é obrigatório'),
        email: Yup.string()
          .email('Informe um e-mail válido')
          .required('O e-mail é obrigatório'),
        oldPassword: Yup.string().when('password', {
          is: val => val != null,
          then: Yup.string().required('Senha antiga é obrigatória'),
          otherwise: Yup.string(),
        }),
        password: Yup.string().when('oldPassword', {
          is: val => val != null,
          then: Yup.string()
            .required('Senha é obrigatória')
            .min(6, 'Senha deve ter no mínimo 6 caracteres'),
          otherwise: Yup.string(),
        }),
        confirmPassword: Yup.string().when('password', (password, field) =>
          password
            ? field.oneOf(
                [Yup.ref('password')],
                'Confirmação de senha não confere'
              )
            : field
        ),
      },
      ['password', 'oldPassword']
    );

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
