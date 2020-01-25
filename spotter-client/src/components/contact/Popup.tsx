import React, { useState } from 'react';
import { ReactComponent as Contact } from '../../assets/contact_icon_1.svg';
import { FiX } from 'react-icons/fi';
import Animate from 'animate.css-react';
import 'animate.css';

const Popup: React.FC = () => {
  const [form, setForm] = useState(false);

  return (
    <div onClick={() => setForm(f => !f)} className='contact-popup'>
      {form && (
        <Animate appear='rotateIn' durationAppear={200} animate={form}>
          <FiX size='32px' className='contact-close' />
        </Animate>
      )}

      {!form && (
        <Animate appear='zoomIn' durationAppear={200} animate={!form}>
          <Contact className='contact-open' />
        </Animate>
      )}
    </div>
  );
};

export default Popup;
