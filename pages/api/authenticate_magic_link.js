// This API route authenticates a Stytch magic link.
import withSession from '../lib/withSession';
import loadStytch from '../lib/loadStytch';

export async function handler(req, res) {
  if (req.method === 'GET') {
    const client = loadStytch();
    const { token } = req.query;
    
    try {
      // Set session
      const resp = await client.magicLinks.authenticate(token, {session_duration_minutes: 20160});

      req.session.destroy();
      
      //User's email address and token will be used in authentication and to pull projects
      const user_details = await client.users.get(resp.user_id)

      req.session.set('user', {
        email: user_details.emails[0].email,
        session_token: resp.session_token
      });
      
      // Save additional user data here
      await req.session.save();
      return res.redirect('/');
    } catch (error) {
      const errorString = JSON.stringify(error);
      console.log(error);
      return res.status(400).json({ errorString });
    }
  } else {
    // Handle any other HTTP method
  }
}

export default withSession(handler);