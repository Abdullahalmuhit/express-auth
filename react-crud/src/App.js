import './App.css';
import {BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';

import Home from './components/Home/Home';
import Login from "./components/Authentication/Login";

function App() {
  return (
        <Router>
            <div className="App">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
              </Routes>
            </div>
        </Router>
  );
}

export default App;
