import qs from 'qs';

import {
  SHIFT_WEEK
} from 'constants/fields';

import {
  SHIFT_ENDPOINT,
} from './constants';

const filters = {
  asc: 'ASC',
  desc: 'DESC',
  sort: '_sort',
};

export const getShiftLink = () => `${SHIFT_ENDPOINT}?${qs.stringify({
  [filters.sort]: `${SHIFT_WEEK}:${filters.asc}`,
})}`;;

export const getShiftFormLink = (id) => `${SHIFT_ENDPOINT}/${id}`;