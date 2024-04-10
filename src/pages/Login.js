import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBInput, MDBIcon, MDBCheckbox } from 'mdb-react-ui-kit';
import { db } from '../firebaseConfig'; 
import { collection, query, where, getDocs } from 'firebase/firestore';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const signIn = async (e) => {
        e.preventDefault();

        const usersRef = collection(db, "users");
        const q = query(usersRef, where("email", "==", email));

        try {
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                const userDoc = querySnapshot.docs[0].data();
                if (userDoc.password === password) {
                    userDoc.user_type === "admin" ? navigate('/adminDashboard') : navigate('/officerDashboard');
                } else {
                    alert("Invalid credentials.");
                }
            } else {
                alert("User not found.");
            }
        } catch (error) {
            console.error("Error during sign in:", error);
            alert("Login failed.");
        }
    };

    return (
        <MDBContainer fluid className="p-3 my-5 h-custom">
            <MDBRow>
                <MDBCol col='10' md='6'>
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" className="img-fluid" alt="Sample image" />
                </MDBCol>

                <MDBCol col='4' md='6'>
                    
                   

                    <MDBInput wrapperClass='mb-4' label='Email address' id='formControlLg' type='email' size="lg" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <MDBInput wrapperClass='mb-4' label='Password' id='formControlLg' type='password' size="lg" value={password} onChange={(e) => setPassword(e.target.value)} />

                    <div className='text-center text-md-start mt-4 pt-2'>
                        <MDBBtn className="mb-0 px-5" size='lg' onClick={signIn}>Login</MDBBtn>
                    </div>
                </MDBCol>
            </MDBRow>

            <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
                <div className="text-white mb-3 mb-md-0">
                </div>
                <div>
                    <MDBBtn tag='a' color='none' className='mx-3' style={{ color: 'white' }}>
                        <MDBIcon fab icon='facebook-f' size="md"/>
                    </MDBBtn>
                    <MDBBtn tag='a' color='none' className='mx-3' style={{ color: 'white'  }}>
                        <MDBIcon fab icon='twitter' size="md"/>
                    </MDBBtn>
                    <MDBBtn tag='a' color='none' className='mx-3' style={{ color: 'white'  }}>
                        <MDBIcon fab icon='google' size="md"/>
                    </MDBBtn>
                    <MDBBtn tag='a' color='none' className='mx-3' style={{ color: 'white'  }}>
                        <MDBIcon fab icon='linkedin-in' size="md"/>
                    </MDBBtn>
                </div>
            </div>
        </MDBContainer>
    );
};

export default Login;
