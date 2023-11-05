import {BrowserRouter as Router, Route, Routes, useLocation} from 'react-router-dom';
import AddPoster from './components/AddPoster.jsx';
import HomePage from './components/AddPoster.jsx';
import './App.css';
import Signup from "./components/auth/components/signup";
import Signin from "./components/auth/components/signin";
import AuthDetails from "./components/auth/auth";

function App() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<HomePage/>}/>
                <Route path='/addposter' element={<AddPoster/>}/>
                <Route path='/signup' element={<Signup/>}/>
                <Route path='/signin' element={<Signin/>}/>
                <Route path='/auth' element={<AuthDetails/>}/>
            </Routes>
        </Router>
    );
}

export default App;
