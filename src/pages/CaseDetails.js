
// import React, { useState, useEffect } from 'react';
// import { Navbar, Nav, Container, Card, Button,Carousel  } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { useParams } from 'react-router-dom';
// import { doc, getDoc } from 'firebase/firestore';
// import { Link } from 'react-router-dom';
// import { db } from '../firebaseConfig'; // Adjust the path as needed



// // Destructure db from the imported firebase module
// // const { db } = firebase;

// const CaseDetails = () => {
//   const { caseId } = useParams();
//   const [caseData, setCaseData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchCaseData = async () => {
//       const docRef = doc(db, "DRIVER DETAILS", caseId);
//       const docSnap = await getDoc(docRef);

//       if (docSnap.exists()) {
//         setCaseData(docSnap.data());
//       } else {
//         console.log("No such case found!");
//       }
//       setLoading(false);
//     };

//     fetchCaseData();
//   }, [caseId]); 
//   const handleLogout = () => {

//     console.log('Logout clicked');
// };
//   if (loading) return <div>Loading...</div>;
//   if (!caseData) return <div>No case data found</div>;

//   return (
//     <div>
//       {console.log(caseData)}
//       <Navbar bg="primary" variant="dark">
//                 <Container>
//                     <Navbar.Brand href="#home">Dashboard</Navbar.Brand>
//                     <Nav className="me-auto">
//                         <Nav.Link as={Link} to="/">Cases</Nav.Link>
//                         <Nav.Link as={Link} to="/CaseView">CaseView</Nav.Link>
//                     </Nav>
//                     <Nav>
//                         <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
//                     </Nav>
//                 </Container>
//             </Navbar>

//             <Container className="mt-4">
//                 <Card>
//                     <Card.Header>Case Details</Card.Header>
//                     <Card.Body>
//                         {(!loading) && (
//                 <>
                
               
              
      
     
//   <p>Address: {caseData.address}</p>
//         <p>Date: {caseData.caseDate}</p>
//         <p>Description: {caseData.caseDescription || 'N/A'}</p>
//         <p>Direction: {caseData.caseDirection}</p>
//         <p>Expire Date: {caseData.caseExpireDate || 'N/A'}</p>
//         <p>Location: {caseData.caseLocation}</p>
//         <p>Status: {caseData.caseStatus}</p>
//         <p>Time: {caseData.caseTime}</p>
//         <p>Driver ID: {caseData.driverId}</p>
//         <p>First Name: {caseData.firstName}</p>
//         <p>Last Name: {caseData.lastName}</p>
//         <p>License Number: {caseData.licenseNumber}</p>
//         <p>Mobile Number: {caseData.mobileNumber}</p>
//         <p>NIC: {caseData.nic}</p>
//         <p>Payment Date: {caseData.paymentDate}</p>
//         <p>Payment Status: {caseData.paymentStatus || 'N/A'}</p>
//         <p>Penalty Cost: {caseData.penaltyCost}</p>
//         <p>Penalty Description: {caseData.penaltyDescription}</p>
//         <p>Penalty ID: {caseData.penaltyId}</p>
//         <p>Penalty Payment: {caseData.penaltyPayment}</p>
//         <p>Traffic OIC Number: {caseData.trafficOicNumber}</p>
//         <p>Vehicle Number: {caseData.vehicleNumber}</p>
//         <p>Vehicle Type: {caseData.vehicleType || 'N/A'}</p>
//         <p>Vehicle Type ID: {caseData.vehicleTypeId}</p>
//         {/* Render images from imageUrls array */}
//         {caseData.imageUrls && caseData.imageUrls.map((url, urlIndex) => (
//   <img key={urlIndex} src={url} style={{ width: 200, height: 200, marginBottom: 10 }} alt={`Case Image ${urlIndex + 1}`} />
// ))}


//         {/* <p>Description: {caseData.caseDescription}</p>
//       <p>Location: {caseData.caseLocation}</p>
//       <p>NIC: {caseData.nic}</p>
//       <p>Panelty No: {caseData.penalty_id}</p>
//       <p>Officer No: {caseData.traffic_oic_number}</p>
  

//       <p>Direction: {caseData.caseDirection}</p> */}
//                 </>
//             )}
//                     </Card.Body>
//                 </Card>
//             </Container>
     
//     </div>
//   );
// };

// export default CaseDetails;


import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Card, Button, Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { db } from '../firebaseConfig';

const CaseDetails = () => {
  const { caseId } = useParams();
  const [caseData, setCaseData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCaseData = async () => {
      const docRef = doc(db, "DRIVER DETAILS", caseId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setCaseData(docSnap.data());
      } else {
        console.log("No such case found!");
      }
      setLoading(false);
    };

    fetchCaseData();
  }, [caseId]);

  if (loading) return <div>Loading...</div>;
  if (!caseData) return <div>No case data found</div>;

  return (
    <div>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Dashboard</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Cases</Nav.Link>
            <Nav.Link as={Link} to="/CaseView">CaseView</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link onClick={() => console.log('Logout clicked')}>Logout</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Container className="mt-4">
        <Card>
          <Card.Header>Case Details</Card.Header>
          <Card.Body>
            <p>Address: {caseData.address}</p>
            <p>Date: {caseData.caseDate}</p>
            <p>Description: {caseData.caseDescription || 'N/A'}</p>
            <p>Direction: {caseData.caseDirection}</p>
            <p>Expire Date: {caseData.caseExpireDate || 'N/A'}</p>
            <p>Location: {caseData.caseLocation}</p>
            <p>Status: {caseData.caseStatus}</p>
            <p>Time: {caseData.caseTime}</p>
            <p>Driver ID: {caseData.driverId}</p>
            <p>First Name: {caseData.firstName}</p>
            <p>Last Name: {caseData.lastName}</p>
            <p>License Number: {caseData.licenseNumber}</p>
            <p>Mobile Number: {caseData.mobileNumber}</p>
            <p>NIC: {caseData.nic}</p>
            <p>Payment Date: {caseData.paymentDate}</p>
            <p>Payment Status: {caseData.paymentStatus || 'N/A'}</p>
            <p>Penalty Cost: {caseData.penaltyCost}</p>
            <p>Penalty Description: {caseData.penaltyDescription}</p>
            <p>Penalty ID: {caseData.penaltyId}</p>
            <p>Penalty Payment: {caseData.penaltyPayment}</p>
            <p>Traffic OIC Number: {caseData.trafficOicNumber}</p>
            <p>Vehicle Number: {caseData.vehicleNumber}</p>
            <p>Vehicle Type: {caseData.vehicleType || 'N/A'}</p>
            <p>Vehicle Type ID: {caseData.vehicleTypeId}</p>

            {/* Small Carousel for the last two images */}
            {caseData.imageUrls && caseData.imageUrls.length > 0 && (
              <Carousel className="mt-3" style={{ maxWidth: "300px", margin: "0 auto" }}>
                {caseData.imageUrls.slice(-2).map((url, index) => (
                  <Carousel.Item key={index}>
                    <img
                      className="d-block w-100"
                      src={url}
                      alt={`Image ${index + 1}`}
                      style={{ maxHeight: "200px" }} // Control the size of the images
                    />
                  </Carousel.Item>
                ))}
              </Carousel>
            )}
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default CaseDetails;
