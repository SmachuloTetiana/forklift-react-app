import React from 'react';
import { connect } from 'react-redux';

const Home = ({ currentUser }) => {
    console.log(currentUser)
    return (
        <div className="container">
            <h1>Home</h1>
            {
                currentUser ? (
                    <p>You are logged in as {currentUser.user.email}</p>
                ) : (
                    <p>You are logged out, please sign in.</p>
                )
            }
        </div>
    )
}

const mapStateToProps = state => ({
    currentUser: state.auth.currentUser
});

export default connect(mapStateToProps)(Home);