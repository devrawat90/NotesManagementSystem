import { AddCOmponent } from './components/AddCOmponent';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import "./App.css";
import { BrowserRouter as BrowserRouter, Routes, Route } from "react-router-dom"
import Privateroute from './components/Privateroute';
import Signup from './components/Signup';
import Login from './components/Login';
function App() {
  const BASEURL = `https://notesmanagement.onrender.com/`
  // const BASEURL = `http://localhost:7880`
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login BASEURL={BASEURL} />} />
        <Route path='signup' element={<Signup BASEURL={BASEURL} />} />
        <Route path='/user' element={<Privateroute />}>
          <Route path='dashboard' element={<AddCOmponent BASEURL={BASEURL} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
