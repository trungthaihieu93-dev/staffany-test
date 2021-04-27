import React from 'react';
import {
  Skeleton,
  Button,
  Typography,
  Modal,
} from 'antd';

import Error from 'components/Error';
import ShiftForm from 'components/ShiftForm';
import withLayout from 'HOCs/withLayout';
import useHooks from 'hooks/useShifts';

import './styles.css';
import WeeklySchedule from './WeeklySchedule';

const { Title } = Typography;

function Shifts() {
  const {
    state: {
      shifts,
      shiftData,
      shiftsError,
      loading,
      isShiftFormVisible,
      isUpdating,
      shift,
    },
    handler: {
      handlePublish,
      setShift,
      setUpdating,
      handleSubmit,
      handleDelete,
      handleChangeForm,
      handleCloseForm,
      setShiftFormVisibility,
    },
  } = useHooks();

  return (
    <div className="shiftsContainer">
      <div className="buttons">
        <Button
          onClick={() => setShiftFormVisibility(true)}
        >
          + Add New Shift
        </Button>
      </div>
      {
        shifts || shiftsError
          ? shifts
            ? shifts.length !== 0
              ? (
                <div className="scheduleContainer">
                  {
                    shiftData.map((data) => (
                      <div className="schedule">
                        <div className="scheduleHeader">
                          <Title level={5}>
                            {data.from.format('ddd, MMM Do')}/{data.to.format('ddd, MMM Do')}
                          </Title>
                          <Button
                            className="publishButton"
                            disabled={data.isPublished}
                            onClick={() => handlePublish(data.shifts)}
                          >
                            Publish
                        </Button>
                        </div>
                        <WeeklySchedule
                          {...data}
                          key={data.week}
                          onClickShift={(shift) => {
                            setShiftFormVisibility(true);
                            setShift(shift);
                            setUpdating(true);
                          }}
                        />
                      </div>
                    ))
                  }
                </div>
              )
              : <Error error="No shifts added" />
            : <Error error="Error while getting data!" />
          : <Skeleton />
      }
      <Modal
        visible={isShiftFormVisible}
        okButtonProps={{ style: { display: 'none' } }}
        cancelButtonProps={{ style: { display: 'none' } }}
        onCancel={handleCloseForm}
      >
        <ShiftForm
          shift={shift}
          handleSubmit={handleSubmit}
          handleDelete={handleDelete}
          handleChangeForm={handleChangeForm}
          loading={loading}
          isUpdating={isUpdating}
        />
      </Modal>
    </div >
  );
}

export default withLayout({ title: 'Shifts' })(Shifts);