import React from 'react';
import { Typography } from 'antd';

import {
  SHIFT_ID,
  SHIFT_NAME,
  SHIFT_DATE,
  SHIFT_START_TIME,
  SHIFT_END_TIME
} from 'constants/fields';

import './styles.css';

const { Title } = Typography;

export default function ShiftItem({ shift, onClick }) {
  return (
    <div onClick={onClick} className="shiftItem">
      <Title level={3}>{shift[SHIFT_NAME]}</Title>
      <Title level={4}>
        <b>At:</b> {shift[SHIFT_DATE]}
      </Title>
      <Title level={5}>
        <b>From:</b> {shift[SHIFT_START_TIME]} - <b>To:</b> {shift[SHIFT_END_TIME]}
      </Title>
    </div>
  );
}