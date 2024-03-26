import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CaseView from './pages/CaseView';
import Dashboard from './pages/Dashboard';
import CaseDetails from './pages/CaseDetails';
import Login from './pages/Login';
import OicProfile from './pages/OicProfile';
import PenaltyView from './pages/PenaltyView';
import PenaltyDetails from './pages/PenaltyDetails';
import { UserProvider } from './UserContext';

function App() {
  return (
    <UserProvider>
    <Router>
      <Routes>
        <Route path="/adminDashboard" element={<Dashboard />} />
        <Route path="/CaseView" element={<CaseView />} />
        <Route path="/case-details/:caseId" element={<CaseDetails />} />
        <Route path="/PenaltyView" element={<PenaltyView />} />
        <Route path="/PenaltyDetails/:penaltyId" element={<PenaltyDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/officerDashboard" element={<OicProfile />} />
        {/* Other routes */}
      </Routes>
    </Router>
    </UserProvider>

  //   <Login/>

  // <OicProfile/>
  );
}
export default App;