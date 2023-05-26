import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './Pages/Login/Login';
import Signup from './Pages/Login/Signup';
import Main from './Components/Main';

function App() {
  return (
    <>
  <BrowserRouter>
    <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Main" element={<Main />} />
    </Routes>
  </BrowserRouter>
 </>
  );
}

export default App;
