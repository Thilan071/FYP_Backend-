import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { collection, getDocs } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';
import { db } from '../firebaseConfig'; // Adjust this path as needed
import { useUser } from '../UserContext'; // Adjust this path as needed


const Dashboard = () => {
    const navigate = useNavigate();
    const { currentUser } = useUser(); // Add this line
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);

    console.log(currentUser);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const querySnapshot = await getDocs(collection(db, "cases"));
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
    }, []); // Removed db as a dependency to avoid unnecsessary re-fetching

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
                                            <td>{row.case_description}</td>
                                            <td>{row.nic}</td>
                                            <td>{row.case_location}</td>
                                            <td>{row.case_direction}</td>
                                            <td>
                                                <Button variant="primary" onClick={() => navigate(`/case-details/${row.id}`)}>View</Button>
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