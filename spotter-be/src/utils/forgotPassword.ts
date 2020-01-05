import mailgun from "mailgun-js";
const DOMAIN: string | undefined = process.env.MG_DOMAIN;
const mg: mailgun.Mailgun = mailgun({
  apiKey: process.env.MG_KEY!,
  domain: DOMAIN!
});

const data = (to: string, subject: string, html: string) => {
  return {
    from: "danbergelt@protonmail.com",
    to,
    subject,
    html
  };
};

export const sendMail = async (to: string, subject: string, html: string) => {
  await mg.messages().send(data(to, subject, html));
};
