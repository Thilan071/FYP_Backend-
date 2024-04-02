import React, { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { Navbar, Nav, Container, Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams, Link } from 'react-router-dom';
import { db } from '../firebaseConfig';

const OicProfileDetails = () => {
  const { oicId } = useParams(); // Assume your URL parameter is named 'oicId'
  const [oicData, setOicData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOicData = async () => {
      const docRef = doc(db, "traffic_oics", oicId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setOicData(docSnap.data());
      } else {
        console.log("No such OIC found!");
      }
      setLoading(false);
    };

    fetchOicData();
  }, [oicId]);

  const handleLogout = () => {
    console.log('Logout clicked');
    // Add your logout logic here
  };

  if (loading) return <div>Loading...</div>;
  if (!oicData) return <div>No OIC data found</div>;

  return (
    <div>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Dashboard</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Cases</Nav.Link>
            <Nav.Link as={Link} to="/OicProfile">OIC Profiles</Nav.Link>
          </Nav>
          <Button variant="outline-light" onClick={handleLogout}>Logout</Button>
        </Container>
      </Navbar>

      <Container className="mt-4">
        <Card>
          <Card.Header>OIC Details</Card.Header>
          <Card.Body>
            {/* Dynamically create paragraph tags for each OIC detail */}
            {Object.entries(oicData).map(([key, value]) => (
              <p key={key}>{`${key.charAt(0).toUpperCase() + key.slice(1)}: ${value || 'N/A'}`}</p>
            ))}
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default OicProfileDetails;
