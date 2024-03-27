import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Card,Alert  } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { db } from '../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore'; // Import addDoc
import { useNavigate } from 'react-router-dom'; // Import useNavigate if you want to redirect after submission




const AddNewPenalty = () => {
    const [statusMessage, setStatusMessage] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [cost, setCost] = useState('');
    const navigate = useNavigate(); // Used for redirecting after submission

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await addDoc(collection(db, "penalties"), {
                penaltyTitle: title,
                penaltyDescription: description,
                penaltyCost: cost
            });
            setStatusMessage('Penalty added successfully'); // Set success message
            setTitle(''); // Reset the form fields
            setDescription('');
            setCost('');
            // Optionally, redirect after a delay
            // setTimeout(() => navigate('/PenaltyView'), 3000); // Redirect after 3 seconds
        } catch (error) {
            console.error("Error adding document: ", error);
            setStatusMessage('Error adding penalty'); // Set error message
        }}
 return(

    <Container>
    <Card>
        <Card.Header>Add New Penalty</Card.Header>
        <Card.Body>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicText">
                    <Form.Label>Penalty Title</Form.Label>
                    <Form.Control type="text" placeholder="Add Penalty Title Here" value={title} onChange={e => setTitle(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="formBasicText">
                    <Form.Label>Penalty Description</Form.Label>
                    <Form.Control type="text" placeholder="Add Penalty Description" value={description} onChange={e => setDescription(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="formBasicText">
                    <Form.Label>Penalty Cost</Form.Label>
                    <Form.Control type="text" placeholder="Add Penalty Cost" value={cost} onChange={e => setCost(e.target.value)} />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Add New Penalty
                </Button>
            </Form>
            {statusMessage && <Alert variant="success" className="mt-3">{statusMessage}</Alert>} {/* Display the status message */}
        </Card.Body>
    </Card>
</Container>
 );

};

export default AddNewPenalty;
