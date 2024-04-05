// import React, { useState, useEffect } from 'react';
// import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
// import { Navbar, Nav, Container, Card, Button } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Link, useNavigate } from 'react-router-dom';
// import { db } from '../firebaseConfig'; // Adjust this path as needed
// import { useUser } from '../UserContext'; // Adjust this path as needed

// const Dashboard = () => {
//     const navigate = useNavigate();
//     const { currentUser } = useUser();
//     const [rows, setRows] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [deleteStatus, setDeleteStatus] = useState(''); // Status message state

    
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
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, []);

//     const handleDelete = async (id) => {
//         const docRef = doc(db, "DRIVER DETAILS", id);
//         try {
//             await deleteDoc(docRef);
//             setRows(rows.filter(row => row.id !== id));
//             setDeleteStatus('Penalty deleted successfully from your database.');
//             setTimeout(() => setDeleteStatus(''), 3000); // Clear message after 3 seconds
//         } catch (error) {
//             console.error("Error removing document: ", error);
//             setDeleteStatus('Failed to delete the penalty.');
//             setTimeout(() => setDeleteStatus(''), 3000); // Clear message after 3 seconds
//         }
//     };

//     const handleLogout = () => {
//         localStorage.removeItem('user');
//         navigate('/');
//     };

//     return (
//         <>
//             <Navbar bg="primary" variant="dark">
//                 <Container>
//                     <Nav className="me-auto">
//                         <Nav.Link as={Link} to="/adminDashboard">Cases</Nav.Link>
//                         <Nav.Link as={Link} to="/PenaltyView">Penalties</Nav.Link>
//                         <Nav.Link as={Link} to="/UsersView">Users</Nav.Link>
                        
                        
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
//                         {deleteStatus && <div className="alert alert-info">{deleteStatus}</div>}
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
//                                     {rows.map((row) => (
//                                         <tr key={row.id}>
//                                             <td>{row.id}</td>
//                                             <td>{row.caseDescription}</td>
//                                             <td>{row.nic}</td>
//                                             <td>{row.caseLocation}</td>
//                                             <td>{row.caseDirection}</td>
//                                             <td>
//                                                 <div className="d-flex justify-content-start">
//                                                     <div className="p-1">
//                                                         <Button variant="primary" onClick={() => navigate(`/case-details/${row.id}`)}>View</Button>
//                                                     </div>
//                                                     <div className="p-1">
//                                                         <Button variant="danger" onClick={() => handleDelete(row.id)}>Delete</Button>
//                                                     </div>
//                                                 </div>
//                                             </td>
//                                         </tr>
//                                     ))}
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







// import React, { useState, useEffect } from 'react';
// import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
// import { Navbar, Nav, Container, Card, Button, Form } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Link, useNavigate } from 'react-router-dom';
// import { db } from '../firebaseConfig'; // Adjust this path as needed
// import { useUser } from '../UserContext'; // Adjust this path as needed
// import { MDBInputGroup, MDBAutocomplete, MDBIcon, MDBBtn } from 'mdb-react-ui-kit';

// const Dashboard = () => {
//     const navigate = useNavigate();
//     const { currentUser } = useUser();
//     const [rows, setRows] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [deleteStatus, setDeleteStatus] = useState('');
//     const [searchTerm, setSearchTerm] = useState('');

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
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, []);

//     const handleLogout = () => {
//         localStorage.removeItem('user');
//         navigate('/');
//     };

//     const handleDelete = async (id) => {
//         const docRef = doc(db, "DRIVER DETAILS", id);
//         try {
//             await deleteDoc(docRef);
//             setRows(rows.filter(row => row.id !== id));
//             setDeleteStatus('Deleted successfully.');
//             setTimeout(() => setDeleteStatus(''), 3000);
//         } catch (error) {
//             console.error("Error removing document: ", error);
//         }
//     };

//     // Filter rows based on the search term
//    // Filter rows based on the search term
// const filteredRows = searchTerm.length === 0 ? rows : rows.filter(row =>
//     row.nic?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     row.caseDescription?.toLowerCase().includes(searchTerm.toLowerCase())
// );

