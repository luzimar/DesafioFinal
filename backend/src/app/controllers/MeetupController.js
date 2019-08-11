class MeetupController {
  async store(req, res) {
    return res.json({ message: 'Meetup created successfully :D' });
  }
}

export default new MeetupController();
