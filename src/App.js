import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CaseView from './pages/CaseView';
import Dashboard from './pages/Dashboard';
import CaseDetails from './pages/CaseDetails';
import Login from './pages/Login';
import OicProfile from './pages/OicProfile';
import PenaltyView from './pages/PenaltyView';
import PenaltyDetails from './pages/PenaltyDetails';
import { UserProvider } from './UserContext';
import AddNewPenalty from './pages/AddNewPenalty';
import Users from './pages/Users';
import AddNewUserForm from './pages/AddNewUserForm';
import OicProfileDetails from './pages/OicProfileDetails';
import './index.css';

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/adminDashboard" element={<Dashboard />} />
          <Route path="/CaseView" element={<CaseView />} />
          <Route path="/case-details/:caseId" element={<CaseDetails />} />
          <Route path="/PenaltyView" element={<PenaltyView />} />
          <Route
            path="/PenaltyDetails/:penaltyId"
            element={<PenaltyDetails />}
          />
          <Route path="/" element={<Login />} />
          <Route path="/officerDashboard" element={<OicProfile />} />
          <Route path="/add-new-penalty" element={<AddNewPenalty />} />
          <Route path="/UsersView" element={<Users />} />
          <Route path="/add-new-user" element={<AddNewUserForm />} />
          
        </Routes>
      </Router>
    </UserProvider>
      // <Login/>
    // <Users/>
  )
    
}
export default App;