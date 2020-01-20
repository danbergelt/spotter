import React, { memo } from 'react';
import Popover from 'react-tiny-popover';
import { Moment } from 'moment';
import { P } from '../../../../types/Grid';
import { Workout } from '../../../../types/Workout';
import ViewMoreContent from './ViewMoreContent';

interface Props {
  children?: any; // eslint-disable-line
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
}: Props) => {
  const renderChild = (): JSX.Element => {
    return (
      <ViewMoreContent
        setPopover={setPopover}
        workouts={workouts}
        openViewModal={openViewModal}
        date={date}
      />
    );
  };

  return (
    <Popover
      containerClassName='view-more-popup'
      isOpen={
        popover.open === true && popover.id === date.format('MMM DD YYYY')
      }
      position='top'
      onClickOutside={(): void => setPopover({ open: false, id: null })}
      content={renderChild()}
    >
      {children}
    </Popover>
  );
};
export default memo(PopoverContainer);
