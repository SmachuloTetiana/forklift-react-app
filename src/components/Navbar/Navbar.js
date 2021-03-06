import React from 'react';
import logo from 'images/logo.gif';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { setCurrentUser } from 'store/actions';
import { authRef } from '../../firebase';

const Navbar = props => {
    const handleSignOut = () => {
        authRef.signOut().then(() => {
            props.setCurrentUser(null)
        })
    }

    return (
        <nav className="navbar navbar-expand-sm bg-light navbar-light">
            <a className="navbar-brand" href="/">
                <img src={logo} width="100" className="logo" alt="logo" />
                <span>Mikro-F</span>
            </a>

            <button 
                className="navbar-toggler" 
                type="button" 
                data-toggle="collapse" 
                data-target="#collapsibleNavbar">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="collapsibleNavbar">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <NavLink activeClassName="active" className="nav-link" exact to='/'>Home</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink activeClassName="active" className="nav-link" exact to='/list'>List</NavLink>
                    </li>
                    {
                        !props.currentUser ? (
                            <React.Fragment>                      
                                <li className="nav-item">
                                    <NavLink activeClassName="active" className="nav-link" to="/sign-in">Sign In</NavLink>
                                </li>     

                                <li className="nav-item">
                                    <NavLink activeClassName="active" className="nav-link" to="/sign-up">Sign Up</NavLink>
                                </li>
                            </React.Fragment>   
                        ) : (   
                            <button 
                                type="button" 
                                className="btn btn-primary signOutBtn ml-auto" 
                                onClick={handleSignOut}>
                                    Sign Out
                            </button>
                        )
                    }  
                </ul>
            </div>
        </nav>
    )
}

const mapStateToProps = state => ({
    currentUser: state.auth.currentUser
});

const mapDispatchToProps = dispatch => ({
    setCurrentUser: () => dispatch(setCurrentUser())
})

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);