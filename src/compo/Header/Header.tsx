import style from './Header.module.css'
import {NavLink} from 'react-router-dom'
import {FC, useCallback, useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {AppStateType} from '../../redux/redux-store'
import {getIsAuthSelector, getLoginSelector} from '../../redux/selectors/authSelector'
import {ThunkDispatch} from 'redux-thunk'
import {ActionsType, loginMeThunk, logoutThunk} from '../../redux/reducers/authReducer'
import {
    AppBar,
    Box,
    Button,
    createTheme,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    ThemeProvider,
    Toolbar
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import LogoutIcon from '@mui/icons-material/Logout'
import SendIcon from '@mui/icons-material/Send'
import PeopleIcon from '@mui/icons-material/People'
import PersonIcon from '@mui/icons-material/Person'
import uniqid from 'uniqid'


interface Props {
    window?: () => Window;
}

const theme = createTheme({
    palette: {
        secondary: {
            main: '#0091cf',
        },
    },
});

const Header: FC<Props> = (props) => {


    // STATE
    const isAuth_ = useSelector((state: AppStateType) =>  getIsAuthSelector(state))
    const login_ = useSelector((state: AppStateType)  => getLoginSelector(state))

    // DISPATCH
    const dispatch: ThunkDispatch<AppStateType, unknown, ActionsType> = useDispatch()
    const loginThunk_ = useCallback(() => dispatch(loginMeThunk()), [dispatch])
    const logoutThunk_ = () => dispatch(logoutThunk())

    const drawerWidth = 240;
    const navItems = [
        <span className={style.linkSpan}> <NavLink className={style.link} to="/profile/24394"> <PersonIcon className={style.linkIcon}/> Profile</NavLink> </span> ,
        <span className={style.linkSpan}> <NavLink className={style.link} to="/dialogs"> <SendIcon className={style.linkIcon}/> Dialogs</NavLink> </span> ,
        <span className={style.linkSpan}> <NavLink className={style.link} to="/users"> <PeopleIcon className={style.linkIcon}/> Find user</NavLink> </span>,
        <span> {isAuth_ ?  <button onClick={logoutThunk_} className={style.logout_btn}> {login_} - <LogoutIcon className={style.logout_icon}/> </button> : <NavLink className={style.link} to={'/Login'}> Login </NavLink>} </span>
    ]

    useEffect( () => {
        loginThunk_().then(r => r)
    }, [loginThunk_, isAuth_]);


    const { window } = props;
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Divider />
            <List>
                {navItems.map((item) => (
                    // @ts-ignore
                    <ListItem key={uniqid()} disablePadding>
                        <ListItemButton sx={{ textAlign: 'center' }}>
                            <ListItemText className={style.link} primary={item} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box  className={style.header} sx={{ display: 'flex' }}>
            <ThemeProvider theme={theme}>
                <AppBar color={'secondary'} component="nav">
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2, display: { sm: 'none' } }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                            {navItems.map((item) => (
                                // @ts-ignore
                                <Button key={uniqid()} sx={{ color: '#fff' }}>
                                    {item}
                                </Button>
                            ))}
                        </Box>
                    </Toolbar>
                </AppBar>
            </ThemeProvider>
            <Box component="nav">
                <Drawer
                    color={'secondary'}
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>
            <div className={style.login_btn}>
            </div>
        </Box>
    )

    // return <header className={style.header}>
    //         {/*<img src={logo} alt={'logo'} className={style.logo}/>*/}
    //         <div className={style.login_btn}>
    //             { isAuth_
    //                 ? <div> {login_} - <button onClick={logoutThunk_} className={style.logout_btn}> <img className={style.logout_icon} src={logout} alt={'logout'}/> </button></div>
    //                 : <NavLink to={'/Login'}> Login </NavLink> }
    //         </div>
    //     </header>
}


export default Header;