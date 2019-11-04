import React from 'react';
import logo from '../../images/logo.gif';
import { NavLink } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { myFirebase } from '../../firebase';
import { setCurrentUser } from '../../actions';

const Navbar = ({ currentUser }) => {

    const dispatch = useDispatch();
    const handleSignOut = () => {
        myFirebase
            .auth()
            .signOut()
            .then(() => {
                dispatch(setCurrentUser())
            })
    }

    return (
        <nav className="navbar navbar-expand-sm bg-light navbar-light">
            <a className="navbar-brand" href="/">
                <img src={logo} width="100" className="logo" alt="logo" />
                <span>Mikro-F</span>
            </a>

            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="collapsibleNavbar">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <NavLink activeClassName="active" className="nav-link" exact to='/'>Home</NavLink>
                    </li>
                    {
                        currentUser ? (
                            <button type="button" className="btn btn-primary" onClick={handleSignOut}>Sign Out</button>
                        ) : (                            
                            <li className="nav-item">
                                <NavLink activeClassName="active" className="nav-link" to="/sign-in">Sign In</NavLink>
                            </li>
                        )
                    }
                    <li className="nav-item">
                        <NavLink activeClassName="active" className="nav-link" exact to='/list'>List</NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

const mapStateToProps = state => ({
    currentUser: state.auth.currentUser
});

export default connect(mapStateToProps)(Navbar);