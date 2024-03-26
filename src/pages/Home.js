import React, { useState } from 'react';
import db from '../firebaseConfig'; // Adjust this path as needed
import { collection, addDoc } from 'firebase/firestore';

export default function Home() {
    const [inputText, setInputText] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevents the default form submission behavior
        try {
            // Add a new document with a generated id to the BACKEND collection
            await addDoc(collection(db, "BACKEND"), {
                text: inputText, // 'text' will be the field in your document
                timestamp: new Date() // Adds a timestamp for when the text was added
            });
            console.log("Document successfully written!");
            setInputText(''); // Clear the input field after submission
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    value={inputText} 
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Enter text here"
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}
