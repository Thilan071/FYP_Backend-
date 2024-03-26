// import React, { createContext, useContext, useState, useEffect } from 'react';

// const UserContext = createContext();

// export const useUser = () => useContext(UserContext);

// export const UserProvider = ({ children }) => {
//     const [currentUser, setCurrentUser] = useState(null);

//     useEffect(() => {
//         const storedUser = localStorage.getItem('user');
//         if (storedUser) {
//             setCurrentUser(JSON.parse(storedUser));
//         }
//     }, []);

//     return (
//         <UserContext.Provider value={{ currentUser, setCurrentUser }}>
//             {children}
//         </UserContext.Provider>
//     );
// };

import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setCurrentUser(JSON.parse(storedUser));
        }
    }, []);

    return (
        <UserContext.Provider value={{ currentUser, setCurrentUser }}>
            {children}
        </UserContext.Provider>
    );
};
