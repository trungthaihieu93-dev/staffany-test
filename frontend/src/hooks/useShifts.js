import {
  useCallback,
  useState,
  useMemo,
} from 'react';
import useSWR, { mutate } from 'swr';
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
import { getShiftLink } from 'API/links';
import { useGetFetcher } from 'API/utils';
import {
  createShift,
  updateShift,
  deleteShift,
  publishShift,
} from 'API/services';

import { useSwrErrorHandler } from './common/useErrorHandler';

const today = moment(new Date()).format('YYYY-MM-DD');

const initialShift = {
  [SHIFT_ID]: '',
  [SHIFT_NAME]: '',
  [SHIFT_DATE]: today,
  [SHIFT_START_TIME]: '00:00',
  [SHIFT_END_TIME]: '01:00',
  [SHIFT_STATUS]: 'pending'
}

const useHooks = () => {
  const [loading, setLoading] = useState(false);
  const [shift, setShift] = useState(initialShift);
  const [isShiftFormVisible, setShiftFormVisibility] = useState(false);
  const [isUpdating, setUpdating] = useState(false);
  const { data: shifts, error: shiftsError } = useSWR(
    getShiftLink(),
    useGetFetcher,
    {
      shouldRetryOnError: false,
      revalidateOnFocus: false,
    },
  );

  useSwrErrorHandler(shiftsError);

  // recalculated shift data
  const shiftData = useMemo(() => {
    if (!shifts) {
      return [];
    }

    const getWeekRange = (day) => ({
      from: moment(new Date(day)).startOf('isoWeek'),
      to: moment(new Date(day)).endOf('isoWeek'),
    });

    const output = [];
    let week = -1;
    let index = -1;

    shifts.forEach((shift) => {
      if (shift[SHIFT_WEEK] !== week) {
        week = shift[SHIFT_WEEK];
        index++;
        output.push({
          ...(getWeekRange(shift[SHIFT_DATE])),
          shifts: [],
          isPublished: shift[SHIFT_STATUS] === 'published'
        });
      }

      output[index].shifts.push(shift);
    });

    return output;
  }, [shifts]);


  const handlePublish = useCallback(async (shifts) => {
    try {
      setLoading(true);

      await publishShift({
        shifts: shifts.map((shift) => shift[SHIFT_ID]),
      });

      mutate(getShiftLink());

      toast('Published shifts successfully!', { type: 'success' });
    } catch (error) {
      toast(error.message, { type: 'error' });
    } finally {
      setLoading(false);
    }
  }, []);

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

  const handleCloseForm = useCallback(() => {
    setUpdating(false);
    setShiftFormVisibility(false);
    setShift(initialShift);
  }, []);

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

      if (isUpdating) {
        await updateShift(shift[SHIFT_ID], data);
        toast('Updated shift!', { type: 'success' });
      } else {
        await createShift(data);
        toast('Create new shift!', { type: 'success' });
      }

      mutate(getShiftLink());
      setLoading(false);
      handleCloseForm();
    } catch (error) {
      setLoading(false);
      console.log(error)
      toast(error.message, { type: 'error' });
    }
  }, [handleCloseForm, isUpdating, shift]);

  const handleDelete = useCallback(async () => {
    try {
      await deleteShift(shift[SHIFT_ID]);

      toast('Deleted shift!', { type: 'success' });

      setLoading(false);

      handleCloseForm();
    } catch (error) {
      setLoading(false);
      toast(error.message, { type: 'error' });
    }
  }, [handleCloseForm, shift]);

  return {
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
      setShift,
      setShiftFormVisibility,
      setUpdating,
      handlePublish,
      handleChangeForm,
      handleSubmit,
      handleDelete,
      handleCloseForm,
    }
  }
};

export default useHooks;