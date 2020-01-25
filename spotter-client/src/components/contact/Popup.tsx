import React, { useState } from 'react';
import { ReactComponent as Contact } from '../../assets/contact_icon_1.svg';
import { FiX } from 'react-icons/fi';
import 'animate.css';

const Popup: React.FC = () => {
  const [form, setForm] = useState<boolean>(false);

  const close: string = 'animated rotateIn faster';

  const open: string = 'animated zoomIn faster';

  return (
    <div onClick={() => setForm(f => !f)} className='contact-popup'>
      {form && (
        <FiX
          size='32px'
          className={form ? `${close} contact-close` : 'contact-close'}
        />
      )}

      {!form && (
        <Contact className={!form ? `${open} contact-open` : 'contact-open'} />
      )}
    </div>
  );
};

export default Popup;
