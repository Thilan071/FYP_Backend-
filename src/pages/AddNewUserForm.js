import React, { useState } from 'react';
import { Form, Radio, Input, Select, DatePicker, InputNumber, Button, TimePicker } from 'antd';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig'; // Import your Firebase configuration

const AddNewUserForm = () => {
  const [componentSize, setComponentSize] = useState('default');
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  const onFinish = async (values) => {
    console.log(values); // Check the form values, especially for the email
    try {
      const docRef = await addDoc(collection(db, "users"), {
        email: values.email,
        first_name: values.firstName,
        last_name: values.lastName,
        password: values.password, // Reminder: Storing plaintext passwords is insecure
        user_id: values.id.toString(),
        user_type: values.userType,
      });
      console.log("User added with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding user: ", error);
    }
  };
  return (
    <Form
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      layout="horizontal"
      initialValues={{ size: componentSize }}
      onValuesChange={onFormLayoutChange}
      size={componentSize}
      onFinish={onFinish} 
      style={{ maxWidth: 600 }}
    >
      <Form.Item label="Form Size" name="size">
        <Radio.Group>
          <Radio.Button value="small">Small</Radio.Button>
          <Radio.Button value="default">Default</Radio.Button>
          <Radio.Button value="large">Large</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="First Name">
        <Input />
      </Form.Item>
      <Form.Item label="Last Name">
        <Input />
      </Form.Item>
      <Form.Item label="Email">
        <Input />
      </Form.Item>
      <Form.Item label="Password">
        <Input />
      </Form.Item>
      <Form.Item label="User Type">
        <Select>
          <Select.Option value="demo">Admin</Select.Option>
          <Select.Option value="demo">Officer</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="Date">
        <DatePicker />
        </Form.Item>
      <Form.Item label="Time">
        <TimePicker />
      </Form.Item>
      <Form.Item label="ID">
        <InputNumber />
      </Form.Item>
      <Form.Item >
      <Button type="primary" htmlType="submit">Add New User</Button>
      </Form.Item>
    </Form>
  );
};

export default AddNewUserForm;
