import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { myFirebase } from '../../firebase';
import { setCurrentUser } from '../../actions';
import { Redirect } from 'react-router-dom';


const SignIn = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [redirect, setRedirect] = useState();
    
    const handleSignIn = event => {
        event.preventDefault();
        myFirebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(user => {
                dispatch(setCurrentUser(user));
                setRedirect({
                    redirect: true
                })
                

            })
            .catch(error => {
                console.log(error)
            })
    }

    if (redirect) {
        return <Redirect to="/list" />;
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
                        <h1 className="title text-center">Sign In</h1>
                        <div className="form-group">
                            <label htmlFor="email">E-mail</label>
                            <input 
                                type="email"
                                className="form-control"
                                placeholder="Email"
                                value={email}
                                onChange={event => setEmail(event.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input 
                                type="password"
                                placeholder="Password"
                                className="form-control"
                                value={password}
                                onChange={event => setPassword(event.target.value)} />
                        </div>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handleSignIn}>SignIn</button>
                        <a href="">Don't have an account yet? Sign up</a>
                    </form>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    currentUser: state.auth.currentUser
});

export default connect(mapStateToProps)(SignIn);