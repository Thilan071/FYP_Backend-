
import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { Navbar, Nav, Container, Card, Button, Form } from 'react-bootstrap';
import { AudioOutlined } from '@ant-design/icons';
import { Table, Tooltip, Spin, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { db } from '../firebaseConfig'; 
import { useUser } from '../UserContext'; 
import {
  MDBInputGroup,
  MDBAutocomplete,
  MDBIcon,
  MDBBtn,
} from 'mdb-react-ui-kit';

const Dashboard = () => {
  const navigate = useNavigate();
  const { Search } = Input;
  const { currentUser } = useUser();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, 'DRIVER DETAILS'));
        const rowData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRows(rowData);
      } catch (error) {
        console.error('Error fetching data: ', error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  const handleDelete = async (id) => {
    const docRef = doc(db, 'DRIVER DETAILS', id);
    try {
      await deleteDoc(docRef);
      setRows(rows.filter((row) => row.id !== id));
    } catch (error) {
      console.error('Error removing document: ', error);
    }
  };
  const columns = [
    {
      title: (
        <span className="text-[#404D59]  font-mainTextStyle text-custom font-custom leading-custom tracking-custom  ">
          Case Id
        </span>
      ),
      dataIndex: 'id',
    },
    {
      title: (
        <span className="text-[#404D59]  font-mainTextStyle text-custom font-custom leading-custom tracking-custom  ">
          Case Description
        </span>
      ),
      dataIndex: 'caseDescription',
    },
    {
      title: (
        <span className="text-[#404D59]  font-mainTextStyle text-custom font-custom leading-custom tracking-custom  ">
          Nic
        </span>
      ),
      dataIndex: 'nic',
    },
    {
      title: (
        <span className="text-[#404D59] font-mainTextStyle text-custom font-custom leading-custom tracking-custom">
          Status
        </span>
      ),
      render: (value) => {
        console.log('sta', value.paymentStatus);

        if (value.paymentStatus) {
          return (
            <div className="flex justify-center items-center w-[84px] h-[25px] rounded-[4px] py-[8px] px-[5px] gap-[10px] bg-[#E7FFEF] text-[#33CC66] font-mainTextStyle text-custom font-custom leading-custom tracking-custom">
              Successful
            </div>
          );
        } else {
          return (
            <div className=" flex justify-center items-center w-[84px] h-[25px] rounded-[4px] py-[8px] px-[5px] gap-[10px] bg-[#FFFAE8]  text-[#FFC400] font-mainTextStyle text-custom font-custom leading-custom tracking-custom">
              Pending
            </div>
          );
        }
      },
    },
    {
      title: (
        <span className="text-[#404D59]  font-mainTextStyle text-custom font-custom leading-custom tracking-custom  ">
          Case Location
        </span>
      ),
      dataIndex: 'caseLocation',
    },

    {
      title: (
        <span className="text-[#404D59]  font-mainTextStyle text-custom font-custom leading-custom tracking-custom  ">
          Action
        </span>
      ),
      render: (values) => {
        return (
          <>
            <div className="flex  gap-2   ">
              <Tooltip title="Info">
                <div
                  onClick={() => navigate(`/case-details/${values.id}`)}
                  className="flex justify-center items-center w-[58px] h-[25px] rounded-[4px] p-[8px] gap-[10px]    bg-[#E9EDF2] text-[#2352D8] font-mainTextStyle text-[12px] font-custom leading-custom tracking-custom cursor-pointer"
                >
                  View
                </div>
              </Tooltip>

              <Tooltip title="Delete">
                <div
                  onClick={() => handleDelete(values.id)}
                  className="flex justify-center items-center w-[58px] h-[25px] rounded-[4px] p-[8px] gap-[10px] bg-[#FFE8EC] text-[#FF5757] font-mainTextStyle text-[12px] font-custom leading-custom tracking-custom cursor-pointer"
                >
                  Delete
                </div>
              </Tooltip>
            </div>
          </>
        );
      },
    },
  ];
  
  const filteredRows =
    searchTerm.length === 0
      ? rows
      : rows.filter(
          (row) =>
            row.nic?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            row.caseDescription
              ?.toLowerCase()
              .includes(searchTerm.toLowerCase()),
        );

  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/adminDashboard">
              Cases
            </Nav.Link>
            <Nav.Link as={Link} to="/PenaltyView">
              Penalties
            </Nav.Link>
            <Nav.Link as={Link} to="/UsersView">
              Users
            </Nav.Link>
          </Nav>
          <Button onClick={handleLogout}>Logout</Button>
        </Container>
      </Navbar>

      <div className="my-14 mx-14">
        <div className="flex justify-between  items-center gap-10   border-b-2 border-b-[#E9EDF2] border-t-2 border-t-[#E9EDF2] py-6">

          <div className="flex justify-between  items-center gap-4 ">
            <span class="font-semibold text-[12px] leading-[16px] text-[#8B98A6] font-mainTextStyle">
              Search By:
            </span>

            <Search
              placeholder="Search by NIC or Description"
              onChange={(e) => setSearchTerm(e.target.value)} // when the user search i set searachTerm to on change 
              enterButton
            />
          </div>
          <div className="flex justify-between items-center gap-4">
            <span class="font-semibold text-[14px] leading-[16px] text-[#2352D8] font-mainTextStyle">
              Total Records
            </span>
            <div className=" text-[12px] font-semibold text-white leading-[16px] font-mainTextStyle bg-[#2352D8] w-[29px] h-[25px] rounded-[4px] p-2 gap-2 flex items-center justify-center">
              45
            </div>
          </div>
        </div>
        <Spin spinning={loading} tip="Loading Data...">
          <Table
            dataSource={filteredRows}
            columns={columns}
            className="custom-table-no-top-border pt-8"
          />
        </Spin>
      </div>
    </>
  );
};

export default Dashboard;









