import { useCallback } from 'react';
import useSWR from 'swr';

import { useSwrErrorHandler } from './common/useErrorHandler';
import { getShiftLink } from 'API/links';

import { useGetFetcher } from 'API/utils';

const useHooks = () => {
  const { data: shifts, error: shiftsError } = useSWR(
    getShiftLink(),
    useGetFetcher,
    {
      shouldRetryOnError: false,
      revalidateOnFocus: false,
    },
  );

  useSwrErrorHandler(shiftsError);

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