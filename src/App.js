import './App.module.css'
import s from './App.module.css'
import Nav from './compo/Nav/Nav'
import {Route, Routes} from '../node_modules/react-router-dom/index'
import {Navigate} from 'react-router-dom'
import ScrollToTop from 'react-scroll-to-top'
import Login from './compo/Login/Login.tsx'
import {useDispatch, useSelector} from 'react-redux'
import {lazy, Suspense, useEffect} from 'react'
import {getInitialized} from './redux/selectors/appSelector'
import Preloader from './compo/common/Preloader/Preloader'
import NotFound from './compo/common/404/NotFound'
import {initializeApp} from './redux/reducers/appReducer'
import Users from './compo/Users/Users'
import Profile from './compo/Profile/Profile'
import Header from './compo/Header/Header'

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
            <Header/>
            <Nav/>
            <ScrollToTop smooth/>
            <div className={s.content}>
                <Routes>
                    <Route path="/dialogs/*" element={<Suspense fallback={<Preloader/>}> <Dialogs/> </Suspense>}/>
                    <Route path="/profile/:userId" element={<Profile/>}/>
                    <Route path="/profile" element={<Profile/>}/>
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
