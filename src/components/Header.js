import react from "react";
import './Header.css';

export default ({black}) =>{
    return(
        <header className={black ? 'black' : ''}>
            <div className='header--logo'>
                <a href='/'>
                    <img src='https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg'/>
                </a>
            </div>
            <div className='header--user'>
                <a href='/'>
                    <img src='https://i.pinimg.com/originals/1b/71/b8/1b71b85dd741ad27bffa5c834a7ed797.png'/>
                </a>
            </div>
        </header>
    );
}