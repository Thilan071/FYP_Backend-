import React, { useEffect, useState } from 'react';
import { Table, Select, Input,Button  } from 'antd';
import { db } from '../firebaseConfig'; // Adjust the path as needed
import { collection, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';


const { Option } = Select;

const Users = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchText, setSearchText] = useState('');
    

    useEffect(() => {
        const fetchData = async () => {
            const querySnapshot = await getDocs(collection(db, "users"));
            const usersData = querySnapshot.docs.map(doc => ({
                ...doc.data(),
                key: doc.id,
            }));
            setData(usersData);
            setFilteredData(usersData);
        };

        fetchData();
    }, []);

    const goToNewUserForm = () => {
        navigate('/add-new-user');
      };
    
    const columns = [
      {
        title: 'First Name',
        dataIndex: 'first_name',
        key: 'first_name',
      },
      {
        title: 'Last Name',
        dataIndex: 'last_name',
        key: 'last_name',
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: 'User Type',
        dataIndex: 'user_type',
        key: 'user_type',
      },
      {
        title: 'Created At',
        dataIndex: 'created_at',
        key: 'created_at',
      },
      // Add more columns as needed
    ];
    
  
    const handleUserFilterChange = (value) => {
        applyFilters(value, searchText);
    };

    const onSearch = (value) => {
        setSearchText(value);
        applyFilters(undefined, value);
    };

    const applyFilters = (userType = 'all', searchText = '') => {
        const filteredByType = userType && userType !== 'all' ? data.filter(entry => entry.user_type === userType) : data;
        const filteredBySearch = filteredByType.filter(entry =>
            (entry.first_name && entry.first_name.toLowerCase().includes(searchText.toLowerCase())) ||
            (entry.last_name && entry.last_name.toLowerCase().includes(searchText.toLowerCase())) ||
            (entry.email && entry.email.toLowerCase().includes(searchText.toLowerCase()))
        );
        setFilteredData(filteredBySearch);
    };
    
    

  
    return (
        <div>
        <div style={{ marginBottom: 16 }}>
            <Select
                defaultValue="all"
                style={{ width: 200, marginRight: 8 }}
                onChange={handleUserFilterChange}
            >
                <Option value="all">All</Option>
                <Option value="admin">Admins</Option>
                <Option value="officer">Officers</Option>
            </Select>
            <Input
                placeholder="Search Users"
                value={searchText}
                onChange={e => onSearch(e.target.value)}
                style={{ marginRight: 8, width: 200 }}
            />
             <Button type="primary" onClick={goToNewUserForm}>Add New User</Button>
      </div>
      <Table columns={columns} dataSource={filteredData} />
    </div>
    );
  };
  
  export default Users;
  