//     return (
//         <>
//             <Navbar bg="primary" variant="dark">
//                 <Container>
//                     <Nav className="me-auto">
//                         <Nav.Link as={Link} to="/adminDashboard">Cases</Nav.Link>
//                         <Nav.Link as={Link} to="/PenaltyView">Penalties</Nav.Link>
//                         <Nav.Link as={Link} to="/UsersView">Users</Nav.Link>

//                     </Nav>
//                     <Button onClick={handleLogout}>Logout</Button>
//                 </Container>
//             </Navbar>

//             <Container className="mt-4">
//                 <Form className="d-flex mb-4">
//                     <Form.Control
//                         type="search"
//                         placeholder="Search by NIC or Description"
//                         className="me-2"
//                         aria-label="Search"
//                         onChange={(e) => setSearchTerm(e.target.value)}
//                     />
//                     <Button variant="outline-success">Search</Button>
//                 </Form>

//                 <Card>
//                     <Card.Header>Dashboard</Card.Header>
//                     <Card.Body>
//                         {deleteStatus && <div className="alert alert-success">{deleteStatus}</div>}
//                         {loading ? (
//                             <div>Loading...</div>
//                         ) : (
//                             <table className="table">
//                                 <thead>
//                                     <tr>
//                                         <th>Case ID</th>
//                                         <th>Case Description</th>
//                                         <th>NIC</th>
//                                         <th>Case Location</th>
//                                         <th>Payment Status</th>
//                                         <th>Action</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {filteredRows.map(row => (
//                                         <tr key={row.id}>
//                                             <td>{row.id}</td>
//                                             <td>{row.caseDescription}</td>
//                                             <td>{row.nic}</td>
//                                             <td>{row.caseLocation}</td>
//                                             <td>{row.paymentStatus}</td>
//                                             <td>
//                                                 <Button variant="primary" onClick={() => navigate(`/case-details/${row.id}`)}>View</Button>
//                                                 {' '}
//                                                 <Button variant="danger" onClick={() => handleDelete(row.id)}>Delete</Button>
//                                             </td>
//                                         </tr>
//                                     ))}
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








// import React, { useState, useEffect } from 'react';
// import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
// import { Navbar, Nav, Container, Card, Button, Form } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Link, useNavigate } from 'react-router-dom';
// import { db } from '../firebaseConfig'; // Adjust this path as needed
// import { useUser } from '../UserContext'; // Adjust this path as needed
// import { MDBInputGroup, MDBAutocomplete, MDBIcon, MDBBtn } from 'mdb-react-ui-kit';

// const Dashboard = () => {
//     const navigate = useNavigate();
//     const { currentUser } = useUser();
//     const [rows, setRows] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [deleteStatus, setDeleteStatus] = useState('');
//     const [searchTerm, setSearchTerm] = useState('');

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
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, []);

//     const handleLogout = () => {
//         localStorage.removeItem('user');
//         navigate('/');
//     };

//     const handleDelete = async (id) => {
//         const docRef = doc(db, "DRIVER DETAILS", id);
//         try {
//             await deleteDoc(docRef);
//             setRows(rows.filter(row => row.id !== id));
//             setDeleteStatus('Deleted successfully.');
//             setTimeout(() => setDeleteStatus(''), 3000);
//         } catch (error) {
//             console.error("Error removing document: ", error);
//         }
//     };

//     // Filter rows based on the search term
//    // Filter rows based on the search term
// const filteredRows = searchTerm.length === 0 ? rows : rows.filter(row =>
//     row.nic?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     row.caseDescription?.toLowerCase().includes(searchTerm.toLowerCase())
// );

//     return (
//         <>
//             <Navbar bg="primary" variant="dark">
//                 <Container>
//                     <Nav className="me-auto">
//                         <Nav.Link as={Link} to="/adminDashboard">Cases</Nav.Link>
//                         <Nav.Link as={Link} to="/PenaltyView">Penalties</Nav.Link>
//                         <Nav.Link as={Link} to="/UsersView">Users</Nav.Link>

//                     </Nav>
//                     <Button onClick={handleLogout}>Logout</Button>
//                 </Container>
//             </Navbar>

