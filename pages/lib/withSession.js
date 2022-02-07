import { withIronSession } from 'next-iron-session';

const withSession = (handler) =>
  withIronSession(handler, {
    password: process.env.IRON_SESSION_PASSWORD || '',
    cookieName: process.env.IRON_SESSION_COOKIE_NAME || '',
    // if your localhost is served on http:// then disable the secure flag
    cookieOptions: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    },
  });

export default withSession;
