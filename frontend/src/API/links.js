import {
  SHIFT_ENDPOINT,
} from './constants';

export const getShiftLink = () => SHIFT_ENDPOINT;

export const getShiftFormLink = (id) => `${SHIFT_ENDPOINT}/${id}`;