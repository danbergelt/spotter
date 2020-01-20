import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Template as T } from '../../../../../../types/Template';
import { State, fetchToken } from '../../../../../../types/State';
import { deleteTemplateAction } from '../../../../../../actions/optionsActions';
import Template from './Template';

interface Props {
  setActive: React.Dispatch<React.SetStateAction<{} | T>>;
  active: Partial<T>;
  search: string;
}

// templates container

const Templates: React.FC<Props> = ({ setActive, active, search }: Props) => {
  const dispatch = useDispatch();

  const t: string | null = useSelector(fetchToken);

  const {
    templatesErr: err,
    templates
  }: { templatesErr: string; templates: Array<T> } = useSelector(
    (state: State) => state.optionsReducer
  );

  const deleteTemplate: (id: string) => Promise<void> = useCallback(
    async id => {
      await dispatch(deleteTemplateAction(t, id));
    },
    [dispatch, t]
  );
  // search filter
  const filter: Array<T> = templates.filter(template =>
    template.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className='templates-container'>
      {/* if there are templates + if there are results from the search filter, display those templates */}
      {templates.length && filter.length ? (
        filter.map(template => (
          <Template
            setActive={setActive}
            deleteTemplate={deleteTemplate}
            key={template._id}
            template={template}
            active={active}
          />
        ))
      ) : (
        <div className='no-templates-found'> No templates found</div>
      )}
      {err && <div className='no-templates-found'>{err}</div>}
    </div>
  );
};

export default Templates;
