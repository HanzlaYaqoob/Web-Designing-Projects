import UserProvider from "./context/userContext";
import LandingPage from "./pages/LandingPage";
import { Route, Routes } from "react-router-dom";
import Practice from "./pages/Practice";
import Dashboard from "./pages/Dashboard";
const App = () => {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/practice" element={<Practice />} />
      </Routes>
    </UserProvider>
  );
};

export default App;
