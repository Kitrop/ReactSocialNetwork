import './App.module.css';
import s from './App.module.css'
import Nav from "./compo/Nav/Nav";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import DialogsContainer from "./compo/Message/DialogsContainer";
import ScrollToTop from "react-scroll-to-top";
import UsersContainer from "./compo/Users/UsersContainer";
import ProfileContainer from "./compo/Profile/ProfileContainer";
import HeaderContainer from "./compo/Header/HeaderComponent";
import Dialogs from "./compo/Message/Dialogs";
// import Login from "./compo/Login/Login";


function App(props) {

    return (
        <BrowserRouter>
            <div className={s.grid}>
                <HeaderContainer/>
                <Nav />
                <ScrollToTop smooth/>
                <div className={s.content}>
                    <Routes>
                        <Route path="/dialogs/*" element={<Dialogs/>}/>
                        <Route path="/profile/:userId" element={<ProfileContainer />}/>
                        <Route path='/profile/24394' element={<ProfileContainer />} />
                        <Route path="/users" element={<UsersContainer />}/>
                        {/*<Route path="/login" element={<Login />}/>*/}
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
