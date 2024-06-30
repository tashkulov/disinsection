import React from 'react';
import { Link } from 'react-router-dom';
import Button from "../Button/Button.jsx";
import { useTelegram } from "../../hooks/useTelegram.js";
import './Header.css';

const Header = () => {
    const { user, onClose } = useTelegram();

    return (
        <header className={'header'}>
            <nav className={'nav'}>
                <Link to="/my-masters" className="nav-link">
                    <Button>Мои мастера</Button>
                </Link>
                <Link to="/my-cities" className="nav-link">
                    <Button>Мои города</Button>
                </Link>
                <Link to="/unclaimed-orders" className="nav-link">
                    <Button>Не взятые заказы</Button>
                </Link>
                <Link to="/orders-in-progress" className="nav-link">
                    <Button>Заказы в работе</Button>
                </Link>
            </nav>
            <div className={'user-controls'}>
                <span className={'username'}>
                    {user?.username}
                </span>
                <Button onClick={onClose}>Закрыть</Button>
            </div>
        </header>
    );
};

export default Header;
