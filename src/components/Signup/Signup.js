import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { myFirebase } from '../../firebase';
import { setRegisterUser } from '../../actions';

const Signup = () => {
    const dispatch = useDispatch();
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleChange = event => {
        event.preventDefault();
        setUser({
            ...user,
            [event.target.name]: event.target.value
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
            .catch(error => {
                dispatch(setRegisterUser(error))
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
                        <h1 className="title text-center">Signup</h1>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Name"
                                name="name"
                                value={user.name}
                                onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">E-mail</label>
                            <input 
                                type="email"
                                className="form-control"
                                placeholder="Email"
                                name="email"
                                value={user.email}
                                onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input 
                                type="password"
                                placeholder="Password"
                                className="form-control"
                                name="password"
                                value={user.password}
                                onChange={handleChange} />
                        </div>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handleSignUp}>
                                Signup
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