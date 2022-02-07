# A starter repo for building a completely custom client portal on Airtable

![End state](https://docs.syncinc.so/assets/client-portal/01.png)

You can build this project from scratch by following **[the step-by-step guide](https://docs.sequin.io/airtable/playbooks/client-portal)**.

Or, you can simply start building from this foundation 🚀

## Getting Started

1. Clone the project.
2. Install the dependencies with `npm install`
3. Create a `.env.local` file and add your environment variables for (1) [Stytch](https://www.stytch.com/) (2) [Sequin.io](https://www.sequin.io/) and (2) [Airtable](https://airtable.com)

```bash
# .env.local file
PG_CONNECTION_STRING="..."
AIRTABLE_API_KEY="..."
AIRTABLE_BASE="..."
STYTCH_PROJECT_ENV='test'
STYTCH_PROJECT_ID="..."
NEXT_PUBLIC_STYTCH_PUBLIC_TOKEN="..."
STYTCH_SECRET="..."
IRON_SESSION_COOKIE_NAME="stytch_next_example_cookie"
IRON_SESSION_PASSWORD="complex_password_at_least_32_characters_long"
```
4. Launch your development environment `npm run dev`

## Deploy to Vercel
Once you've built your client portal, you can deploy your Next.js app using [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).
