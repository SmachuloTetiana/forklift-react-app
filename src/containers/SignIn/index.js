import { connect } from 'react-redux';
import { setCurrentUser } from 'store/actions';
import SignIn from './SignIn';

const mapStateToProps = state => ({
    currentUser: state.auth.currentUser
});

const mapDispatchToProps = dispatch => ({
    setCurrentUser: (currentUser) => dispatch(setCurrentUser(currentUser))
})

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);