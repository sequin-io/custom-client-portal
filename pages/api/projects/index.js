import loadStytch from '../../lib/loadStytch';

const client = loadStytch();
const {Pool} = require('pg');
const connectionString = process.env.PG_CONNECTION_STRING;
const pool = new Pool({
    connectionString,
});

export default async (req, res) => {
  //User's token and email are passed through in the request body  
  const body = JSON.parse(req.body)
    
  try {
    //Authenticate session using Stytch
    const resp = await client.sessions.authenticate({session_token: `${body.session_token}`});

    if (resp.status_code == 200) {
      const email = body.email
      try {
        // Get design_projects by clients.email
        // Query credit: https://www.garysieling.com/blog/postgres-join-on-an-array-field/
        const query = `select design_projects.*
                        from design_projects
                                join clients on clients.id = ANY (design_projects.client)
                        where clients.email like $1;`;
        const {rows} = await pool.query(query, [email]);

        // Respond with results
        res.statusCode = 200;
        res.json(rows);
    } catch (e) {
        // Handle any errors
        console.log(e);
        res.statusCode = 500;
        res.end("Server error. Something went wrong.");
    }
  } else {
      return res.status(400).json({ errorString });
    };
  } catch (error) {
      const errorString = JSON.stringify(error);
      console.log(error);
      return res.status(400).json({ errorString });
  }
}