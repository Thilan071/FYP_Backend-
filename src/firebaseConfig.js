// import { initializeApp } from "firebase/app";
// import { getFirestore } from '@firebase/firestore';
// import { getAuth } from "firebase/auth";
// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: "AIzaSyAH1FldF818dreTrueLLXBKkp-7-Lj4Y-4",
//   authDomain: "online-penalty-pay.firebaseapp.com",
//   projectId: "online-penalty-pay",
//   storageBucket: "online-penalty-pay.appspot.com",
//   messagingSenderId: "398202743917",
//   appId: "1:398202743917:web:836867e6b78a82a995a364"
// };

// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);
// const auth = getAuth(app);



// // Assign the object to a variable before exporting
// const firebase = { auth, db };

// export default firebase;

// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
// import { getAuth } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: "AIzaSyAH1FldF818dreTrueLLXBKkp-7-Lj4Y-4",
//   authDomain: "online-penalty-pay.firebaseapp.com",
//   projectId: "online-penalty-pay",
//   storageBucket: "online-penalty-pay.appspot.com",
//   messagingSenderId: "398202743917",
//   appId: "1:398202743917:web:836867e6b78a82a995a364"
// };

// // // Initialize Firebase App
// // const app = initializeApp(firebaseConfig);

// // // Initialize services
// // const db = getFirestore(app);
// // const auth = getAuth(app);

// // // Exporting the services for external use
// // export { db, auth };

// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);
// const auth = getAuth(app);

// export { db, auth };


import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAH1FldF818dreTrueLLXBKkp-7-Lj4Y-4",
    authDomain: "online-penalty-pay.firebaseapp.com",
    projectId: "online-penalty-pay",
    storageBucket: "online-penalty-pay.appspot.com",
    messagingSenderId: "398202743917",
    appId: "1:398202743917:web:836867e6b78a82a995a364"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
