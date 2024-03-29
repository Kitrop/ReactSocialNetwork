import './App.module.css'
import s from './App.module.css'
import {Route, Routes} from '../node_modules/react-router-dom/index'
import {Navigate} from 'react-router-dom'
import ScrollToTop from 'react-scroll-to-top'
import Login from './compo/Login/Login'
import {useDispatch, useSelector} from 'react-redux'
import {Suspense, useEffect} from 'react'
import {getInitializedSelector} from './redux/selectors/appSelector'
import Preloader from './compo/common/Preloader/Preloader'
import NotFound from './compo/common/404/NotFound'
import {ActionsType, initializeApp} from './redux/reducers/appReducer'
import Users from './compo/Users/Users'
import Profile from './compo/Profile/Profile'
import Header from './compo/Header/Header'
import {AppStateType} from './redux/redux-store'
import {ThunkDispatch} from 'redux-thunk'
import ChatPage from './compo/pages/Chat/ChatPage'


const App = () => {

    // STATE
    const initialized = useSelector( (state: AppStateType) => getInitializedSelector(state))

    // DISPATCH
    const dispatch: ThunkDispatch<AppStateType, unknown, ActionsType> = useDispatch()
    const initialize = () => dispatch(initializeApp())

    useEffect(() => {
        initialize().then(r => r)
    }, [initialized])
    if (!initialized) {
        return <Preloader/>
    }

    return (
        <div className={s.grid}>
            <Header/>
            {/*<Nav/>*/}
            <ScrollToTop smooth/>
            <div className={s.content}>
                <Routes>
                    <Route path="/profile/:userId" element={<Suspense fallback={<Preloader/>}> <Profile/> </Suspense>}/>
                    <Route path="/profile" element={<Suspense fallback={<Preloader/>}> <Profile/> </Suspense>}/>
                    <Route path="/users" element={<Users titleText={'Samurais'}/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/chat" element={<ChatPage />}/>
                    <Route path="*" element={<NotFound/>}/>
                    <Route path="/" element={<Navigate to="/users"/>}/>
                </Routes>
            </div>
        </div>
    )
}



export default App
