import Airtable from "airtable";
import loadStytch from '../../lib/loadStytch';

const client = loadStytch();

// Instantiate the Airtable client using the Sequin proxy
const base = new Airtable({
    apiKey: process.env.AIRTABLE_API_KEY,
    endpointUrl: "https://proxy.sequin.io/api.airtable.com",
}).base(process.env.AIRTABLE_BASE);

export default async (req, res) => {
    const { projectId } = req.query;

    //User's token is passed through in the request body  
    const body = JSON.parse(req.body)
    
    try {
      //Authenticate session using Stytch
      const resp = await client.sessions.authenticate({session_token: `${body.session_token}`});

      if (resp.status_code == 200) {
        try {
            // Update project complete status
            await base('Design projects')
            .update([{"id": projectId, "fields": {"Complete": true}}]);

            // Respond with a 204
            res.statusCode = 204;
            res.end();
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