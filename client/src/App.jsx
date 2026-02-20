import {useAuth} from '@clerk/clerk-react';
import AuthPage from "./pages/AuthPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import {Routes, Route} from "react-router-dom";


const App = () => {
    const {isSignedIn,isLoaded} = useAuth()
    if(!isLoaded) return null
    return (
        <Routes>
            <Route path='/auth' element={<AuthPage/>}/>
            <Route path='/' element={<HomePage/>}/>
        </Routes>
    );
};

export default App;
