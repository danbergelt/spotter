import React from 'react';

interface Props {
  form: boolean;
}

const ContactForm: React.FC<Props> = ({ form }) => {
  const open: string = 'animated fadeIn faster contact-popup';
  const close: string = 'animated fadeOut faster contact-popup';

  return (
    <section data-testid='contact-form' className={form ? open : close}>
      <div>
        <p>
          Hi there!{' '}
          <span role='img' aria-label='hand-wave'>
            👋
          </span>
        </p>
        <p>Ask us anything, or share your feedback.</p>
      </div>
    </section>
  );
};

export default ContactForm;
