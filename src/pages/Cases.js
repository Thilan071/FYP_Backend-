import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import db from '../firebaseConfig'; 
import { collection, getDocs } from 'firebase/firestore';
const Cases = () => {
    const [rows, setRows] = useState();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      
      
        fetchData();
    }, []); 
    const fetchData = async () => {
        setLoading(true);
      

        try {
            const querySnapshot = await getDocs(collection(db, "cases"));
            const rowData = [];
            querySnapshot.forEach(doc => {
                console.log(doc.id);
                const data = doc.data();
                rowData.push({
                    id: doc.id, 
                    case_description: data.case_description,
                nic: data.nic,
                case_time:data.case_time,
                case_direction:data.case_direction,
                
            
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
       
        console.log('Logout clicked');
    };
    const handleView = () => {
      
        console.log('View clicked');
    };

    return (
        <>
            <Navbar bg="primary" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">Dashboard</Navbar.Brand>
                    <Nav className="me-auto">
                    </Nav>
                    <Nav>
                        <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>

            <Container className="mt-4">
                <Card>
                    <Card.Header>Cases</Card.Header>
                    <Card.Body>
                        {(!loading) && (
                <>
                
            <table  class="table table-striped"> 
                <thead>
                    <tr>
                    <th>Case ID</th>
                        <th>Case Description</th>
                        <th>NIC</th>
                       
                        <th>Case Time</th>
                        <th>Case Direction</th>
                        <th>Case Expire Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                   
                    {rows.map((row) => (
                        <tr key={row.id}>
                            <td>{row.id}
                            
                            </td>
                            <td>{row.case_description}</td>
                            <td>{row.nic}</td>
                           
                            <td>{row.case_time}</td>
                            <td>{row.case_direction}</td>
                            <td>{row.case_expire_date}</td>
                            <td>  <Button variant="primary" onClick={handleView}>view</Button></td>
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

export default Cases;


