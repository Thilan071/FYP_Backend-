import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { Link } from 'react-router-dom';

const PenaltyDetails = () => {
  const { penaltyId } = useParams();
  const [penaltyData, setpenaltyData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPenaltyData = async () => {
      const docRef = doc(db, "penalties", penaltyId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setpenaltyData(docSnap.data());
      } else {
        console.log("No such case found!");
      }
      setLoading(false);
    };

    fetchPenaltyData();
  }, [penaltyId]); // Ensure this matches your route parameter
  const handleLogout = () => {
    // Handle logout logic
    // For example, clearing user session, redirecting to login page, etc.
    // In a non-DOM environment, you would handle navigation differently
    // For example, you might call a function to switch to the login screen
    console.log('Logout clicked');
};
  if (loading) return <div>Loading...</div>;
  if (!penaltyData) return <div>No case data found</div>;

  console.log(penaltyId);

  return (
    <div>
      {console.log(penaltyData)}
      <Navbar bg="primary" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">Dashboard</Navbar.Brand>
                    <Nav className="me-auto">
                        {/* Add navigation links here */}
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/PenaltyView">Penalties</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>

            {/* Main content */}
            <Container className="mt-4">
                <Card>
                    <Card.Header>Penalty Details</Card.Header>
                    <Card.Body>
                        {(!loading) && (
                <>
                
               
              
      
     
  <p>Penalty Cost: {penaltyData.penaltyCost}</p>
       
        <p>Penalty Description: {penaltyData.penaltyDescription}</p>
      <p>Penalty Title: {penaltyData.penaltyTitle}</p>
      {/* <p>NIC: {caseData.nic}</p>
      <p>Panelty No: {caseData.penalty_id}</p>
      <p>Officer No: {caseData.traffic_oic_number}</p>
  

      <p>Direction: {caseData.caseDirection}</p> */}
                </>
            )}
                    </Card.Body>
                </Card>
            </Container>
     
      {/* Display other case details as needed */}
    </div>
  );
};

export default PenaltyDetails;



