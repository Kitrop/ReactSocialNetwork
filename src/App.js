import './App.module.css';
import s from './App.module.css'
import Nav from "./componets/Nav/Nav";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import DialogsContainer from "./componets/Message/DialogsContainer";
import ScrollToTop from "react-scroll-to-top";
import UsersContainer from "./componets/Users/UsersContainer";
import ProfileContainer from "./componets/Profile/ProfileContainer";
import HeaderContainer from "./componets/Header/HeaderComponent";


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
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
