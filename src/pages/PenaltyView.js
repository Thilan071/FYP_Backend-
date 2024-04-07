// import React, { useState, useEffect } from 'react';
// import { Navbar, Nav, Container, Card, Button } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { db } from '../firebaseConfig';
// import { collection, getDocs } from 'firebase/firestore';
// import { Link , useNavigate} from 'react-router-dom';




// const PenaltyView = () => {
//     const navigate = useNavigate();

//     const [rows, setRows] = useState();
//     const [loading, setLoading] = useState(true);
//     // Fetch the required data using the getDocs method
//     useEffect(() => { // Use useEffect hook to fetch data
      
      
//         fetchData();
//     }, []); // Empty dependency array means this effect runs once after the initial render
//     const fetchData = async () => {
//         setLoading(true);
      

//         try {
//             const querySnapshot = await getDocs(collection(db, "penalties"));
//             const rowData = [];
//             querySnapshot.forEach(doc => {
//                 console.log(doc.id);
//                 // Access data using doc.data()
//                 const data = doc.data();
//                 // Push an object with id and all data fields
//                 rowData.push({
//                     id: doc.id, 
//                     penaltyCost: data.penaltyCost,
//                     penaltyDescription: data.penaltyDescription,
//                     penaltyTitle:data.penaltyTitle,
//                 // case_expire_date:data.case_expire_date
                
            
//             });
//             });
//             setRows(rowData);
//             setLoading(false);
//         } catch (error) {
//             console.error("Error fetching data: ", error);
//             setLoading(false);
//         }
//     };

//     const handleLogout = () => {
//         // Handle logout logic
//         // For example, clearing user session, redirecting to login page, etc.
//         // In a non-DOM environment, you would handle navigation differently
//         // For example, you might call a function to switch to the login screen
//         console.log('Logout clicked');
//     };
//     const handleView = (penaltyId) => {
//         navigate(`/PenaltyDetails/${penaltyId}`);

//         console.log('View clicked');
//     };

//     const handleAddNewPenalty = () => {
//         navigate('/add-new-penalty'); // Navigate to the AddNewPenalty page
//     };

//     return (
//         <>
//             {/* Navigation bar */}
//             <Navbar bg="primary" variant="dark">
//                 <Container>
//                     <Nav className="me-auto">
//                         {/* Add navigation links here */}
//                         <Nav.Link as={Link} to="/PenaltyView">Penalties</Nav.Link>
//                     </Nav>
//                     <Nav>
//                         <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
//                     </Nav>
//                 </Container>
//             </Navbar>

//             {/* Main content */}
//             <Container className="mt-4">
//                 <Card>
//                     <Card.Header>Penalty View -0001
//                     <Button class="position-absolute top-0 end-0" variant="primary" onClick={handleAddNewPenalty}>Add New Penalty</Button>

//                     </Card.Header>

//                     <Card.Body>
//                         {(!loading) && (
//                 <>
                
//             <table  class="table table-striped"> 
//                 <thead>
//                     <tr>
//                     <th>Penalty ID</th>
//                     <th>Penalty Description</th>

//                         <th>Penalty Cost</th>
                       
//                         <th>Penalty Title</th>
//                         {/* <th>Case Direction</th>
//                         <th>Case Expire Date</th> */}
//                         <th>Action</th>
//                     </tr>
//                 </thead>
//                 <tbody>
                   
//                 {rows.map((row) => (
//     <tr key={row.id}>
//         <td>{row.id}</td>
//         <td>{row.penaltyDescription}</td>
//         <td>{row.penaltyCost}</td>
//         <td>{row.penaltyTitle}</td>
//         <td><Button variant="primary" onClick={() => handleView(row.id)}>View</Button></td>
//     </tr>
// ))}
//                 </tbody>
//             </table>
//                 </>
//             )}
//                     </Card.Body>
//                 </Card>
//             </Container>
//         </>
//     );
// };

// export default PenaltyView;





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
  // Fetch the required data using the getDocs method
  useEffect(() => {
    // Use useEffect hook to fetch data

    fetchData();
  }, []); // Empty dependency array means this effect runs once after the initial render
  const fetchData = async () => {
    setLoading(true);

    try {
      const querySnapshot = await getDocs(collection(db, 'penalties'));
      const rowData = [];
      querySnapshot.forEach((doc) => {
        console.log(doc.id);
        // Access data using doc.data()
        const data = doc.data();
        // Push an object with id and all data fields
        rowData.push({
          id: doc.id,
          penaltyCost: data.penaltyCost,
          penaltyDescription: data.penaltyDescription,
          penaltyTitle: data.penaltyTitle,
          // case_expire_date:data.case_expire_date
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
    // Handle logout logic
    // For example, clearing user session, redirecting to login page, etc.
    // In a non-DOM environment, you would handle navigation differently
    // For example, you might call a function to switch to the login screen
    console.log('Logout clicked');
  };
  const handleView = (penaltyId) => {
    navigate(`/PenaltyDetails/${penaltyId}`);

    console.log('View clicked');
  };

  const handleAddNewPenalty = () => {
    navigate('/add-new-penalty'); // Navigate to the AddNewPenalty page
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
      {/* Navigation bar */}
      <Navbar bg="primary" variant="dark">
        <Container>
          <Nav className="me-auto">
            {/* Add navigation links here */}
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