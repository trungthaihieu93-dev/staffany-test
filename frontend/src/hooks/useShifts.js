import { useCallback, useEffect } from 'react';
import useSWR, { mutate } from 'swr';
import { useHistory } from 'react-router-dom';

import { useSwrErrorHandler } from './common/useErrorHandler';
import { getShiftLink } from 'API/links';

import { useGetFetcher } from 'API/utils';

const useHooks = () => {
  const history = useHistory();
  const { data: shifts, error: shiftsError } = useSWR(
    getShiftLink(),
    useGetFetcher,
    {
      shouldRetryOnError: false,
    },
  );

  useSwrErrorHandler(shiftsError);

  useEffect(() => {
    const unlisten = history.listen((location, action) => {
      mutate(getShiftLink()); // update the cache
    });

    return () => unlisten();
  }, [history]);

  return {
    state: {
      shifts,
      shiftsError,
    },
    handler: {

    }
  }
};

export default useHooks;