import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { db } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { Link , useNavigate} from 'react-router-dom';




const PenaltyView = () => {
    const navigate = useNavigate();

    const [rows, setRows] = useState();
    const [loading, setLoading] = useState(true);
    // Fetch the required data using the getDocs method
    useEffect(() => { // Use useEffect hook to fetch data
      
      
        fetchData();
    }, []); // Empty dependency array means this effect runs once after the initial render
    const fetchData = async () => {
        setLoading(true);
      

        try {
            const querySnapshot = await getDocs(collection(db, "penalties"));
            const rowData = [];
            querySnapshot.forEach(doc => {
                console.log(doc.id);
                // Access data using doc.data()
                const data = doc.data();
                // Push an object with id and all data fields
                rowData.push({
                    id: doc.id, 
                    penaltyCost: data.penaltyCost,
                    penaltyDescription: data.penaltyDescription,
                    penaltyTitle:data.penaltyTitle,
                // case_expire_date:data.case_expire_date
                
            
            });
            });
            setRows(rowData);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching data: ", error);
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

    return (
        <>
            {/* Navigation bar */}
            <Navbar bg="primary" variant="dark">
                <Container>
                    <Navbar.Brand href="#home"> Dashboard</Navbar.Brand>
                    <Nav className="me-auto">
                        {/* Add navigation links here */}
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/PenaltyView">Cases</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>

            {/* Main content */}
            <Container className="mt-4">
                <Card>
                    <Card.Header>Penalty View -0001</Card.Header>
                    <Card.Body>
                        {(!loading) && (
                <>
                
            <table  class="table table-striped"> 
                <thead>
                    <tr>
                    <th>Case ID</th>
                        <th>Penalty Cost</th>
                        <th>Penalty Description</th>
                       
                        <th>Penalty Title</th>
                        {/* <th>Case Direction</th>
                        <th>Case Expire Date</th> */}
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                   
                {rows.map((row) => (
    <tr key={row.id}>
        <td>{row.id}</td>
        <td>{row.penaltyDescription}</td>
        <td>{row.penaltyCost}</td>
        <td>{row.penaltyTitle}</td>
        <td><Button variant="primary" onClick={() => handleView(row.id)}>View</Button></td>
    </tr>
))}
                </tbody>
            </table>
                </>
            )}
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
};

export default PenaltyView;
