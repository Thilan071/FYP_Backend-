// import React, { useState } from 'react';
// import { Form, Radio, Input, Select, DatePicker, InputNumber, Button, TimePicker } from 'antd';
// import { collection, addDoc } from 'firebase/firestore';
// import { db } from '../firebaseConfig'; // Import your Firebase configuration

// const AddNewUserForm = () => {
//   const [componentSize, setComponentSize] = useState('default');
//   const onFormLayoutChange = ({ size }) => {
//     setComponentSize(size);
//   };
//   const onFinish = async (values) => {
//     console.log(values); // Check the form values, especially for the email
//     try {
//       const docRef = await addDoc(collection(db, "users"), {
//         email: values.email,
//         first_name: values.firstName,
//         last_name: values.lastName,
//         password: values.password, // Reminder: Storing plaintext passwords is insecure
//         user_id: values.id.toString(),
//         user_type: values.userType,
//       });
//       console.log("User added with ID: ", docRef.id);
//     } catch (error) {
//       console.error("Error adding user: ", error);
//     }
//   };
//   return (
//     <Form
//       labelCol={{ span: 4 }}
//       wrapperCol={{ span: 14 }}
//       layout="horizontal"
//       initialValues={{ size: componentSize }}
//       onValuesChange={onFormLayoutChange}
//       size={componentSize}
//       onFinish={onFinish} 
//       style={{ maxWidth: 600 }}
//     >
//       <Form.Item label="Form Size" name="size">
//         <Radio.Group>
//           <Radio.Button value="small">Small</Radio.Button>
//           <Radio.Button value="default">Default</Radio.Button>
//           <Radio.Button value="large">Large</Radio.Button>
//         </Radio.Group>
//       </Form.Item>
//       <Form.Item label="First Name">
//         <Input />
//       </Form.Item>
//       <Form.Item label="Last Name">
//         <Input />
//       </Form.Item>
//       <Form.Item label="Email">
//         <Input />
//       </Form.Item>
//       <Form.Item label="Password">
//         <Input />
//       </Form.Item>
//       <Form.Item label="User Type">
//         <Select>
//           <Select.Option value="demo">Admin</Select.Option>
//           <Select.Option value="demo">Officer</Select.Option>
//         </Select>
//       </Form.Item>
//       <Form.Item label="Date">
//         <DatePicker />
//         </Form.Item>
//       <Form.Item label="Time">
//         <TimePicker />
//       </Form.Item>
//       <Form.Item label="ID">
//         <InputNumber />
//       </Form.Item>
//       <Form.Item >
//       <Button type="primary" htmlType="submit">Add New User</Button>
//       </Form.Item>
//     </Form>
//   );
// };

// export default AddNewUserForm;




// import React, { useState } from 'react';
// import { Form, Radio, Input, Select, DatePicker, InputNumber, Button, TimePicker, notification } from 'antd';
// import { collection, addDoc } from 'firebase/firestore';
// import { db } from '../firebaseConfig'; // Import your Firebase configuration
// // Assuming you have Firebase Authentication set up:
// import { createUserWithEmailAndPassword } from 'firebase/auth';
// import { auth } from '../firebaseConfig'; // Import your Firebase auth configuration

// const AddNewUserForm = () => {
//   const [componentSize, setComponentSize] = useState('default');

//   const onFormLayoutChange = ({ size }) => {
//     setComponentSize(size);
//   };

//   const onFinish = async (values) => {
//     console.log(values); // Check the form values, especially for the email
//     try {
//       // Use Firebase Authentication for managing user credentials
//       const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
//       const user = userCredential.user;
//       console.log("Firebase Auth user created with ID: ", user.uid);
      
//       // Add user details to Firestore (excluding the password)
//       const docRef = await addDoc(collection(db, "users"), {
//         email: values.email,
//         first_name: values.firstName,
//         last_name: values.lastName,
//         user_id: user.uid, // Use Firebase Auth UID instead of manual ID
//         user_type: values.userType,
//       });
//       console.log("User details added with Firestore ID: ", docRef.id);
      
