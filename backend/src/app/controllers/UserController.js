import * as Yup from 'yup';
import User from '../models/User';

class UserController {
  async index(req, res) {
    const users = await User.findAll();
    return res.json(users);
  }

  async store(req, res) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string()
          .email()
          .required(),
        password: Yup.string()
          .required()
          .min(6),
      });

      if (!(await schema.isValid(req.body))) {
        return res.json({ success: false, message: 'Validation fails' });
      }

      const userExists = await User.findOne({
        where: { email: req.body.email },
      });

      if (userExists) {
        return res.json({ success: false, message: 'User already exists.' });
      }
      const { id, name, email } = await User.create(req.body);
      return res.json({
        success: true,
        id,
        name,
        email,
      });
    } catch (error) {
      return res.json({
        success: false,
        message: 'An error occurred while creating user :(',
      });
    }
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.json({ success: false, message: 'Validation fails' });
    }
    const { email, oldPassword, password } = req.body;
    const user = await User.findByPk(req.userId);

    if (email !== user.email) {
      const userExists = await User.findOne({ where: { email } });

      if (userExists) {
        return res.json({ success: false, message: 'User already exists.' });
      }
    }

    if (password && !oldPassword) {
      return res.json({ success: false, message: 'Old password not provided' });
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.json({ success: false, message: 'Password does not match' });
    }

    try {
      const { id, name } = await user.update(req.body);

      return res.json({
        success: true,
        user: {
          id,
          name,
          email,
        },
      });
    } catch (error) {
      return res.json({
        success: false,
        message: 'An error occurred while updating user :(',
      });
    }
  }
}

export default new UserController();
