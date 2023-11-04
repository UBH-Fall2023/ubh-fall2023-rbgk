import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import AddPoster from './components/AddPoster.jsx';
import HomePage from './components/AddPoster.jsx';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element ={<HomePage />} />
        <Route path='/addposter' element ={<AddPoster />} />
      </Routes>
    </Router>
  );
}

export default App;
