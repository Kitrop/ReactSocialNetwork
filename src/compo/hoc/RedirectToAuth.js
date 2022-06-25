import {Navigate} from "react-router-dom";

export const RedirectToAuth = (Component) => {
    return (props) => {
        if (props.isAuth === false) {
            return <Navigate to={'/login'}/>
        }
        return <Component {...props} />
    };
}
