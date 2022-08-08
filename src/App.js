import './App.module.css'
import s from './App.module.css'
import Nav from './compo/Nav/Nav'
import {Route, Routes} from '../node_modules/react-router-dom/index'
import { Navigate } from "react-router-dom";
import ScrollToTop from 'react-scroll-to-top'
import UsersContainer from './compo/Users/UsersContainer'
import ProfileContainer from './compo/Profile/ProfileContainer'
import HeaderContainer from './compo/Header/HeaderComponent'
import Login from './compo/Login/Login'
import {useDispatch, useSelector} from 'react-redux'
import {lazy, Suspense, useEffect} from 'react'
import {getInitialized} from './redux/selectors/appSelector'
import Preloader from './compo/common/Preloader/Preloader'
import NotFound from './compo/common/404/NotFound'
import {initializeApp} from './redux/reducers/appReducer'
import Users from './compo/Users/Users'

const Dialogs = lazy(() => import('./compo/Message/Dialogs'))

const App = () => {

    // STATE
    const initialized = useSelector( state => getInitialized(state))

    // DISPATCH
    const dispatch = useDispatch()
    const initialize = () => dispatch(initializeApp())

    useEffect(() => {
        initialize()
    }, [initialize])
    if (!initialized) {
        return <Preloader/>
    }

    return (
        <div className={s.grid}>
            <HeaderContainer/>
            <Nav/>
            <ScrollToTop smooth/>
            <div className={s.content}>
                <Routes>
                    <Route path="/dialogs/*" element={<Suspense fallback={<Preloader/>}> <Dialogs/> </Suspense>}/>
                    <Route path="/profile/:userId" element={<ProfileContainer/>}/>
                    <Route path="/profile" element={<ProfileContainer/>}/>
                    <Route path="/users" element={<Users titleText={'Samurais'}/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="*" element={<NotFound/>}/>
                    <Route path="/" element={<Navigate to="/users"/>}/>
                </Routes>
            </div>
        </div>
    )
}



export default App
