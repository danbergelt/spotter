import React from 'react';
import { FiTag } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchToken } from '../../../../../../types/State';
import {
  fetchTags,
  openTagModalAction
} from '../../../../../../actions/tagsActions';
import TagsModal from './tagsmodal/TagsModal';

interface Props {
  iconClass: string;
}

const Tags: React.FC<Props> = ({ iconClass }: Props) => {
  const dispatch = useDispatch();

  const history = useHistory();

  const t: string | null = useSelector(fetchToken);

  const openTagsModal: () => void = async () => {
    dispatch(openTagModalAction());
    await dispatch(fetchTags(history, t));
  };

  return (
    <>
      <button
        type='button'
        onClick={openTagsModal}
        className='add-workout-options-button'
        data-testid='tags-modal'
      >
        <FiTag className={iconClass} />
        Tags
      </button>
      <TagsModal />
    </>
  );
};

export default Tags;
