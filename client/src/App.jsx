import {useAuth} from '@clerk/clerk-react';
import AuthPage from "./pages/AuthPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import {Routes, Route} from "react-router-dom";
import {Navigate} from "react-router";


const App = () => {
    const {isSignedIn,isLoaded} = useAuth()
    if(!isLoaded) return null
    return (
        <Routes>
            <Route path='/' element={isSignedIn ? <HomePage/> : <Navigate to={'/auth'} replace/>}/>
            <Route path='/auth' element={!isSignedIn ? <AuthPage/> : <Navigate to={'/'} replace/>}/>
        </Routes>
    );
};

export default App;
