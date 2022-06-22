import './App.module.css';
import s from './App.module.css'
import Nav from "./compo/Nav/Nav";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import DialogsContainer from "./compo/Message/DialogsContainer";
import ScrollToTop from "react-scroll-to-top";
import UsersContainer from "./compo/Users/UsersContainer";
import ProfileContainer from "./compo/Profile/ProfileContainer";
import HeaderContainer from "./compo/Header/HeaderComponent";


function App(props) {

    return (
        <BrowserRouter>
            <div className={s.grid}>
                <HeaderContainer/>
                <Nav />
                <ScrollToTop smooth/>
                <div className={s.content}>
                    <Routes>
                        <Route path="/dialogs/*" element={<DialogsContainer  />}/>
                        <Route path="/profile/:userId" element={<ProfileContainer />}/>
                        <Route path="/users" element={<UsersContainer />}/>
                        <Route path="/login" element={<UsersContainer />}/>
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
