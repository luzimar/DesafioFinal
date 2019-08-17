import { Op } from 'sequelize';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Meetup from '../models/Meetup';
import Subscription from '../models/Subscription';
import User from '../models/User';
import Notification from '../schemas/Notification';

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
    const meetup = await Meetup.findByPk(req.params.meetupId);

    if (meetup.user_id === req.userId) {
      return res
        .status(400)
        .json({ error: "Can't subscribe to you own meetups" });
    }

    if (meetup.past) {
      return res
        .status(400)
        .json({ error: "Can't subscribe, meetup has already occurred" });
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
      return res
        .status(400)
        .json({ error: "Can't subscribe to two meetups at the same time" });
    }

    const subscription = await Subscription.create({
      user_id: req.userId,
      meetup_id: meetup.id,
    });

    const userSubscribe = await User.findByPk(req.userId);
    const formattedDate = format(
      new Date(),
      "'dia' dd 'de' MMMM', ás' H:mm'h'",
      { locale: pt }
    );

    await Notification.create({
      content: `Nova inscrição de ${userSubscribe.name}, ${formattedDate}`,
      user: meetup.user_id,
    });
    return res.json(subscription);
  }
}

export default new SubscriptionController();
