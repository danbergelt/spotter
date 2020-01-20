import React, { memo } from 'react';
import { FiX } from 'react-icons/fi';
import { Template as T } from '../../../../../../types/Template';

interface Props {
  deleteTemplate: (id: string) => Promise<void>;
  active: Partial<T>;
  template: T;
  setActive: React.Dispatch<React.SetStateAction<{} | T>>;
}

const Template: React.FC<Props> = ({
  deleteTemplate,
  active,
  template,
  setActive
}: Props) => {
  return (
    <div key={template._id} className='template-container'>
      <div
        onClick={(): void => setActive(template)}
        className={template._id === active._id ? 'template active' : 'template'}
      >
        {template.name}
      </div>
      <div
        onClick={(): Promise<void> => deleteTemplate(template._id)}
        className='template-delete'
        data-testid='template-delete'
      >
        <FiX />
      </div>
    </div>
  );
};

export default memo(Template);
