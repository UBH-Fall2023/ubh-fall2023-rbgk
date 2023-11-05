import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddPoster from './pages/AddPoster.jsx';
import HomePage from './pages/HomePage.jsx';
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
