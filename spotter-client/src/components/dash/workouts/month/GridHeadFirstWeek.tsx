import React, { memo } from 'react';
import { FiPlusCircle } from 'react-icons/fi';
import { Moment } from 'moment';
import { MomentRange } from 'moment-range';
import { useWindowSize } from 'react-use';

// Hacky fix to resolve error with default imports from moment and typescript
let m = require('moment');

if ('default' in m) {
  m = m['default'];
}

interface Props {
  date: Moment;
  openAddWorkoutModal: (date: Moment) => void;
  i: number;
  moment: MomentRange &
    typeof import('/Users/dan/Documents/prod/spotter/spotter-client/node_modules/moment/moment');
}

// the first week also includes the week day + the date and the add workout button

const GridHeadFirstWeek: React.FC<Props> = ({
  date,
  openAddWorkoutModal,
  i,
  moment
}) => {
  const { width }: { width: number } = useWindowSize();

  return (
    <>
      <section className="month-grid-day-head">
        <p className="month-grid-day-of-week">{date.format('ddd')}</p>
        <div
          role="button"
          onClick={() => openAddWorkoutModal(date)}
          className="month-grid-add-workout"
          data-testid={i === 0 && 'add-for-testing'}
        >
          <FiPlusCircle />
        </div>
      </section>
      <p
        style={{ fontSize: width <= 800 ? '1.1rem' : '1.3rem' }}
        className={
          date.format('MMM DD YYYY') === m().format('MMM DD YYYY')
            ? 'today-date'
            : undefined
        }
      >
        {date.format('D')}
      </p>
    </>
  );
};

export default memo(GridHeadFirstWeek);
