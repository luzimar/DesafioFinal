export default {
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: false,
  auth: {
    user: process.env.MAIL_USER_AUTH,
    pass: process.env.MAIL_PASS_AUTH,
  },
  default: {
    from: 'Equipe Meetup <noreply@meetup.com>',
  },
};
