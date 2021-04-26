import { useEffect } from 'react';

export const useSwrErrorHandler = (err) => {
  useEffect(() => {
    if (err) {
      alert(err);
    }
  }, [err]);
}