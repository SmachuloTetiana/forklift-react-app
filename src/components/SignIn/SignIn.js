import React, { useState } from 'react';
import { connect } from 'react-redux';
import { setCurrentUser } from 'store/actions';
import { Redirect } from 'react-router-dom';
import { authRef } from 'firebase';


const SignIn = (props) => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [redirect, setRedirect] = useState();
    const [error, setError] = useState();
    
    const handleSignIn = async event => {
        event.preventDefault();
        try {
            const user = await authRef.signInWithEmailAndPassword(email, password);
            props.setCurrentUser(user);
            setRedirect({
                redirect: true
            })     
        } catch (e){
            setError(e.message)
        }
            
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
                    <form onSubmit={handleSignIn}>
                        <h1 className="title text-center">Sign In</h1>
                        <div className="form-group">
                            <label htmlFor="email">E-mail</label>
                            <input 
                                type="email"
                                className="form-control"
                                placeholder="Email"
                                name="email"
                                value={email || ''}
                                required
                                onChange={event => setEmail(event.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input 
                                type="password"
                                placeholder="Password"
                                name="password"
                                className="form-control"
                                value={password || ''}
                                required
                                onChange={event => setPassword(event.target.value)} />
                        </div>
                        
                        {error ? <p className="Error-message">{error}</p> : ''}

                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={!email || !password}>
                                SignIn
                        </button>
                        <a href="/sign-up">Don't have an account yet? Sign up</a>
                    </form>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    currentUser: state.auth.currentUser
});

const mapDispatchToProps = dispatch => ({
    setCurrentUser: (currentUser) => dispatch(setCurrentUser(currentUser))
})

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);