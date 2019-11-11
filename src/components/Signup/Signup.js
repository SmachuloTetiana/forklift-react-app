import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { myFirebase } from '../../firebase';
import { setRegisterUser } from '../../actions';

const Signup = () => {
    const dispatch = useDispatch();
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        error: {}
    });

    const handleChange = event => {
        event.preventDefault();
        setUser({
            ...user,
            [event.target.name]: event.target.value
        })
    }

    const validate = (e) => {
        e.preventDefault();
        const {name, value} = e.target;
        switch (name) {
            case 'name':
                user.error.name = value.length < 3 && value.length > 0 ? 'Enter your name!' : '';
                break;            
            case 'email':
                user.error.email = !value.includes('@') ? 'The email address is badly formatted.' : '';
                break;
            default:
                break;
        }

        setUser({
            ...user,
            error: {
                name: user.error.name,
                email: user.error.email
            }
        })
    }

    const handleSignUp = event => {
        event.preventDefault();
        const {email, password} = user;
        myFirebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(resp => {
                dispatch(setRegisterUser(resp));
                console.log('Account created')
            })
            .catch(e => {
                setUser({error: e.message})
            })
    }

    return (
        <div className="container Account">
            <div className="row">                
                <div className="col-md-6 col-12 account-welcome-block">
                    <div className="account-welcome-block__container text-center">
                        <h1 className="title">Welcome!</h1>
                        <p className="subtitle">Enter your personal details and start journey with us...</p>
                    </div>
                </div>

                <div className="col-md-6 col-12">
                    <form>
                        <h1 className="title text-center">Sign Up</h1>
                        <div className="form-group">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Name"
                                name="name"
                                value={user.name}
                                onChange={handleChange}
                                onBlur={validate} />
                            {user.error.name ? <p className="Error-message">{user.error.name}</p> : ''}
                        </div>
                        <div className="form-group">
                            <input 
                                type="email"
                                className="form-control"
                                placeholder="Email"
                                name="email"
                                value={user.email}
                                onChange={handleChange}
                                onBlur={validate} />
                            {user.error.email ? <p className="Error-message">{user.error.email}</p> : ''}
                        </div>
                        <div className="form-group">
                            <input 
                                type="password"
                                placeholder="Password"
                                className="form-control"
                                name="password"
                                required
                                value={user.password}
                                onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <input 
                                type="password"
                                placeholder="Confirm Password"
                                className="form-control"
                                name="confirmPassword"
                                required
                                value={user.confirmPassword}
                                onChange={handleChange} />
                            {/* {user.error ? <p className="Error-message">{user.error}</p> : null} */}
                        </div>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handleSignUp}>
                                Sign Up
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    registerUser: state.auth.registerUser
})

export default connect(mapStateToProps)(Signup);