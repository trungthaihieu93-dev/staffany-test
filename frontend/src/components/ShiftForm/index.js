import React from 'react';
import { Form, Input, Button, Typography } from 'antd';

import {
  SHIFT_NAME,
  SHIFT_DATE,
  SHIFT_START_TIME,
  SHIFT_END_TIME,
  SHIFT_STATUS
} from 'constants/fields';

import './styles.css';

const { Title } = Typography;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const ShiftForm = (props) => {
  const {
    shift, loading, isUpdating,
    handleChangeForm,
    handleSubmit,
    handleDelete
  } = props;

  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="formContainer">
      <Title>
        {
          isUpdating
            ? 'Update Shift'
            : 'Create Shift'
        }
      </Title>
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
            disabled={shift[SHIFT_STATUS] === 'published'}
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
            disabled={shift[SHIFT_STATUS] === 'published'}
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
            disabled={shift[SHIFT_STATUS] === 'published'}
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
            disabled={shift[SHIFT_STATUS] === 'published'}
          />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button
            type="primary"
            htmlType="submit"
            onClick={handleSubmit}
            loading={loading}
            disabled={shift[SHIFT_STATUS] === 'published'}
          >
            {isUpdating ? 'Update' : 'Create'}
          </Button>
          {
            isUpdating
              ? (
                <Button
                  style={{ marginLeft: '20px' }}
                  type="danger"
                  htmlType="submit"
                  loading={loading}
                  onClick={handleDelete}
                  disabled={shift[SHIFT_STATUS] === 'published'}
                >
                  Delete
                </Button>
              )
              : null
          }
        </Form.Item>
      </Form>
    </div>
  );
};

export default ShiftForm;