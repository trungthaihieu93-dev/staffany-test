import { useEffect } from 'react';
import { toast } from 'react-toastify';

export const useSwrErrorHandler = (err) => {
  useEffect(() => {
    if (err) {
      toast(`Error: ${err.message}!`, {
        type: 'error',
      });
    }
  }, [err]);
}