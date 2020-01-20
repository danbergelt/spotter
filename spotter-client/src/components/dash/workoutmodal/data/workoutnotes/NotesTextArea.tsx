import React from 'react';
import { useDispatch } from 'react-redux';
import TextareaAutosize from 'react-textarea-autosize';
import { addNotesAction } from '../../../../../actions/workoutActions';
import { NotesProps } from '../../../../../types/Notes';

interface Props extends NotesProps {
  setActions: React.Dispatch<React.SetStateAction<boolean>>;
}

const NotesTextArea: React.FC<Props> = ({
  notes,
  notesRef,
  setActions
}: Props) => {
  const dispatch = useDispatch();

  return (
    // Grows the text area proportionally with the size of the content
    <TextareaAutosize
      inputRef={notesRef}
      onFocus={(): void => setActions(true)}
      onBlur={(): void => setActions(false)}
      value={notes}
      onChange={(
        e
      ): {
        type: string;
        payload: string;
      } => dispatch(addNotesAction(e.target.value))}
      className='workout-data-notes-content'
      placeholder='Click to enter some notes...'
    />
  );
};

export default NotesTextArea;
