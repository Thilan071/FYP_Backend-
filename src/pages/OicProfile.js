import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { collection, getDocs } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';
import { db } from '../firebaseConfig';
import { useUser } from '../UserContext'; // Adjust this path as needed


const OicProfile = () => {
    const { currentUser } = useUser(); // Add this line
    const navigate = useNavigate();
    const [oicData, setOicData] = useState(null);
    const [loading, setLoading] = useState(true)

    

    useEffect(() => {
        const fetchOicData = async () => {
          const OicColRef = collection(db, "traffic_oics");
          setLoading(true);
          try {
            const OicSnapshot = await getDocs(OicColRef);
            const OicsList = OicSnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            setOicData(OicsList);
          } catch (error) {
            console.error("Error fetching vehicles: ", error);
        
          } finally{setLoading(false)};
        };
    
        fetchOicData();
      }, []);

      console.log(oicData);

    if (loading) return <div>Loading...</div>;
    if (!oicData) return <div>No OIC data found</div>;
    const handleLogout = () => {
        localStorage.removeItem('user');
        currentUser(null);
        navigate('/login'); 
    };
    return (
        <div>
           <Navbar bg="primary" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">Dashboard</Navbar.Brand>
                    <Nav className="me-auto">
                        {/* Add navigation links here */}
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                       

                    </Nav>
                    <Nav>
                    <button onClick={handleLogout}>
            {currentUser ? `Logout (${currentUser.username})` : 'Logout'}
        </button>
                    </Nav>
                </Container>
            </Navbar>

            {/* Main content */}
            <Container className="mt-4">
                <Card>
                    <Card.Header>OIC Details</Card.Header>
                    <Card.Body>
                        <p>Name: {oicData.trafficOicName}</p>
                        <p>Number: {oicData.trafficOicNumber}</p>
                        {/* Add more details as needed */}
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
};

export default OicProfile;
