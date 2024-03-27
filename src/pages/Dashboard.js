// import React, { useState, useEffect } from 'react';
// import { Navbar, Nav, Container, Card, Button } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
// import { Link, useNavigate } from 'react-router-dom';
// import { db } from '../firebaseConfig'; // Adjust this path as needed
// import { useUser } from '../UserContext'; // Adjust this path as needed


// const Dashboard = () => {
//     const navigate = useNavigate();
//     const { currentUser } = useUser(); // Add this line
//     const [rows, setRows] = useState([]);
//     const [loading, setLoading] = useState(true);

//     console.log(currentUser);

//     useEffect(() => {
//         const fetchData = async () => {
//             setLoading(true);
//             try {
//                 const querySnapshot = await getDocs(collection(db, "DRIVER DETAILS"));
//                 const rowData = querySnapshot.docs.map(doc => ({
//                     id: doc.id, 
//                     ...doc.data(),
//                 }));
//                 setRows(rowData);
//                 setLoading(false);
//             } catch (error) {
//                 console.error("Error fetching data: ", error);
//     setLoading(false);
//             }
//         };

//         fetchData();
//     }, []); // Removed db as a dependency to avoid unnecsessary re-fetching

//     const handleLogout = () => {
//         localStorage.removeItem('user');
//         navigate('/login');
//     };
//     const handleDelete = async (id) => {
//         const docRef = doc(db, "DRIVER DETAILS", id);
//         try {
//             await deleteDoc(docRef);
//             // Remove the deleted row from the UI by filtering out the deleted row's ID
//             setRows(rows.filter(row => row.id !== id));
//         } catch (error) {
//             console.error("Error removing document: ", error);
//         }
//     };
    


//     return (
//         <>
//              <Navbar bg="primary" variant="dark">
//                 <Container>
//                     <Navbar.Brand href="#home">Dashboard</Navbar.Brand>
//                     <Nav className="me-auto">
//                         <Nav.Link as={Link} to="/adminDashboard">Cases</Nav.Link>
//                         <Nav.Link as={Link} to="/PenaltyView">Penalties</Nav.Link>
//                     </Nav>
//                     <Nav>
//                         <Button onClick={handleLogout}>
//                             {currentUser ? `Logout (${currentUser.username})` : 'Logout'}
//                         </Button>
//                     </Nav>
//                 </Container>
//             </Navbar>

//             <Container className="mt-4">
//                 <Card>
//                     <Card.Header>Dashboard</Card.Header>
//                     <Card.Body>
//                         {loading ? (
//                             <div>Loading...</div>
//                         ) : (
//                             <table className="table table-striped">
//                                 <thead>
//                                     <tr>
//                                         <th>Case ID</th>
//                                         <th>Case Description</th>
//                                         <th>NIC</th>
//                                         <th>Case Location</th>
//                                         <th>Case Direction</th>
//                                         <th>Action</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                 {rows.map((row) => (
//         <tr key={row.id}>
//             <td>{row.id}</td>
//             <td>{row.caseDescription}</td>
//             <td>{row.nic}</td>
//             <td>{row.caseLocation}</td>
//             <td>{row.caseDirection}</td>
//             <td>
//                 <div className="d-flex justify-content-start">
//                     <div className="p-1">
//                         <Button variant="primary" onClick={() => navigate(`/case-details/${row.id}`)}>View</Button>
//                     </div>
//                     <div className="p-1">
//                         <Button variant="danger" onClick={() => handleDelete(row.id)}>Delete</Button>
//                     </div>
//                 </div>
//             </td>
//         </tr>
//     ))}
//                                 </tbody>
//                             </table>
//                         )}
//                     </Card.Body>
//                 </Card>
//             </Container>
//         </>
//     );
// };

// export default Dashboard;

import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { Navbar, Nav, Container, Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import { db } from '../firebaseConfig'; // Adjust this path as needed
import { useUser } from '../UserContext'; // Adjust this path as needed

const Dashboard = () => {
    const navigate = useNavigate();
    const { currentUser } = useUser();
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleteStatus, setDeleteStatus] = useState(''); // Status message state

    
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const querySnapshot = await getDocs(collection(db, "DRIVER DETAILS"));
                const rowData = querySnapshot.docs.map(doc => ({
                    id: doc.id, 
                    ...doc.data(),
                }));
                setRows(rowData);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data: ", error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleDelete = async (id) => {
        const docRef = doc(db, "DRIVER DETAILS", id);
        try {
            await deleteDoc(docRef);
            setRows(rows.filter(row => row.id !== id));
            setDeleteStatus('Penalty deleted successfully from your database.');
            setTimeout(() => setDeleteStatus(''), 3000); // Clear message after 3 seconds
        } catch (error) {
            console.error("Error removing document: ", error);
            setDeleteStatus('Failed to delete the penalty.');
            setTimeout(() => setDeleteStatus(''), 3000); // Clear message after 3 seconds
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <>
            <Navbar bg="primary" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">Dashboard</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/adminDashboard">Cases</Nav.Link>
                        <Nav.Link as={Link} to="/PenaltyView">Penalties</Nav.Link>
                        <Nav.Link as={Link} to="/UsersView">Users</Nav.Link>
                        
                        
                    </Nav>
                    <Nav>
                        <Button onClick={handleLogout}>
                            {currentUser ? `Logout (${currentUser.username})` : 'Logout'}
                        </Button>
                    </Nav>
                </Container>
            </Navbar>

            <Container className="mt-4">
                <Card>
                    <Card.Header>Dashboard</Card.Header>
                    <Card.Body>
                        {deleteStatus && <div className="alert alert-info">{deleteStatus}</div>}
                        {loading ? (
                            <div>Loading...</div>
                        ) : (
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Case ID</th>
                                        <th>Case Description</th>
                                        <th>NIC</th>
                                        <th>Case Location</th>
                                        <th>Case Direction</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rows.map((row) => (
                                        <tr key={row.id}>
                                            <td>{row.id}</td>
                                            <td>{row.caseDescription}</td>
                                            <td>{row.nic}</td>
                                            <td>{row.caseLocation}</td>
                                            <td>{row.caseDirection}</td>
                                            <td>
                                                <div className="d-flex justify-content-start">
                                                    <div className="p-1">
                                                        <Button variant="primary" onClick={() => navigate(`/case-details/${row.id}`)}>View</Button>
                                                    </div>
                                                    <div className="p-1">
                                                        <Button variant="danger" onClick={() => handleDelete(row.id)}>Delete</Button>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
};

export default Dashboard;
