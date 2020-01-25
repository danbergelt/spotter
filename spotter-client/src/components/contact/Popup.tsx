import React, { useState } from 'react';
import { ReactComponent as Contact } from '../../assets/contact_icon_1.svg';

const Popup: React.FC = () => {
  const [form, setForm] = useState(false);

  console.log(form);

  return (
    <div onClick={() => setForm(f => !f)} className='contact-popup'>
      <Contact />
    </div>
  );
};

export default Popup;
