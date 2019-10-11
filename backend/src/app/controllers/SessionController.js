import jwt from 'jsonwebtoken';
import User from '../models/User';
import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res.json({ success: false, message: 'Usuário não encontrado' });
      }

      if (!(await user.checkPassword(password))) {
        return res.json({ success: false, message: 'Senha incorreta' });
      }

      const { id, name } = user;

      return res.json({
        success: true,
        user: {
          id,
          name,
          email,
        },
        token: jwt.sign({ id }, authConfig.secret, {
          expiresIn: authConfig.expiresIn,
        }),
      });
    } catch (error) {
      return res.json({
        success: false,
        message: 'Algo deu errado ao fazer login, verifique seus dados :(',
      });
    }
  }
}

export default new SessionController();
