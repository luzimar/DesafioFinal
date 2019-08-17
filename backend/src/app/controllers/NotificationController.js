import Notification from '../schemas/Notification';
import Meetup from '../models/Meetup';

class NotificationController {
  async index(req, res) {
    const checkIsOrganizer = await Meetup.findOne({
      where: { user_id: req.userId },
    });

    if (!checkIsOrganizer) {
      return res
        .status(401)
        .json({ error: 'Only organizers can load notifications' });
    }

    const notifications = await Notification.find({
      user: req.userId,
    })
      .sort('createdAt')
      .limit(20);

    return res.json(notifications);
  }
}

export default new NotificationController();
