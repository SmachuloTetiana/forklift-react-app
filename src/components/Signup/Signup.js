import React, { useState } from 'react';
import { connect } from 'react-redux';
import { setRegisterUser } from '../../actions';
import { authRef } from '../../firebase';

const Signup = () => {
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

    const handleValidation = () => {
        const {name, email, password, confirmPassword} = user;
        let error = {};
        let formIsValid = true;

        if(!name.length || name.length < 3) {
            formIsValid = false;
            error['name'] = "Name field cannot be empty and must at least 3 characters";
        }
        if(!/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email)) {
            formIsValid = false;
            error['email'] = "Please provide a valid email address";
        }
        if(password.length < 6) {
            formIsValid = false;
            error['password'] = "Password must be at least 6 characters";
        }
        if(confirmPassword !== password) {
            formIsValid = false;
            error['confirmPassword'] = "Password & Confirm Password don't match";
        }

        setUser({
            ...user,
            error: error
        })

        return formIsValid;
    }

    const handleSignUp = event => {
        event.preventDefault();

        try {
            if(handleValidation()){
                const {email, password} = user;
                const response = authRef.createUserWithEmailAndPassword(email, password);
                
                setRegisterUser(response);
                console.log('validation successful')   
            }        

        } catch (e) {
            setUser({error: e.message})
            console.log('validation failed')
        }
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
                    <h1 className="title text-center">Sign Up</h1>

                    <form>
                        <div className="form-group">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Name"
                                name="name"
                                value={user.name}
                                onChange={handleChange}
                                required />
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
                                required />
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
                            {user.error.password ? <p className="Error-message">{user.error.password}</p> : ''}
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
                            {user.error.confirmPassword ? <p className="Error-message">{user.error.confirmPassword}</p> : ''}
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

const mapDispatchToProps = dispatch => ({
    setRegisterUser: () => dispatch(setRegisterUser())
})

export default connect(mapStateToProps, mapDispatchToProps)(Signup);