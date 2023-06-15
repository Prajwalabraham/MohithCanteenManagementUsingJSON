import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './Pages/Login/Login';
import Signup from './Pages/Login/Signup';
import Main from './Components/Main';
import AddMenuItem from './Pages/Admin/AddMenuItem';
import UserOrders from './Pages/User/UserOrders';
import AdminLogin from './Pages/Admin/AdminLogin';

function App() {
  return (
  <>
  <BrowserRouter>
    <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/AdminLogin" element={<AdminLogin />} />
        <Route path="/Main" element={<Main />} />
        <Route path="/addMenuItem" element={<AddMenuItem />} />
        <Route path="/userOrders" element={<UserOrders />} />
    </Routes>
  </BrowserRouter>
 </>
  );
}

export default App;
