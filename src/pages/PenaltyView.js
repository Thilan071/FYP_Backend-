import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { db } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';
import { Table, Tooltip, Spin, Input } from 'antd';

const PenaltyView = () => {
  const navigate = useNavigate();

  const [rows, setRows] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {

    fetchData();
  }, []); 
  const fetchData = async () => {
    setLoading(true);

    try {
      const querySnapshot = await getDocs(collection(db, 'penalties'));
      const rowData = [];
      querySnapshot.forEach((doc) => {
        console.log(doc.id);
        const data = doc.data();
        rowData.push({
          id: doc.id,
          penaltyCost: data.penaltyCost,
          penaltyDescription: data.penaltyDescription,
          penaltyTitle: data.penaltyTitle,
        });
      });
      setRows(rowData);
    } catch (error) {
      console.error('Error fetching data: ', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
 
    console.log('Logout clicked');
  };
  const handleView = (penaltyId) => {
    navigate(`/PenaltyDetails/${penaltyId}`);

    console.log('View clicked');
  };

  const handleAddNewPenalty = () => {
    navigate('/add-new-penalty'); 
  };
  const columns = [
    {
      title: (
        <span className="text-[#404D59]  font-mainTextStyle text-custom font-custom leading-custom tracking-custom  ">
          Penalty Id
        </span>
      ),
      dataIndex: 'id',
    },
    {
      title: (
        <span className="text-[#404D59]  font-mainTextStyle text-custom font-custom leading-custom tracking-custom  ">
          Penalty Description
        </span>
      ),
      dataIndex: 'penaltyDescription',
    },
    {
      title: (
        <span className="text-[#404D59]  font-mainTextStyle text-custom font-custom leading-custom tracking-custom  ">
          Penalty Cost
        </span>
      ),
      dataIndex: 'penaltyCost',
    },
    {
      title: (
        <span className="text-[#404D59]  font-mainTextStyle text-custom font-custom leading-custom tracking-custom  ">
          Penalty Title
        </span>
      ),
      dataIndex: 'penaltyTitle',
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
            <div className="flex justify-between items-center gap-1 ">
              <Tooltip title="Info">
                <div
                            onClick={() => handleView(values.id)}
                            className="flex justify-center items-center w-[58px] h-[25px] rounded-[4px] p-[8px] gap-[10px]    bg-[#E9EDF2] text-[#2352D8] font-mainTextStyle text-[12px] font-custom leading-custom tracking-custom cursor-pointer"
                >
                  View
                </div>
              </Tooltip>
            </div>
          </>
        );
      },
    },
  ];

  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/PenaltyView">
              Penalties
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <div className="my-14 mx-14">
        <div className="flex justify-between  items-center gap-10   border-b-2 border-b-[#E9EDF2] border-t-2 border-t-[#E9EDF2] py-6">
          <Button
            class="position-absolute top-0 end-0"
            variant="primary"
            onClick={handleAddNewPenalty}
          >
            Add New Penalty
          </Button>
        </div>
        <Spin spinning={loading} tip="Loading Data...">
          <Table
            dataSource={rows}
            columns={columns}
            className="custom-table-no-top-border pt-8"
          />
        </Spin>
      </div>

    </>
  );
};

export default PenaltyView;