import React from 'react';
import { Typography } from 'antd';
import {
  PushpinFilled,
  EditFilled,
} from '@ant-design/icons';
import moment from 'moment'

import {
  SHIFT_ID,
  SHIFT_NAME,
  SHIFT_DATE,
  SHIFT_START_TIME,
  SHIFT_END_TIME,
  SHIFT_STATUS,
} from 'constants/fields';
import Tag from 'components/Tag';

import './styles.css';

const { Title } = Typography;

export default function ShiftItem({ shift, onClick }) {
  const tagStyle = {
    width: '100px',
    height: '40px',
    borderRadius: '20px',
    position: 'absolute',
    top: '-20px',
    right: '-10px',
    color: 'white'
  };

  return (
    <div onClick={onClick} className="shiftItem">
      <Title level={3}>{shift[SHIFT_NAME]}</Title>
      <Title level={4}>
        <b>At:</b> {moment(shift[SHIFT_DATE]).format('ddd, MMM Do YYYY')}
      </Title>
      <Title level={5}>
        <b>From:</b> {shift[SHIFT_START_TIME]} - <b>To:</b> {shift[SHIFT_END_TIME]}
      </Title>
      <Tag
        containerStyle={{
          ...tagStyle,
          backgroundColor: shift[SHIFT_STATUS] === 'pending' ? 'orange' : 'yellowgreen'
        }}
        text={shift[SHIFT_STATUS]}
        Icon={shift[SHIFT_STATUS] === 'pending' ? EditFilled : PushpinFilled}
      />
    </div>
  );
}