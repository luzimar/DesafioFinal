import { Op } from 'sequelize';
import Meetup from '../models/Meetup';
import Subscription from '../models/Subscription';
import User from '../models/User';
import SubscriptionMail from '../jobs/SubscriptionMail';

import Queue from '../../lib/Queue';

class SubscriptionController {
  async index(req, res) {
    const subscriptions = await Subscription.findAll({
      where: {
        user_id: req.userId,
      },
      include: [
        {
          model: Meetup,
          where: {
            date: {
              [Op.gt]: new Date(),
            },
          },
          required: true,
        },
        {
          model: User,
        },
      ],
      order: [[Meetup, 'date']],
    });

    return res.json(subscriptions);
  }

  async store(req, res) {
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
      return res.status(400).json({
        error: 'Não é possível se inscrever em seus próprios meetups',
      });
    }

    if (meetup.past) {
      return res
        .status(400)
        .json({ error: 'Inscrição não realizada, meetup já ocorreu :(' });
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
      return res.status(400).json({
        error:
          'Não é possível se inscrver em mais de um meetup do mesmo horário',
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
    return res.json(subscription);
  }
}

export default new SubscriptionController();
