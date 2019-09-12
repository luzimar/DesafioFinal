import jwt from 'jsonwebtoken';
import User from '../models/User';
import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res.json({ success: false, message: 'User not found' });
      }

      if (!(await user.checkPassword(password))) {
        return res.json({ success: false, message: 'Incorrect password' });
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
        message: 'An error occurred while login :(',
      });
    }
  }
}

export default new SessionController();
