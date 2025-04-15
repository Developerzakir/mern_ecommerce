import logo from './logo.svg';
import './App.css';
import Layout from './components/Layout/Layouts'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Policy from './pages/Policy';
import PagenotFound from './pages/PagenotFound';
import Register from './pages/auth/Register';
import { ToastContainer, toast } from 'react-toastify';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}> </Route>
        <Route path="/register" element={<Register />}> </Route>
        <Route path="/about" element={<About />}> </Route>
        <Route path="/contact" element={<Contact />}> </Route>
        <Route path="/policy" element={<Policy />}> </Route>
        <Route path="*" element={<PagenotFound />}> </Route>
      </Routes> 
    </>
  );
}

export default App;
