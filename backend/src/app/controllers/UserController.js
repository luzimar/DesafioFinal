import User from '../models/User';

class UserController {
  async index(req, res) {
    const users = await User.findAll();
    return res.json(users);
  }

  async store(req, res) {
    try {
      const userExists = await User.findOne({
        where: { email: req.body.email },
      });

      if (userExists) {
        return res.json({ success: false, message: 'Usuário já existe' });
      }
      const { id, name, email } = await User.create(req.body);
      return res.json({
        success: true,
        message: 'Usuário cadastrado com sucesso',
        id,
        name,
        email,
      });
    } catch (error) {
      return res.json({
        success: false,
        message:
          'Algo deu errado ao cadastrar usuário, verifique seus dados :(',
      });
    }
  }

  async update(req, res) {
    const { email, oldPassword } = req.body;
    const user = await User.findByPk(req.userId);

    if (email !== user.email) {
      const userExists = await User.findOne({ where: { email } });

      if (userExists) {
        return res.json({
          success: false,
          message: 'Já existe um usuário com o e-mail informado',
        });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.json({ success: false, message: 'Senha atual inválida' });
    }

    try {
      const { id, name } = await user.update(req.body);

      return res.json({
        success: true,
        message: 'Perfil editado com sucesso',
        user: {
          id,
          name,
          email,
        },
      });
    } catch (error) {
      return res.json({
        success: false,
        message: 'Algo deu errado ao editar perfil, verifique seus dados :(',
      });
    }
  }
}

export default new UserController();
