import React, {useContext} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";

function Nav() {

    const {isAuth, logout} = useContext(AuthContext);
    console.log(isAuth)

    const navigate = useNavigate();

    function handleLogout() {
        logout()
    }


    return (
        <nav className="navbar">
            <ul>
                <li><NavLink to="/" className={ ( { isActive } ) => isActive ? "link--active" : "link" }>Home</NavLink></li>
                <button type="button" onClick={() => navigate('/admin')}>Admin</button>

            </ul>
            <ul>
                { isAuth ?
                    <div>
                        <li><NavLink to="/products" className={ ( { isActive } ) => isActive ? "link--active" : "link" }>Products</NavLink></li>
                        <li><NavLink to="/tickets" className={ ( { isActive } ) => isActive ? "link--active" : "link" }>Tickets</NavLink></li>
                        <button type="button" onClick={() => navigate('/account')}>Account</button>
                        <button type="button" onClick={handleLogout}>Logout</button>
                    </div>
                    :
                    <>
                        <button type="button" onClick={() => navigate('/registration')}>Registration</button>
                    </>
                }
            </ul>
        </nav>
    );
}

export default Nav;