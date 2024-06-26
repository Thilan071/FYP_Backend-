
import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Card, Image, Carousel, Empty } from 'antd';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { db } from '../firebaseConfig';
import DummyProfile from '../assets/DummyProfile.svg';
const CaseDetails = () => {
  const { caseId } = useParams();
  const [caseData, setCaseData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCaseData = async () => {
      const docRef = doc(db, 'DRIVER DETAILS', caseId);
      const docSnap = await getDoc(docRef); 
      if (docSnap.exists()) {
        setCaseData(docSnap.data());
      } else {
        console.log('No such case found!');
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
            <Nav.Link as={Link} to="/">
              Cases
            </Nav.Link>
            <Nav.Link as={Link} to="/CaseView">
              CaseView
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link onClick={() => console.log('Logout clicked')}>
              Logout
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <div className="my-14 mx-14">
        <div className="flex justify-between  items-center gap-10   border-b-2 border-b-[#E9EDF2] border-t-2 border-t-[#E9EDF2] py-6">
          <div className=" text-[#404D59]  font-mainTextStyle text-[20px] font-custom leading-custom tracking-custom   ">
            Case Details
          </div>
        </div>

        <div className="mt-5">
          <Card className="border-[#E9EDF2] border-1">
            <div className="flex flex-col">
              <div className="flex justify-between items-center   ">
                <div className="flex justify-between items-center gap-3 ">
                  <img
                    src={DummyProfile}
                    height={60}
                    width={60}
                    alt="My icon"
                  />
                  <div className="flex flex-col ">
                    <h1 class="font-semibold text-[17px] leading-[16px] text-[#2C3640] font-mainTextStyle">
                      {caseData.firstName + caseData.lastName}
                    </h1>
                    <h1 class=" font-medium text-[13px] leading-[16px] text-[#8B98A6] font-mainTextStyle">
                      {caseData.nic}
                    </h1>
                  </div>
                </div>

               
              </div>

              <hr className=" border-1  border-[#E9EDF2] my-3" />

              <div className="flex justify-between items-center py-5">
                <div className="flex justify-between items-center gap-2">
                  <h1 class=" font-medium text-[14px] leading-[16px] text-[#A8B4BF] font-mainTextStyle">
                    Address :
                  </h1>
                  <h1 class=" font-semibold text-[15px] leading-[16px] text-[#576573] font-mainTextStyle">
                    {caseData.address}
                  </h1>
                </div>                
              </div>
            </div>
          </Card>
        </div>
        <div className=" grid grid-cols-2 gap-4 mt-5">
          <div className="col-span-1  border-2  border-[#E9EDF2]   rounded-lg overflow-hidden my-5">
            <div className="p-7">
              {/* Left Card Content */}
              <div className="flex flex-col gap-1">
                <h1 class="font-semibold text-[17px] leading-[16px] text-[#2C3640] font-mainTextStyle">
                   Details
                </h1>
                <h1 class=" font-medium text-[13px] leading-[16px] text-[#8B98A6] font-mainTextStyle">
                  View details here
                </h1>
              </div>

              <hr className=" border-1  border-[#E9EDF2] my-8" />

              <div className=" grid grid-cols-3 gap-7">
                <div className="flex flex-col gap-2">
                  <h1 className=" font-semibold text-[13px] leading-[16px] text-[#8B98A6] font-mainTextStyle">
                    Address
                  </h1>
                  <h1 className="font-custom text-[17px] leading-[16px] text-[#2C3640] font-mainTextStyle">
                    {caseData.address}
                  </h1>
                </div>
                <div className="flex flex-col gap-2">
                  <h1 className=" font-semibold text-[13px] leading-[16px] text-[#8B98A6] font-mainTextStyle">
                    Case Date
                  </h1>
                  <h1 className="font-custom text-[17px] leading-[16px] text-[#2C3640] font-mainTextStyle">
                    {caseData.caseDate}
                  </h1>
                </div>
                <div className="flex flex-col gap-2">
                  <h1 className=" font-semibold text-[13px] leading-[16px] text-[#8B98A6] font-mainTextStyle">
                    Case Direction
                  </h1>
                  <h1 className="font-custom text-[17px] leading-[16px] text-[#2C3640] font-mainTextStyle">
                    {caseData.caseDirection}
                  </h1>
                </div>
                <div className="flex flex-col gap-2">
                  <h1 className=" font-semibold text-[13px] leading-[16px] text-[#8B98A6] font-mainTextStyle">
                    caseExpireDate
                  </h1>
                  <h1 className="font-custom text-[17px] leading-[16px] text-[#2C3640] font-mainTextStyle">
                    {caseData.caseExpireDate}
                  </h1>
                </div>
                <div className="flex flex-col gap-2">
                  <h1 className=" font-semibold text-[13px] leading-[16px] text-[#8B98A6] font-mainTextStyle">
                    caseLocation
                  </h1>
                  <h1 className="font-custom text-[17px] leading-[16px] text-[#2C3640] font-mainTextStyle">
                    {caseData.caseLocation}
                  </h1>
                </div>
                <div className="flex flex-col gap-2">
                  <h1 className=" font-semibold text-[13px] leading-[16px] text-[#8B98A6] font-mainTextStyle">
                    caseStatus
                  </h1>
                  <h1 className="font-custom text-[17px] leading-[16px] text-[#33CC66] font-mainTextStyle">
                    {caseData.caseStatus}
                  </h1>
                </div>
                <div className="flex flex-col gap-2">
                  <h1 className=" font-semibold text-[13px] leading-[16px] text-[#8B98A6] font-mainTextStyle">
                    caseTime
                  </h1>
                  <h1 className="font-custom text-[17px] leading-[16px] text-[#2C3640] font-mainTextStyle">
                    {caseData.caseTime}
                  </h1>
                </div>

                <div className="flex flex-col gap-2">
                  <h1 className=" font-semibold text-[13px] leading-[16px] text-[#8B98A6] font-mainTextStyle">
                    driverId
                  </h1>
                  <h1 className="font-custom text-[17px] leading-[16px] text-[#2C3640] font-mainTextStyle">
                    {caseData.driverId}
                  </h1>
                </div>
                <div className="flex flex-col gap-2">
                  <h1 className=" font-semibold text-[13px] leading-[16px] text-[#8B98A6] font-mainTextStyle">
                    firstName
                  </h1>
                  <h1 className="font-custom text-[17px] leading-[16px] text-[#2C3640] font-mainTextStyle">
                    {caseData.firstName}
                  </h1>
                </div>
                <div className="flex flex-col gap-2">
                  <h1 className=" font-semibold text-[13px] leading-[16px] text-[#8B98A6] font-mainTextStyle">
                    lastName
                  </h1>
                  <h1 className="font-custom text-[17px] leading-[16px] text-[#2C3640] font-mainTextStyle">
                    {caseData.lastName}
                  </h1>
                </div>
                <div className="flex flex-col gap-2">
                  <h1 className=" font-semibold text-[13px] leading-[16px] text-[#8B98A6] font-mainTextStyle">
                    licenseNumber
                  </h1>
                  <h1 className="font-custom text-[17px] leading-[16px] text-[#2C3640] font-mainTextStyle">
                    {caseData.licenseNumber}
                  </h1>
                </div>
                <div className="flex flex-col gap-2">
                  <h1 className=" font-semibold text-[13px] leading-[16px] text-[#8B98A6] font-mainTextStyle">
                    mobileNumber
                  </h1>
                  <h1 className="font-custom text-[17px] leading-[16px] text-[#2C3640] font-mainTextStyle">
                    {caseData.mobileNumber}
                  </h1>
                </div>
                <div className="flex flex-col gap-2">
                  <h1 className=" font-semibold text-[13px] leading-[16px] text-[#8B98A6] font-mainTextStyle">
                    nic
                  </h1>
                  <h1 className="font-custom text-[17px] leading-[16px] text-[#2C3640] font-mainTextStyle">
                    {caseData.nic}
                  </h1>
                </div>
                <div className="flex flex-col gap-2">
                  <h1 className=" font-semibold text-[13px] leading-[16px] text-[#8B98A6] font-mainTextStyle">
                    paymentDate
                  </h1>
                  <h1 className="font-custom text-[17px] leading-[16px] text-[#2C3640] font-mainTextStyle">
                    {caseData.paymentDate}
                  </h1>
                </div>

                <div className="flex flex-col gap-2">
                  <h1 className=" font-semibold text-[13px] leading-[16px] text-[#8B98A6] font-mainTextStyle">
                    paymentStatus
                  </h1>
                  <h1 className="font-custom text-[17px] leading-[16px] text-[#2C3640] font-mainTextStyle">
                    {caseData.paymentStatus}
                  </h1>
                </div>

                <div className="flex flex-col gap-2">
                  <h1 className=" font-semibold text-[13px] leading-[16px] text-[#8B98A6] font-mainTextStyle">
                    penaltyCost
                  </h1>
                  <h1 className="font-custom text-[17px] leading-[16px] text-[#2C3640] font-mainTextStyle">
                    {caseData.caseDate}
                  </h1>
                </div>
                <div className="flex flex-col gap-2">
                  <h1 className=" font-semibold text-[13px] leading-[16px] text-[#8B98A6] font-mainTextStyle">
                    penaltyDescription
                  </h1>
                  <h1 className="font-custom text-[17px] leading-[16px] text-[#2C3640] font-mainTextStyle">
                    {caseData.penaltyDescription}
                  </h1>
                </div>
                <div className="flex flex-col gap-2">
                  <h1 className=" font-semibold text-[13px] leading-[16px] text-[#8B98A6] font-mainTextStyle">
                    penaltyId
                  </h1>
                  <h1 className="font-custom text-[17px] leading-[16px] text-[#2C3640] font-mainTextStyle">
                    {caseData.penaltyId}
                  </h1>
                </div>
                <div className="flex flex-col gap-2">
                  <h1 className=" font-semibold text-[13px] leading-[16px] text-[#8B98A6] font-mainTextStyle">
                    penaltyPayment
                  </h1>
                  <h1 className="font-custom text-[17px] leading-[16px] text-[#2C3640] font-mainTextStyle">
                    {caseData.penaltyPayment}
                  </h1>
                </div>
                <div className="flex flex-col gap-2">
                  <h1 className=" font-semibold text-[13px] leading-[16px] text-[#8B98A6] font-mainTextStyle">
                    trafficOicName
                  </h1>
                  <h1 className="font-custom text-[17px] leading-[16px] text-[#2C3640] font-mainTextStyle">
                    {caseData.trafficOicNumber}
                  </h1>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-1  justify-center items-center border-2  border-[#E9EDF2]   rounded-lg overflow-hidden my-5">
            <div className="  p-7">
              {caseData.imageUrls && caseData.imageUrls.length > 0 ? (
                <Carousel
                  autoplay
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  {caseData.imageUrls.map((image, index) => (
                    <div key={index}>
                      <img alt="image" src={image} width={400} height={400} />
                    </div>
                  ))}
                </Carousel>
              ) : (
                <Empty />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseDetails;