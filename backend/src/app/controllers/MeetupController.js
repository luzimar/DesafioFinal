import { Op } from 'sequelize';
import * as Yup from 'yup';
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
        message: 'An error occurred while get meetups :(',
      });
    }
  }

  async store(req, res) {
    try {
      const schema = Yup.object().shape({
        file_id: Yup.number().required(),
        title: Yup.string().required(),
        description: Yup.string().required(),
        location: Yup.string().required(),
        date: Yup.date().required(),
      });

      if (!(await schema.isValid(req.body))) {
        return res.json({ success: false, message: 'Validation fails' });
      }

      const { date } = req.body;

      if (isBefore(parseISO(date), new Date())) {
        return res.json({ success: false, message: 'Meetup date invalid' });
      }

      const meetup = await Meetup.create({
        ...req.body,
        user_id: req.userId,
      });

      return res.json({
        success: true,
        meetup,
      });
    } catch (error) {
      return res.json({
        success: false,
        message: 'An error occurred while creating meetup :(',
      });
    }
  }

  async update(req, res) {
    try {
      const schema = Yup.object().shape({
        file_id: Yup.number(),
        title: Yup.string(),
        description: Yup.string(),
        location: Yup.string(),
        date: Yup.date(),
      });

      if (!(await schema.isValid(req.body))) {
        return res.json({ error: 'Validation fails' });
      }

      const meetup = await Meetup.findByPk(req.params.id);
      if (meetup.user_id !== req.userId) {
        return res.json({ success: false, message: 'Not authorized' });
      }

      const { date } = req.body;

      if (isBefore(parseISO(date), new Date())) {
        return res.json({ success: false, message: 'Meetup date invalid' });
      }

      if (meetup.past) {
        return res.json({
          success: false,
          message: 'Event has already occurred',
        });
      }

      await meetup.update(req.body);
      return res.json({
        success: true,
        meetup,
      });
    } catch (error) {
      return res.json({
        success: false,
        message: 'An error occurred while updating meetup :(',
      });
    }
  }

  async delete(req, res) {
    try {
      const meetup = await Meetup.findByPk(req.params.id);
      if (meetup.user_id !== req.userId) {
        return res.json({ success: false, message: 'Not authorized' });
      }
      if (meetup.past) {
        return res.json({
          success: false,
          message: "Can't delete past meetups",
        });
      }

      await meetup.destroy();

      return res.json({
        success: true,
        message: 'Meetup deleted successfully',
      });
    } catch (error) {
      return res.json({
        success: false,
        message: 'An error occurred while deleting meetup :(',
      });
    }
  }
}

export default new MeetupController();
