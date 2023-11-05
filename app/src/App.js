import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import AddPoster from './pages/AddPoster.jsx';
import HomePage from './pages/HomePage.jsx';
import './App.css';
import Signin from "./components/auth/components/signin";
import AuthDetails from "./components/auth/auth";

function App() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<HomePage/>}/>
                <Route path='/addposter' element={<AddPoster/>}/>
                <Route path='/signin' element={<Signin/>}/>
                <Route path='/signup' element={<h1>Signup</h1>}/>
                <Route path='/auth' element={<AuthDetails/>}/>
                <Route path='*' element={<h1>Not Found</h1>}/>
            </Routes>
        </Router>
    );
}

export default App;
