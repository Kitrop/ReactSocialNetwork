import './App.module.css';
import s from './App.module.css'
import Nav from "./compo/Nav/Nav";
import {BrowserRouter, Route, Routes} from '../node_modules/react-router-dom/index';
import ScrollToTop from "react-scroll-to-top";
import UsersContainer from "./compo/Users/UsersContainer";
import ProfileContainer from "./compo/Profile/ProfileContainer";
import HeaderContainer from "./compo/Header/HeaderComponent";
import Dialogs from "./compo/Message/Dialogs";
import Login from "./compo/Login/Login";
import {connect} from "react-redux";
import {useEffect} from "react";
import {initializeApp} from "./redux/reducers/appReducer";
import {getInitialized} from "./redux/selectors/appSelector";
import Preloader from "./compo/Preloader/Preloader";


function App(props) {
    // let initialize = useSelector(state => getInitialized(state))

    // const dispatch = useDispatch()
    // let userData = () => dispatch(initializeApp)
    // useEffect(() => {
    //     userData()
    // }, [dispatch])



    useEffect(() => {
        props.initializeApp()
    })


    if ( !props.initialized ) {
        return <Preloader />
    }

    return (<BrowserRouter>
            <div className={s.grid}>
                <HeaderContainer/>
                <Nav/>
                <ScrollToTop smooth/>
                <div className={s.content}>
                    <Routes>
                        <Route path="/dialogs/*" element={<Dialogs/>}/>
                        <Route path="/profile/:userId" element={<ProfileContainer/>}/>
                        <Route path='/profile/24394' element={<ProfileContainer/>}/>
                        <Route path="/users" element={<UsersContainer/>}/>
                        <Route path="/login" element={<Login/>}/>
                    </Routes>
                </div>
            </div>
        </BrowserRouter>);
}

const mapStateToProps = (state) => {
    return {
        initialized: getInitialized(state)
    }
}

export default connect(mapStateToProps, {initializeApp})(App);
