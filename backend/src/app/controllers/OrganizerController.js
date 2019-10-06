import Meetup from '../models/Meetup';
import User from '../models/User';
import File from '../models/File';

class OrganizerController {
  async index(req, res) {
    const meetups = await Meetup.findAll({
      where: {
        user_id: req.userId,
      },
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
    });

    return res.json({ success: true, meetups });
  }
}

export default new OrganizerController();
