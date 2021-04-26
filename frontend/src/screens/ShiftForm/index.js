import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { useParams } from 'react-router-dom';

import {
  SHIFT_ID,
  SHIFT_NAME,
  SHIFT_DATE,
  SHIFT_START_TIME,
  SHIFT_END_TIME
} from 'constants/fields';
import useHooks from 'hooks/useShiftForm';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const ShiftForm = () => {
  const { id } = useParams();
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const {
    state: {
      shift,
      loading,
    },
    handler: {
      handleChangeForm,
      handleSubmit,
      handleDelete,
    }
  } = useHooks(id);

  return (
    <Form
      {...layout}
      name="shiftForm"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Name"
        rules={[{ required: true, message: 'Please input shift name!' }]}
      >
        <Input
          placeholder="Shift name..."
          value={shift[SHIFT_NAME]}
          onChange={(evt) => handleChangeForm(SHIFT_NAME, evt.target.value)}
        />
      </Form.Item>
      <Form.Item
        label="Date"
        rules={[{ required: true, message: 'Please input your date!' }]}
      >
        <Input
          type="date"
          placeholder="Shift date..."
          value={shift[SHIFT_DATE]}
          onChange={(evt) => handleChangeForm(SHIFT_DATE, evt.target.value)}
        />
      </Form.Item>
      <Form.Item
        label="Start Time"
        rules={[{ required: true, message: 'Please input start time!' }]}
      >
        <Input
          type="time"
          placeholder="Shift start time..."
          value={shift[SHIFT_START_TIME]}
          onChange={(evt) => handleChangeForm(SHIFT_START_TIME, evt.target.value)}
        />
      </Form.Item>
      <Form.Item
        label="End Time"
        rules={[{ required: true, message: 'Please input end time!' }]}
      >
        <Input
          type="time"
          placeholder="Shift end time..."
          value={shift[SHIFT_END_TIME]}
          onChange={(evt) => handleChangeForm(SHIFT_END_TIME, evt.target.value)}
        />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button
          type="primary"
          htmlType="submit"
          onClick={handleSubmit}
          loading={loading}
        >
          {id === 'new' ? 'Create' : 'Update'}
        </Button>
        {
          id === 'new' ? null : (
            <Button
              style={{ marginLeft: '20px' }}
              type="danger"
              htmlType="submit"
              loading={loading}
              onClick={handleDelete}
            >
              Delete
            </Button>
          )
        }
      </Form.Item>
    </Form>
  );
};

export default ShiftForm;