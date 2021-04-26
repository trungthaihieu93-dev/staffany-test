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
    },
    handler: {
      handleChangeForm,
      handleSubmit,
    }
  } = useHooks(id);

  return (
    <Form
      {...layout}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: 'Please input shift name!' }]}
      >
        <Input
          value={shift[SHIFT_NAME]}
          onChange={(evt) => handleChangeForm(SHIFT_NAME, evt.target.value)}
        />
      </Form.Item>
      <Form.Item
        label="Date"
        name="date"
        rules={[{ required: true, message: 'Please input your date!' }]}
      >
        <Input
          value={shift[SHIFT_DATE]}
          onChange={(evt) => handleChangeForm(SHIFT_DATE, evt.target.value)}
        />
      </Form.Item>
      <Form.Item
        label="Start Time"
        name="from"
        rules={[{ required: true, message: 'Please input start time!' }]}
      >
        <Input
          value={shift[SHIFT_START_TIME]}
          onChange={(evt) => handleChangeForm(SHIFT_START_TIME, evt.target.value)}
        />
      </Form.Item>
      <Form.Item
        label="End Time"
        name="to"
        rules={[{ required: true, message: 'Please input end time!' }]}
      >
        <Input
          value={shift[SHIFT_END_TIME]}
          onChange={(evt) => handleChangeForm(SHIFT_END_TIME, evt.target.value)}
        />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button
          type="primary"
          htmlType="submit"
          onClick={handleSubmit}
        >
          {id === 'new' ? 'Create' : 'Update'}
        </Button>
        {
          id === 'new' ? null : (
            <Button
              style={{ marginLeft: '20px' }}
              type="danger"
              htmlType="submit"
              onClick={null}
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