//       // Show success notification
//       notification.success({
//         message: 'User Added',
//         description: 'The new user has been successfully added.',
//       });
//     } catch (error) {
//       console.error("Error adding user: ", error);
//       // Show error notification
//       notification.error({
//         message: 'Error Adding User',
//         description: error.message,
//       });
//     }
//   };

//   return (
//     <Form
//       labelCol={{ span: 4 }}
//       wrapperCol={{ span: 14 }}
//       layout="horizontal"
//       initialValues={{ size: componentSize }}
//       onValuesChange={onFormLayoutChange}
//       size={componentSize}
//       onFinish={onFinish} 
//       style={{ maxWidth: 600 }}
//     >
//       {/* Make sure each Form.Item has the "name" prop set correctly */}
//       <Form.Item label="Form Size" name="size">
//         <Radio.Group>
//           <Radio.Button value="small">Small</Radio.Button>
//           <Radio.Button value="default">Default</Radio.Button>
//           <Radio.Button value="large">Large</Radio.Button>
//         </Radio.Group>
//       </Form.Item>
//       {/* Updated Form.Item components with "name" props */}
//       <Form.Item label="First Name" name="firstName">
//         <Input />
//       </Form.Item>
//       <Form.Item label="Last Name" name="lastName">
//         <Input />
//       </Form.Item>
//       <Form.Item label="Email" name="email">
//         <Input />
//       </Form.Item>
//       <Form.Item label="Password" name="password">
//         <Input.Password />
//       </Form.Item>
//       <Form.Item label="User Type" name="userType">
//         <Select>
//           <Select.Option value="admin">Admin</Select.Option>
//           <Select.Option value="officer">Officer</Select.Option>
//         </Select>
//       </Form.Item>
//       <Form.Item label="Date" name="date">
//         <DatePicker />
//       </Form.Item>
//       <Form.Item label="Time" name="time">
//         <TimePicker />
//       </Form.Item>
//       <Form.Item label="ID" name="id">
//         <InputNumber />
//       </Form.Item>
//       <Form.Item>
//         <Button type="primary" htmlType="submit">Add New User</Button>
// </Form.Item>
// </Form>
// );
// };

// export default AddNewUserForm;




import React, { useState } from 'react';
import { Form, Radio, Input, Select, DatePicker, InputNumber, Button, TimePicker, notification } from 'antd';
import { collection, addDoc,doc,setDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig'; 
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig'; 


const AddNewUserForm = () => {
  const [componentSize, setComponentSize] = useState('default');

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const onFinish = async (values) => {
    console.log(values);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
      const user = userCredential.user;
      console.log("Firebase Auth user created with ID: ", user.uid);
      
      const userDocRef = doc(db, "users", values.email);
      
      await setDoc(userDocRef, {
        email: values.email,
        first_name: values.firstName,
        last_name: values.lastName,
        user_id: user.uid, 
        user_type: values.userType,
        password: values.password, 
      });
      console.log("User details added with Firestore ID: ", userDocRef.id);
      
      notification.success({
        message: 'User Added',
        description: 'The new user has been successfully added, including the password.',
      });
    } catch (error) {
      console.error("Error adding user: ", error);
      notification.error({
        message: 'Error Adding User',
        description: error.message,
      });
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
      <Form.Item label="First Name" name="firstName">
        <Input />
      </Form.Item>
      <Form.Item label="Last Name" name="lastName">
        <Input />
      </Form.Item>
      <Form.Item label="Email" name="email">
        <Input />
      </Form.Item>
      <Form.Item label="Password" name="password">
        <Input.Password />
      </Form.Item>
      <Form.Item label="User Type" name="userType">
        <Select>
          <Select.Option value="admin">Admin</Select.Option>
          <Select.Option value="officer">Officer</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="Date" name="date">
        <DatePicker />
      </Form.Item>
      <Form.Item label="Time" name="time">
        <TimePicker />
      </Form.Item>
      <Form.Item label="ID" name="id">
        <InputNumber />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">Add New User</Button>
</Form.Item>
</Form>
);
};

export default AddNewUserForm;

