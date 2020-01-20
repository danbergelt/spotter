import React from 'react';
import { FaCircle } from 'react-icons/fa';
import * as Moment from 'moment';
import { extendMoment } from 'moment-range';
import { Exercise } from '../../types/ExerciseOption';

const moment = extendMoment(Moment);

// Hacky fix to resolve error with default imports from moment and typescript
let m = require('moment');

if ('default' in m) {
  m = moment['default'];
}

interface Props {
  pr: Exercise;
}

const Pr: React.FC<Props> = ({ pr }: Props) => {
  const setClassName = (): string | undefined => {
    // difference between the date on the pr and the current date
    const diff: number = m().diff(m(pr.prDate, 'MMM DD YYYY'), 'days');

    if (diff <= 31) {
      return 'pr-circle lastMonth';
    }
    if (diff > 31 && diff <= 365) {
      return 'pr-circle lastYear';
    }
    if (diff > 365) {
      return 'pr-circle allTime';
    }
    return undefined;
  };

  return (
    <article className='pr'>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div
          // color-coding circle to indicate if a PR is recent or old
          className={setClassName()}
        >
          <FaCircle />
        </div>
        <p>{pr.name}</p>
      </div>
      <div style={{ display: 'flex' }}>
        <p className='pr-date'>{pr.prDate}</p>
        <p style={{ fontWeight: 'bold' }}>
          {pr.pr}
          lbs
        </p>
      </div>
    </article>
  );
};

export default Pr;
