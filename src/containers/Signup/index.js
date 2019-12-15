import { connect } from 'react-redux';
import { setRegisterUser } from 'store/actions';
import Signup from './Signup';

const mapStateToProps = state => ({
    registerUser: state.auth.registerUser
})

const mapDispatchToProps = dispatch => ({
    setRegisterUser: (registerUser) => dispatch(setRegisterUser(registerUser))
})

export default connect(mapStateToProps, mapDispatchToProps)(Signup);