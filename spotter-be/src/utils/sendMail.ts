import mailgun from 'mailgun-js';
const DOMAIN: string | undefined = process.env.MG_DOMAIN;
const TESTING: string | undefined = process.env.TESTING;
// new mailgun instance
const mg: mailgun.Mailgun = mailgun({
  apiKey: process.env.MG_KEY || 'unauthorized',
  // need to change domain once production domain is purchased and verified in mailgun
  domain: DOMAIN || 'unauthorized',
  testMode: Boolean(TESTING)
});

// data object that specifies a sender, recipient, email subject, and html template for email
interface MGData {
  from: string;
  to: string;
  subject: string;
  html: string;
}
const data = (to: string, subject: string, html: string): MGData => {
  return {
    // need to change from email once domain is purchased and verified in mailgun
    from: 'danbergelt@protonmail.com',
    to,
    subject,
    html
  };
};

// send mail async function - sends an automated email when called
type TSendMail = (to: string, subject: string, html: string) => Promise<void>;
export const sendMail: TSendMail = async (to, subject, html) => {
  await mg.messages().send(data(to, subject, html));
};

// email template for forgot password
export const forgotPasswordTemplate = (url: string): string => {
  return `
  <html>
  <div>Someone requested a password reset for your account. If this was not you, please disregard this email. If you'd like to continue click the link below.</div>
  <br />
  <div>This link will expire in 10 minutes.</div>
  <br />
  <a href="${url}">${url}</a>
  </html>`;
};
