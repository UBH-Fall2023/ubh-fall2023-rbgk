import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Component1 from './components/component1';
import './App.css';

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent(){
  return(
    <>
      <Component1 />
    </>
  );
}

export default App;
