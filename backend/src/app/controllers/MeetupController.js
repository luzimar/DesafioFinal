import { Op } from 'sequelize';
import { parseISO, isBefore, startOfDay, endOfDay } from 'date-fns';
import Meetup from '../models/Meetup';
import User from '../models/User';
import File from '../models/File';

class MeetupController {
  async index(req, res) {
    try {
      const page = req.query.page || 1;
      const where = {};

      if (req.query.date) {
        const date = parseISO(req.query.date);

        where.date = {
          [Op.between]: [startOfDay(date), endOfDay(date)],
        };
      }

      const meetups = await Meetup.findAll({
        where,
        order: ['date'],
        attributes: ['id', 'title', 'description', 'location', 'date'],
        include: [
          {
            model: User,
            as: 'organizer',
            attributes: ['id', 'name', 'email'],
          },
          {
            model: File,
            as: 'banner',
            attributes: ['id', 'path', 'url'],
          },
        ],
        limit: 10,
        offset: (page - 1) * 10,
      });

      return res.json({
        success: true,
        meetups,
      });
    } catch (error) {
      return res.json({
        success: false,
        message: 'Algo deu errado ao listar os meetups :(',
      });
    }
  }

  async store(req, res) {
    try {
      const { date } = req.body;

      if (isBefore(parseISO(date), new Date())) {
        return res.json({ success: false, message: 'Data inválida' });
      }

      const meetup = await Meetup.create({
        ...req.body,
        user_id: req.userId,
      });

      return res.json({
        success: true,
        message: 'Meetup criado com sucesso :)',
        meetup,
      });
    } catch (error) {
      return res.json({
        success: false,
        message: 'Algo deu errado ao criar o meetup, verifique seus dados :(',
      });
    }
  }

  async update(req, res) {
    try {
      const meetup = await Meetup.findByPk(req.params.id);
      if (meetup.user_id !== req.userId) {
        return res.json({ success: false, message: 'Não autorizado' });
      }

      const { date } = req.body;

      if (isBefore(parseISO(date), new Date())) {
        return res.json({ success: false, message: 'Data inválida' });
      }

      if (meetup.past) {
        return res.json({
          success: false,
          message: 'Meetup já ocorreu',
        });
      }

      await meetup.update(req.body);
      return res.json({
        success: true,
        message: 'Meetup editado com sucesso :)',
        meetup,
      });
    } catch (error) {
      return res.json({
        success: false,
        message: 'Algo deu errado ao atualizar o meetup :(',
      });
    }
  }

  async delete(req, res) {
    try {
      const meetup = await Meetup.findByPk(req.params.id);
      if (meetup.user_id !== req.userId) {
        return res.json({ success: false, message: 'Não autorizado' });
      }
      if (meetup.past) {
        return res.json({
          success: false,
          message: 'Não é possível cancelar meetups que já ocorreram',
        });
      }

      await meetup.destroy();

      return res.json({
        success: true,
        message: 'Meetup cancelado com sucesso',
      });
    } catch (error) {
      return res.json({
        success: false,
        message: 'Algo deu errado ao cancelar o meetup :(',
      });
    }
  }
}

export default new MeetupController();
