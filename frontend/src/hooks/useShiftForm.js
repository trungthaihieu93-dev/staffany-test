import { useCallback, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useSWR from 'swr';
import { toast } from 'react-toastify';
import moment from 'moment';

import {
  SHIFT_ID,
  SHIFT_NAME,
  SHIFT_DATE,
  SHIFT_START_TIME,
  SHIFT_END_TIME,
  SHIFT_STATUS,
  SHIFT_WEEK
} from 'constants/fields';
import { routes } from 'constants/routes';

import { getShiftFormLink } from 'API/links';
import { useGetFetcher } from 'API/utils';
import {
  createShift,
  updateShift,
  deleteShift,
} from 'API/services';

const today = moment(new Date()).format('YYYY-MM-DD');

const initialShift = {
  [SHIFT_ID]: '',
  [SHIFT_NAME]: '',
  [SHIFT_DATE]: today,
  [SHIFT_START_TIME]: '00:00',
  [SHIFT_END_TIME]: '01:00',
  [SHIFT_STATUS]: 'pending'
}

const useHooks = (shiftId) => {
  const history = useHistory();
  const [shift, setShift] = useState(initialShift);
  const [loading, setLoading] = useState(false);

  const { data: fetchedShift, error: fetchedShiftError } = useSWR(
    getShiftFormLink(shiftId),
    useGetFetcher,
    {
      shouldRetryOnError: false,
      revalidateOnFocus: false,
    },
  );

  // update local value
  useEffect(() => {
    if (fetchedShift && Object.keys(fetchedShift).length !== 0) {
      setShift(fetchedShift);
    } else {
      setShift(initialShift);
    }
  }, [fetchedShift]);

  const handleChangeForm = useCallback((key, val) => {
    if (key === SHIFT_START_TIME || key === SHIFT_END_TIME) {
      const fixedDate = '2021-01-01';

      if ((key === SHIFT_START_TIME
        && new Date(`${fixedDate}T${val}`) > new Date(`${fixedDate}T${shift[SHIFT_END_TIME]}`))
        || (key === SHIFT_END_TIME
          && new Date(`${fixedDate}T${val}`) < new Date(`${fixedDate}T${shift[SHIFT_START_TIME]}`))) {
        toast('Start time must be before end time!', { type: 'warning' });
        return;
      }
    }
    if (key === SHIFT_DATE) {
      const fixedTime = '00:00';

      if (new Date(`${val}T${fixedTime}`) < new Date(`${today}T${fixedTime}`)) {
        toast('Cannot choose days in the past!', { type: 'warning' });
        return;
      }
    }

    setShift((prevShift) => ({
      ...prevShift,
      [key]: val,
    }));
  }, [shift]);

  const handleSubmit = useCallback(async () => {
    if (shift[SHIFT_NAME] === ''
      || shift[SHIFT_DATE] === ''
      || shift[SHIFT_START_TIME] === ''
      || shift[SHIFT_END_TIME] === '') {
      toast('Must fill in all blank fields!', { type: 'warning' });
      return;
    }

    try {
      setLoading(true);

      const data = {
        [SHIFT_NAME]: shift[SHIFT_NAME],
        [SHIFT_DATE]: shift[SHIFT_DATE],
        [SHIFT_START_TIME]: shift[SHIFT_START_TIME],
        [SHIFT_END_TIME]: shift[SHIFT_END_TIME],
        [SHIFT_WEEK]: moment(shift[SHIFT_DATE]).isoWeek(),
      }

      if (shiftId === 'new') {
        await createShift(data);
        toast('Create new shift!', { type: 'success' });
      } else {
        await updateShift(shiftId, data);
        toast('Updated shift!', { type: 'success' });
      }

      setLoading(false);
      history.replace(routes.shifts);
    } catch (error) {
      setLoading(false);
      toast(error, { type: 'error' });
    }
  }, [history, shift, shiftId]);

  const handleDelete = useCallback(async () => {
    try {
      await deleteShift(shift[SHIFT_ID]);

      toast('Deleted shift!', { type: 'success' });

      setLoading(false);
      history.replace(routes.shifts);
    } catch (error) {
      setLoading(false);
      toast(error, { type: 'error' });
    }
  }, [history, shift]);

  return {
    state: {
      shift,
      loading,
    },
    handler: {
      handleChangeForm,
      handleSubmit,
      handleDelete,
    }
  }
};

export default useHooks;