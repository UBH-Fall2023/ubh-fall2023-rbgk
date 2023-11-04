import {BrowserRouter as Router, Route, Routes, useLocation} from 'react-router-dom';
import Component1 from './components/component1';
import './App.css';
import Signin from "./components/auth/components/signin";

function App() {
    return (
        <Router>
            <AppContent/>
        </Router>
    );
}

function AppContent() {
    return <Signin/>
}

export default App;
