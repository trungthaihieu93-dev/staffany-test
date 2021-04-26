import { useCallback, useEffect, useState } from 'react';
import useSWR, { mutate } from 'swr';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

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

  const handlePublish = useCallback(async () => {
    try {
      setLoading(true);

      await publishShift();

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
      shiftsError,
      loading,
    },
    handler: {
      handlePublish,
    }
  }
};

export default useHooks;