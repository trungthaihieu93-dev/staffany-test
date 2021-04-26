import qs from 'qs';

import {
  CREATED_AT,
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
  [filters.sort]: `${CREATED_AT}:${filters.desc}`,
})}`;;

export const getShiftFormLink = (id) => `${SHIFT_ENDPOINT}/${id}`;