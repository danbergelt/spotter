import React, { memo } from 'react';
import Popover from 'react-tiny-popover';
import { Moment } from 'moment';
import { P } from 'src/types/Grid';
import { Workout } from 'src/types/Workout';
import ViewMoreContent from './ViewMoreContent';

interface Props {
  children?: any;
  popover: P;
  setPopover: React.Dispatch<React.SetStateAction<P>>;
  openViewModal: (workout: Workout, date: Moment) => void;
  date: Moment;
  workouts: Array<Workout>;
}

const PopoverContainer: React.FC<Props> = ({
  children,
  popover,
  setPopover,
  workouts,
  openViewModal,
  date
}) => {
  return (
    <Popover
      containerClassName="view-more-popup"
      isOpen={
        popover.open === true && popover.id === date.format('MMM DD YYYY')
      }
      position="top"
      onClickOutside={() => setPopover({ open: false, id: null })}
      content={
        <ViewMoreContent
          setPopover={setPopover}
          workouts={workouts}
          openViewModal={openViewModal}
          date={date}
        />
      }
    >
      {children}
    </Popover>
  );
};
export default memo(PopoverContainer);
