import head from './Header.module.css'
const Header = () => {
    return(
        <header className={head.header}>
            <img className={head.header_img} src="https://i.yapx.ru/RSn1U.png" alt={"logo"}/>
        </header>
    );
}

export default Header;