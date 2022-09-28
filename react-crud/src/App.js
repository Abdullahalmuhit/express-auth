import './App.css';
import {BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';

import Home from './components/Home/Home';
import Login from "./components/Authentication/Login";
import Dashboard from './components/Dashboard';
import Signup from './components/Authentication/Signup';

function App() {
  return (
        <Router>
            <div className="App">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                 <Route path="/signup" element={<Signup />} />
                 <Route path="/dashboard" element={<Dashboard />} />
              </Routes>
            </div>
        </Router>
  );
}

export default App;
