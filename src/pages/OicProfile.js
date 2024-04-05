// import React, { useState, useEffect } from 'react';
// import { Navbar, Nav, Container, Card, Button } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { collection, getDocs } from 'firebase/firestore';
// import { Link, useNavigate } from 'react-router-dom';
// import { db } from '../firebaseConfig';
// import { useUser } from '../UserContext'; // Adjust this path as needed


// const OicProfile = () => {
//     const { currentUser } = useUser(); // Add this line
//     const navigate = useNavigate();
//     const [oicData, setOicData] = useState(null);
//     const [loading, setLoading] = useState(true)

    

//     useEffect(() => {
//         const fetchOicData = async () => {
//           const OicColRef = collection(db, "traffic_oics");
//           setLoading(true);
//           try {
//             const OicSnapshot = await getDocs(OicColRef);
//             const OicsList = OicSnapshot.docs.map((doc) => ({
//               id: doc.id,
//               ...doc.data(),
//             }));
//             setOicData(OicsList);
//           } catch (error) {
//             console.error("Error fetching vehicles: ", error);
        
//           } finally{setLoading(false)};
//         };
    
//         fetchOicData();
//       }, []);

//       console.log(oicData);

//     if (loading) return <div>Loading...</div>;
//     if (!oicData) return <div>No OIC data found</div>;
//     const handleLogout = () => {
//         localStorage.removeItem('user');
//         currentUser(null);
//         navigate('/login'); 
//     };
//     return (
//         <div>
//            <Navbar bg="primary" variant="dark">
//                 <Container>
//                     <Navbar.Brand href="#home">Dashboard</Navbar.Brand>
//                     <Nav className="me-auto">
//                         {/* Add navigation links here */}
//                         <Nav.Link as={Link} to="/">Home</Nav.Link>
                       

//                     </Nav>
//                     <Nav>
//                     <button onClick={handleLogout}>
//             {currentUser ? `Logout (${currentUser.username})` : 'Logout'}
//         </button>
//                     </Nav>
//                 </Container>
//             </Navbar>

//             {/* Main content */}
//             <Container className="mt-4">
//                 <Card>
//                     <Card.Header>OIC Details</Card.Header>
//                     <Card.Body>
//                         <p>Name: {oicData.trafficOicName}</p>
//                         <p>Number: {oicData.trafficOicNumber}</p>
//                         {/* Add more details as needed */}
//                     </Card.Body>
//                 </Card>
//             </Container>
//         </div>
//     );
// };

// export default OicProfile;



import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { Card, Button, Container, Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MDBInput } from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';
import { db } from '../firebaseConfig';
import { useUser } from '../UserContext';

const OicProfile = () => {
    const { currentUser } = useUser();
    const navigate = useNavigate();
    const [oicData, setOicData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOicData = async () => {
            setLoading(true);
            try {
                const querySnapshot = await getDocs(collection(db, "traffic_oics"));
                const oicsList = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setOicData(oicsList);
            } catch (error) {
                console.error("Error fetching OIC data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOicData();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/');
    };

    const handleViewClick = (oicId) => {
        console.log("View OIC ID:", oicId);
        navigate(`/oic-profile-details/${oicId}`);

        // Here, you can replace the console.log with navigation logic, for example:
        // navigate(`/oic-details/${oicId}`);
    };

    const filteredOics = searchTerm.length > 0 ? oicData.filter(oic => 
        oic.trafficOicName?.toLowerCase().includes(searchTerm.toLowerCase()) || 
        oic.trafficOicNumber?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    ) : oicData;

    return (
        <>
            <Navbar bg="primary" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">Dashboard</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/officerDashboard">Home</Nav.Link>
                    </Nav>
                    <Button variant="outline-light" onClick={handleLogout}>Logout</Button>
                </Container>
            </Navbar>

            <Container className="mt-4">
                <MDBInput
                    label='Search OICs by Name or Number'
                    onChange={(e) => setSearchTerm(e.target.value)}
                    value={searchTerm}
                />

                {loading ? <div>Loading...</div> : (
                    <Card className="mt-3">
                        <Card.Header>OIC Profiles</Card.Header>
                        <Card.Body>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>OIC ID</th>
                                        <th>OIC Name</th>
                                        <th>OIC Number</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredOics.map(oic => (
                                        <tr key={oic.id}>
                                            <td>{oic.id}</td>
                                            <td>{oic.trafficOicName}</td>
                                            <td>{oic.trafficOicNumber}</td>
                                            <td>
                                                <Button variant="primary" onClick={() => handleViewClick(oic.id)}>View</Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </Card.Body>
                    </Card>
                )}
            </Container>
        </>
    );
};

export default OicProfile;
