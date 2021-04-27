import React, { useCallback } from 'react';
import {
  Skeleton,
  Button,
  Divider,
  Typography
} from 'antd';
import { useHistory, Route } from 'react-router-dom';

import {
  SHIFT_ID,
} from 'constants/fields';
import { routes } from 'constants/routes';
import Error from 'components/Error';
import ShiftForm from 'screens/ShiftForm';
import withLayout from 'HOCs/withLayout';
import useHooks from 'hooks/useShifts';

import './styles.css';
import ShiftItem from './ShiftItem';

const { Title } = Typography;

function Shifts() {
  const history = useHistory();
  const {
    state: {
      shifts,
      shiftData,
      shiftsError,
    },
    handler: {
      handlePublish,
    },
  } = useHooks();

  const handleClick = useCallback((id) => {
    history.push(`${routes.shifts}/${id}`);
  }, [history]);

  return (
    <div className="container">
      <div className="cols">
        <div className="buttons">
          <Button
            onClick={() => history.push(`${routes.shifts}/new`)}
          >
            + Add New Shift
          </Button>
        </div>
        {
          shifts || shiftsError
            ? shifts
              ? shifts.length !== 0
                ? (
                  <div className="shifts">
                    {
                      shiftData?.map((data) => (
                        <div key={data.from} className="weekContainer">
                          <div className="weekHeader">
                            <Title level={4}>
                              {data.from} -{'>'} {data.to}
                            </Title>
                            <Button
                              style={{ marginLeft: '20px' }}
                              type="primary"
                              onClick={() => handlePublish(data.shifts)}
                              disabled={data.isPublished}
                            >
                              Publish
                            </Button>
                          </div>
                          {
                            data?.shifts?.map((shift) => (
                              <>
                                <ShiftItem
                                  key={shift[SHIFT_ID]}
                                  shift={shift}
                                  onClick={() => handleClick(shift[SHIFT_ID])}
                                />
                                <Divider />
                              </>
                            ))
                          }
                        </div>
                      ))
                    }
                  </div>
                )
                : <Error error="No shifts added" />
              : <Error error="Error while getting data!" />
            : <Skeleton />
        }
      </div>
      <div className="cols">
        <Route path={`${routes.shifts}/:id`} component={ShiftForm} />
      </div>

    </div>
  );
}

export default withLayout({ title: 'Shifts' })(Shifts);