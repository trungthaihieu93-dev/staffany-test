import React from 'react';
import { Skeleton, Button } from 'antd';

import Error from 'components/Error';
import withLayout from 'HOCs/withLayout';
import useHooks from 'hooks/useShifts';

function Shifts() {
  const {
    state: {
      shifts,
      shiftsError,
    },
    handler: {

    },
  } = useHooks();

  return (
    <div className="container">
      {
        shifts || shiftsError
          ? shifts
            ? shifts.length !== 0
              ? (
                <div></div>
              )
              : <Error error="No shifts added" />
            : <Error error={shiftsError} />
          : <Skeleton />
      }
    </div>
  );
}

export default withLayout({ title: 'Shifts' })(Shifts);