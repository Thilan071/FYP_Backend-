import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { Link } from 'react-router-dom';

const OicProfileDetails = () => {
  const { penaltyId } = useParams();
  const [oicData, setOicData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOicsData = async () => {
      const docRef = doc(db, "traffic_oics");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setOicData(docSnap.data());
      } else {
        console.log("No such case found!");
      }
      setLoading(false);
    };

    fetchOicsData();
  }, []); 
  const handleLogout = () => {
   
    console.log('Logout clicked');
};
  if (loading) return <div>Loading...</div>;
  if (!oicData) return <div>No case data found</div>;

  console.log(penaltyId);

  return (
    <div>
      {console.log(oicData)}
      <Navbar bg="primary" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">Dashboard</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/officerDashboard">Home</Nav.Link>
                        <Nav.Link as={Link} to="/">oic Profiles</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>

            <Container className="mt-4">
                <Card>
                    <Card.Header>OIC Details</Card.Header>
                    <Card.Body>
                        {(!loading) && (
                <>
                
               
              
      
     
       
        <p>oic Name: {oicData.trafficOicName}</p>
      <p>OIC Number: {oicData.trafficOicNumber}</p>
      {}
                </>
            )}
                    </Card.Body>
                </Card>
            </Container>
     
    </div>
  );
};

export default OicProfileDetails;
