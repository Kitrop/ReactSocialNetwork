import './App.module.css';
import s from './App.module.css'
import Header from "./compo/Header/Header";
import Nav from "./compo/Nav/Nav";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import DialogsContainer from "./compo/Message/DialogsContainer";
import ScrollToTop from "react-scroll-to-top";
import UsersContainer from "./compo/Users/UsersContainer";
import ProfileContainer from "./compo/Profile/ProfileContainer";

function App(props) {

    return (
        <BrowserRouter>
            <div className={s.grid}>
                <Header/>
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
