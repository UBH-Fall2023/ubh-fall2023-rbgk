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
  let asdf=3;
  let date = "11/14/23";
  let location = "badly 110";
  return(
    <>
      <Component1 title="placeholder title" description={asdf} date={date} location={location}/>
    </>
  );
}

export default App;
