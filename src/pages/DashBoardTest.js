//javascript
// Imports for React and testing utilities
import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';

// Import mock library for Firestore
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
jest.mock('firebase/firestore');

// Import User Context mock
import * as UserContext from '../UserContext';

// Mock useNavigate
const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}));

// Mock Dashboard component
import Dashboard from './Dashboard';

// Define a wrapper function for Dashboard to include necessary Context Providers
const DashboardWithContext = () => (
  <BrowserRouter>
    <UserContext.UserProvider>
      <Dashboard />
    </UserContext.UserProvider>
  </BrowserRouter>
);

beforeEach(() => {
  // Reset mocks before each test
  jest.clearAllMocks();

  // Mock Firestore responses
  getDocs.mockResolvedValue({
    docs: [
      {
        id: '1',
        data: () => ({ caseDescription: 'First Case', nic: '123456', paymentStatus: true, caseLocation: 'Location 1' }),
      },
      {
        id: '2',
        data: () => ({ caseDescription: 'Second Case', nic: '654321', paymentStatus: false, caseLocation: 'Location 2' }),
      },
    ],
  });

  // Mock the current user from UserContext
  jest.spyOn(UserContext, 'useUser').mockImplementation(() => ({
    currentUser: {
      uid: 'testUserId',
    },
  }));
});

test('renders and fetches case data correctly', async () => {
  render(<DashboardWithContext />);
  await waitFor(() => expect(getDocs).toHaveBeenCalledTimes(1));

  expect(screen.getByText(/First Case/i)).toBeInTheDocument();
  expect(screen.getByText(/Second Case/i)).toBeInTheDocument();
});

test('handles log out correctly', () => {
  render(<DashboardWithContext />);
  const logoutButton = screen.getByText(/Logout/i);
  fireEvent.click(logoutButton);

  expect(mockedNavigate).toHaveBeenCalledWith('/');
});

test('deletes a case correctly and updates UI', async () => {
  deleteDoc.mockResolvedValue(() => Promise.resolve('Document successfully deleted'));

  render(<DashboardWithContext />);
  await waitFor(() => expect(getDocs).toHaveBeenCalledTimes(1));

  // Assuming Delete button is the second button in the document for each row
  const deleteButtons = screen.getAllByText(/Delete/i);
  fireEvent.click(deleteButtons[0]);

  await waitFor(() => expect(deleteDoc).toHaveBeenCalledTimes(1));
  
  // Assuming the UI text that says "Deleted successfully" appears after deletion
  expect(screen.getByText(/Deleted successfully/i)).toBeInTheDocument();
});

test('searches cases correctly', async () => {
    render(<DashboardWithContext />);
    await waitFor(() => expect(getDocs).toHaveBeenCalledTimes(1));
  
    const searchInput = screen.getByPlaceholderText(/Search by NIC or Description/i);
    fireEvent.change(searchInput, { target: { value: '123456' } });
  
    // Simulate realistic delay for search/filter to apply
    await waitFor(() => {
      // Assuming the component filters the displayed cases in response to input
      expect(screen.queryByText(/First Case/i)).toBeInTheDocument();
      expect(screen.queryByText(/Second Case/i)).not.toBeInTheDocument();
    });
  });
  
//