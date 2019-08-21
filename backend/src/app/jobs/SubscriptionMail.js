import Mail from '../../lib/Mail';

require('dotenv').config();

class SubscriptionMail {
  get key() {
    return process.env.SUBSCRIPTION_KEY;
  }

  async handle({ data }) {
    const { meetup, user } = data;
    await Mail.sendMail({
      to: `${meetup.organizer.name} <${meetup.organizer.email}>`,
      subject: 'Nova inscrição',
      template: 'subscription',
      context: {
        organizer: meetup.organizer.name,
        user: user.name,
        userEmail: user.email,
      },
    });
  }
}

export default new SubscriptionMail();
