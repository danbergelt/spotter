import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { State, fetchToken } from '../../../../../../../../types/State';
import {
  setActiveTabAction,
  editTagAction
} from '../../../../../../../../actions/tagsActions';
import Err from './Err';
import Tag from './Tag';
import { TagOnWorkout as T } from '../../../../../../../../types/TagOnWorkout';

interface Props {
  setToDelete: React.Dispatch<React.SetStateAction<Partial<T>>>;
}

const TagsModalManage: React.FC<Props> = ({ setToDelete }: Props) => {
  // state selectors
  const tags: Array<T> = useSelector((state: State) => state.tagsReducer.tags);
  const t: string | null = useSelector(fetchToken);

  // hooks
  const dispatch = useDispatch();
  const history = useHistory();

  // local state
  const [hover, setHover] = useState<null | string>(null);
  const [update, setUpdate] = useState<Partial<T>>({});
  const [updateInput, setUpdateInput] = useState<string>('');
  const [err, setErr] = useState<string>('');

  // handle tag delete callback
  const handleDelete: (tag: T) => void = useCallback(
    tag => {
      dispatch(setActiveTabAction(3));
      setToDelete(tag);
    },
    [dispatch, setToDelete]
  );

  // helper that condenses params object for a large function call
  const paramsHelper = { t, update, updateInput, setUpdate, history, setErr };

  // handle submit callback to edit a tag
  const handleSubmit: (
    e: React.FormEvent<HTMLFormElement>
  ) => void = useCallback(
    async e => {
      e.preventDefault();
      setUpdateInput('');
      dispatch(editTagAction(paramsHelper));
    },
    [dispatch, paramsHelper]
  );

  // if no tags exist, render this JSX
  if (!tags.length) {
    return <p className='no-tags-found'>No tags found</p>;
  }

  return (
    <>
      <p className='tag-manage-head'>Manage</p>
      {err.length ? <Err err={err} setErr={setErr} /> : null}
      {tags.map(tag => (
        <Tag
          key={tag._id}
          tag={tag}
          handleSubmit={handleSubmit}
          handleDelete={handleDelete}
          hover={hover}
          setHover={setHover}
          update={update}
          setUpdate={setUpdate}
          updateInput={updateInput}
          setUpdateInput={setUpdateInput}
        />
      ))}
    </>
  );
};

export default TagsModalManage;
