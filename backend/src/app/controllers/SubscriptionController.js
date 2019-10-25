import { Op } from 'sequelize';
import { parseISO, startOfDay, endOfDay } from 'date-fns';
import Meetup from '../models/Meetup';
import Subscription from '../models/Subscription';
import User from '../models/User';
import SubscriptionMail from '../jobs/SubscriptionMail';
import File from '../models/File';

import Queue from '../../lib/Queue';

class SubscriptionController {
  async index(req, res) {
    try {
      const page = req.query.page || 1;
      const where = {
        user_id: req.userId,
      };

      if (req.query.date) {
        const date = parseISO(req.query.date);

        where.createdAt = {
          [Op.between]: [startOfDay(date), endOfDay(date)],
        };
      }

      const subscriptions = await Subscription.findAll({
        where,
        include: [
          {
            model: Meetup,
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
            required: true,
          },
          {
            model: User,
          },
        ],
        limit: 10,
        offset: (page - 1) * 10,
        order: [[Meetup, 'date']],
      });

      return res.json({
        success: true,
        subscriptions,
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
      const meetup = await Meetup.findByPk(req.params.meetupId, {
        include: [
          {
            model: User,
            as: 'organizer',
            attributes: ['name', 'email'],
          },
        ],
      });

      if (meetup.user_id === req.userId) {
        return res.json({
          success: false,
          message: 'Não é possível se inscrever em seus próprios meetups',
        });
      }

      if (meetup.past) {
        return res.json({
          success: false,
          message: 'Inscrição não realizada, meetup já ocorreu :(',
        });
      }

      const alreadySubscribed = await Subscription.findOne({
        where: {
          user_id: req.userId,
        },
        include: [
          {
            model: Meetup,
            required: true,
            where: {
              date: meetup.date,
            },
          },
        ],
      });

      if (alreadySubscribed) {
        return res.json({
          success: false,
          message:
            'Não é possível se inscrever em mais de um meetup do mesmo horário',
        });
      }

      const subscription = await Subscription.create({
        user_id: req.userId,
        meetup_id: meetup.id,
      });

      const user = await User.findByPk(req.userId);

      await Queue.add(SubscriptionMail.key, {
        meetup,
        user,
      });
      return res.json({
        success: true,
        message: 'Inscrição realizada com sucesso :)',
        subscription,
      });
    } catch (error) {
      return res.json({
        success: false,
        message: 'Algo deu errado ao listar as inscrições :(',
      });
    }
  }

  async delete(req, res) {
    try {
      const subscription = await Subscription.findByPk(req.params.id);
      if (subscription.user_id !== req.userId) {
        return res.json({ success: false, message: 'Não autorizado' });
      }
      if (subscription.past) {
        return res.json({
          success: false,
          message:
            'Não é possível cancelar inscrições de meetups que já ocorreram',
        });
      }

      await subscription.destroy();

      return res.json({
        success: true,
        message: 'Inscrição cancelada com sucesso',
      });
    } catch (error) {
      return res.json({
        success: false,
        message: 'Algo deu errado ao cancelar a inscrição :(',
      });
    }
  }
}

export default new SubscriptionController();
