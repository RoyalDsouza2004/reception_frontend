import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./layout/Pages/Dashboard";
import Appointment from "./layout/Pages/Appointment";
import Staff from "./layout/Pages/Staff";
import Visitor from "./layout/Pages/Visitor";
import Layout from "./layout/Layout";
import Login from "./layout/Pages/Login.jsx";
import Register from "./layout/Pages/Register.jsx";


const App = () => {
  return <>
    <Router>
      <Routes>
          <Route path="/layout" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="appointment" element={<Appointment />} />
            <Route path="staff" element={<Staff />} />
            <Route path="visitor" element={<Visitor />} />
            
          </Route>
          <Route path="/" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
      </Routes>
    </Router>
  </>

};
export default App;
