import { useCallback, useState, useEffect } from 'react';
import useSWR from 'swr';

import {
  SHIFT_ID,
  SHIFT_NAME,
  SHIFT_DATE,
  SHIFT_START_TIME,
  SHIFT_END_TIME
} from 'constants/fields';

import { getShiftFormLink } from 'API/links';
import { useGetFetcher } from 'API/utils';

const initialShift = {
  [SHIFT_ID]: '',
  [SHIFT_NAME]: '',
  [SHIFT_DATE]: '',
  [SHIFT_START_TIME]: '',
  [SHIFT_END_TIME]: ''
}

const useHooks = (shiftId) => {
  const [shift, setShift] = useState(initialShift);

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
    setShift((prevShift) => ({
      ...prevShift,
      [key]: val,
    }));
  }, []);

  const handleSubmit = useCallback(async () => {
    try {
      
    } catch (error) {
      
    }
  }, []);

  return {
    state: {
      shift,
    },
    handler: {
      handleChangeForm,
      handleSubmit,
    }
  }
};

export default useHooks;