//             <Container className="mt-4">
//                 <Form className="d-flex mb-4">
//                     <Form.Control
//                         type="search"
//                         placeholder="Search by NIC or Description"
//                         className="me-2"
//                         aria-label="Search"
//                         onChange={(e) => setSearchTerm(e.target.value)}
//                     />
//                     <Button variant="outline-success">Search</Button>
//                 </Form>

//                 <Card>
//                     <Card.Header>Dashboard</Card.Header>
//                     <Card.Body>
//                         {deleteStatus && <div className="alert alert-success">{deleteStatus}</div>}
//                         {loading ? (
//                             <div>Loading...</div>
//                         ) : (
//                             <table className="table">
//                                 <thead>
//                                     <tr>
//                                         <th>Case ID</th>
//                                         <th>Case Description</th>
//                                         <th>NIC</th>
//                                         <th>Case Location</th>
//                                         <th>Payment Status</th>
//                                         <th>Action</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {filteredRows.map(row => (
//                                         <tr key={row.id}>
//                                             <td>{row.id}</td>
//                                             <td>{row.caseDescription}</td>
//                                             <td>{row.nic}</td>
//                                             <td>{row.caseLocation}</td>
//                                             <td>{row.paymentStatus}</td>
//                                             <td>
//                                                 <Button variant="primary" onClick={() => navigate(`/case-details/${row.id}`)}>View</Button>
//                                                 {' '}
//                                                 <Button variant="danger" onClick={() => handleDelete(row.id)}>Delete</Button>
//                                             </td>
//                                         </tr>
//                                     ))}
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
import { Navbar, Nav, Container, Card, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import { db } from '../firebaseConfig'; // Adjust this path as needed
import { useUser } from '../UserContext'; // Adjust this path as needed
import { MDBInputGroup, MDBAutocomplete, MDBIcon, MDBBtn } from 'mdb-react-ui-kit';

const Dashboard = () => {
    const navigate = useNavigate();
    const { currentUser } = useUser();
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleteStatus, setDeleteStatus] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

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

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/');
    };

    const handleDelete = async (id) => {
        const docRef = doc(db, "DRIVER DETAILS", id);
        try {
            await deleteDoc(docRef);
            setRows(rows.filter(row => row.id !== id));
            setDeleteStatus('Deleted successfully.');
            setTimeout(() => setDeleteStatus(''), 3000);
        } catch (error) {
            console.error("Error removing document: ", error);
        }
    };

    // Filter rows based on the search term
   // Filter rows based on the search term
const filteredRows = searchTerm.length === 0 ? rows : rows.filter(row =>
    row.nic?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    row.caseDescription?.toLowerCase().includes(searchTerm.toLowerCase())
);

    return (
        <>
            <Navbar bg="primary" variant="dark">
                <Container>
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/adminDashboard">Cases</Nav.Link>
                        <Nav.Link as={Link} to="/PenaltyView">Penalties</Nav.Link>
                        <Nav.Link as={Link} to="/UsersView">Users</Nav.Link>

                    </Nav>
                    <Button onClick={handleLogout}>Logout</Button>
                </Container>
            </Navbar>

            <Container className="mt-4">
                <Form className="d-flex mb-4">
                    <Form.Control
                        type="search"
                        placeholder="Search by NIC or Description"
                        className="me-2"
                        aria-label="Search"
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Button variant="outline-success">Search</Button>
                </Form>

                <Card>
                    <Card.Header>Dashboard</Card.Header>
                    <Card.Body>
                        {deleteStatus && <div className="alert alert-success">{deleteStatus}</div>}
                        {loading ? (
                            <div>Loading...</div>
                        ) : (
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Case ID</th>
                                        <th>Case Description</th>
                                        <th>NIC</th>
                                        <th>Case Location</th>
                                        <th>Payment Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
    {filteredRows.map(row => (
        <tr key={row.id}>
            <td>{row.id}</td>
            <td>{row.caseDescription}</td>
            <td>{row.nic}</td>
            <td>{row.caseLocation}</td>
            <td>
                {row.paymentStatus ? 'Payment Successful' : 'Pending'}
            </td>
            <td>
                <Button variant="primary" onClick={() => navigate(`/case-details/${row.id}`)}>View</Button>
                {' '}
                <Button variant="danger" onClick={() => handleDelete(row.id)}>Delete</Button>
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











