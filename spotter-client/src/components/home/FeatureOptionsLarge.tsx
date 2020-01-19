import React from 'react';

interface Props {
  setSelected: React.Dispatch<React.SetStateAction<string>>;
  selected: string;
}

const FeatureOptionsLarge: React.FC<Props> = ({ setSelected, selected }) => {
  return (
    <section className='features-tabs-container'>
      <p className='features-title'>Features</p>
      <p
        onMouseEnter={() => setSelected('Week View')}
        className={selected === 'Week View' ? 'feature selected' : 'feature'}
      >
        Week View
      </p>
      <p
        onMouseEnter={() => setSelected('Month View')}
        className={selected === 'Month View' ? 'feature selected' : 'feature'}
      >
        Month View
      </p>
      <p
        onMouseEnter={() => setSelected('PR Tracking')}
        className={selected === 'PR Tracking' ? 'feature selected' : 'feature'}
      >
        PR Tracking
      </p>
    </section>
  );
};

export default FeatureOptionsLarge;
