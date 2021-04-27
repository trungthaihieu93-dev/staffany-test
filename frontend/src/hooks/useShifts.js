import {
  useCallback,
  useEffect,
  useState,
  useMemo,
} from 'react';
import useSWR, { mutate } from 'swr';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import moment from 'moment';

import {
  SHIFT_ID,
  SHIFT_WEEK,
  SHIFT_DATE,
  SHIFT_STATUS,
} from 'constants/fields';
import { getShiftLink } from 'API/links';
import { useGetFetcher } from 'API/utils';
import { publishShift } from 'API/services';

import { useSwrErrorHandler } from './common/useErrorHandler';

const useHooks = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const { data: shifts, error: shiftsError } = useSWR(
    getShiftLink(),
    useGetFetcher,
    {
      shouldRetryOnError: false,
      revalidateOnFocus: false,
    },
  );

  useSwrErrorHandler(shiftsError);

  useEffect(() => {
    const unlisten = history.listen((location, action) => {
      mutate(getShiftLink()); // update the cache
    });

    return () => unlisten();
  }, [history]);

  // recalculated shift data
  const shiftData = useMemo(() => {
    if (!shifts) {
      return [];
    }

    const getWeekRange = (day) => ({
      from: moment(day).startOf('isoWeek').format('MMM, Do YYYY'),
      to: moment(day).endOf('isoWeek').format('MMM, Do YYYY'),
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
      toast(`${error}`, { type: 'error' });
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    state: {
      shifts,
      shiftData,
      shiftsError,
      loading,
    },
    handler: {
      handlePublish,
    }
  }
};

export default useHooks;