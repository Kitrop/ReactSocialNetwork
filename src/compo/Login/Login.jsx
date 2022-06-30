const Login = (props) => {
    return (
        <div>
            <h1>Login</h1>
            <LoginForm />
        </div>
    )
}

const LoginForm = (props) => {
    return (
        <form>
            <div> <input placeholder="login" type={'text'}/> </div>
            <div> <input placeholder="password" type={'password'}/> </div>
            <div> <input placeholder="remember" type={'checkbox'}/> </div>
            <div> <button> ACCEPT </button> </div>
        </form>
    )
}

export default Login;