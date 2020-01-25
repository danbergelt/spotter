import React from 'react';

interface Props {
  form: boolean;
}

const ContactForm: React.FC<Props> = ({ form }) => {
  const open: string = 'animated fadeIn faster contact-popup';
  const close: string = 'animated fadeOut faster contact-popup';

  return (
    <section className={form ? open : close}>
      <div>
        <p>Hi there! 👋</p>
        <p>Ask us anything, or share your feedback.</p>
      </div>
    </section>
  );
};

export default ContactForm;
