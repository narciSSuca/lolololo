import React,{Fragment} from 'react';
import { NavLink } from 'react-router-dom';
import './form.scss';

export const Navbar = () => {


    return (
        <nav  className="navbar navbar-dark navbar-expand-lg bg-primary">
            <div className="navbar-brand">
                Андромеда
               {/* <img src='logoClinik.png'/> */}
            </div>

            <ul className="navbar-nav">
                <li className="nav-item">
                    <NavLink
                        className="nav-link"
                        to="/home"
                    >
                        Главная
                    </NavLink>
                    
                </li>

                <li className="nav-item">
                    <NavLink
                        className="nav-link"
                        to="/home"
                    >
                        Поликлиники
                    </NavLink>
                    
                </li>

                <li className="nav-item">
                    <NavLink
                        className="nav-link"
                        to="/visits"
                    >
                        Мои посещения
                    </NavLink>
                    
                </li>


                <li className="nav-item">
                    <NavLink
                        className="nav-link"
                        to="/home"
                    >
                        ЭМК
                    </NavLink>
                    
                </li>


                <li className="nav-item">
                    <NavLink
                        className="nav-link"
                        to="/me"
                    >
                        Профиль
                    </NavLink>
                    
                </li>


                <li className="nav-item">
                    <NavLink
                        className="nav-link"
                        to="/home"
                    >
                        Уведомления
                    </NavLink>
                    
                </li>


                <li className="nav-item">
                    <NavLink
                        className="nav-link"
                        to="/home"
                    >
                        Вопросы по приложению
                    </NavLink>
                    
                </li>
        </ul>
        </nav>
        )
}