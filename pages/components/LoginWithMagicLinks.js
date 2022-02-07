import { Stytch } from '@stytch/stytch-react';
import React from 'react';

//This is the Stytch public token associated with your project   
const stytchPublicToken = process.env.NEXT_PUBLIC_STYTCH_PUBLIC_TOKEN

//This is the style set for Stytch's SDK and can be customized
const sdkStyle = {
    fontFamily: '"Helvetica New", Helvetica, sans-serif',
    primaryColor: '#19303d',
    primaryTextColor: '#090909',
    width: '321px',
    hideHeaderText: true,
};

//These are key parameters used in the Magic Link email sent to users; you will need to define the product and login / signup URLs, as seen below
const magicLinksView = {
  products: ["emailMagicLinks"],
  emailMagicLinksOptions: {
    loginRedirectURL: 'http://localhost:3000/api/authenticate_magic_link',
    loginExpirationMinutes: 30,
    signupRedirectURL: 'http://localhost:3000/api/authenticate_magic_link',
    signupExpirationMinutes: 30,
    createUserAsPending: false,
  },
};

const LoginWithMagicLinks = ({ styles }) => {
  return (
    <div className={styles.stytchContainer}>
      <h2> Sign up or log in</h2>
      <p> Enter your email address to receive an Email Magic Link for authentication.</p>
      <Stytch
        publicToken={stytchPublicToken || ''}
        loginOrSignupView={magicLinksView}
        style = {sdkStyle}
      />
    </div>
  );
};

export default LoginWithMagicLinks;