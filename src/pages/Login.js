// import React, { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { doc, getDoc } from 'firebase/firestore';
// import { db } from '../firebaseConfig';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const userDocRef = doc(db, 'users', username); // Assuming 'username' is the doc ID

//       const userDocSnap = await getDoc(userDocRef);
//       console.log('dta', userDocSnap.data());
//       if (userDocSnap.exists() && userDocSnap.data().password === password) {
//         // Setting user information in localStorage
//         localStorage.setItem('user', JSON.stringify(userDocSnap.data()));

//         navigate(
//           userDocSnap.data().user_type === 'admin'
//             ? '/adminDashboard'
//             : '/officerDashboard',
//         );
//       } else {
//         setError('Invalid username or password');
//       }
//     } catch (error) {
//       console.error('Error signing in:', error);
//       setError('Error signing in');
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         {error && <div>{error}</div>}
//       </form>
//       <button
//         onClick={() => {
//           navigate('adminDashboard');
//         }}
//         type="submit"
//       >
//         Login
//       </button>
//     </div>
//   );
// };

// export default Login;

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBInput } from 'mdb-react-ui-kit';
// import { db } from '../firebaseConfig'; // Ensure this is the correct path
// import { collection, query, where, getDocs } from 'firebase/firestore';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const signIn = async (e) => {
//     e.preventDefault();

//     // Reference to the 'users' collection in Firestore
//     const usersRef = collection(db, "users");
//     // Create a query against the collection for the email
//     const q = query(usersRef, where("email", "==", email));

//     try {
//       const querySnapshot = await getDocs(q);

//       if (!querySnapshot.empty) {
//         const userDoc = querySnapshot.docs[0].data(); // Assuming unique emails
//         // Check if the password matches and navigate based on user_type
//         if (userDoc.password === password) {
//           userDoc.user_type === "admin" ? navigate('/adminDashboard') : navigate('/officerDashboard');
//         } else {
//           alert("Invalid credentials."); // Password does not match
//         }
//       } else {
//         alert("User not found."); // No user with that email
//       }
//     } catch (error) {
//       console.error("Error during sign in:", error);
//       alert("Login failed."); // Handle any errors during the sign-in process
//     }
//   };

//   return (
//     <MDBContainer fluid className="p-3 my-5">
//       <MDBRow>
//         <MDBCol md="6">
//           <MDBInput label="Email" id="email" type="email" 
//             value={email} onChange={(e) => setEmail(e.target.value)} />
//           <MDBInput label="Password" id="password" type="password" 
//             value={password} onChange={(e) => setPassword(e.target.value)} />
//           <MDBBtn onClick={signIn}>Login</MDBBtn>
//         </MDBCol>
//       </MDBRow>
//     </MDBContainer>
//   );
// };

// export default Login;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBInput, MDBIcon, MDBCheckbox } from 'mdb-react-ui-kit';
import { db } from '../firebaseConfig'; // Adjust this path as necessary
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
