import { connect } from 'react-redux';
import { setItems } from 'store/actions';
import List from './List';

const mapStateToProps = state => ({
    currentUser: state.auth.currentUser,
    items: state.products.items
});

const mapDispatchToProps = dispatch => ({
    setItems: (items) => dispatch(setItems(items))
})

export default connect(mapStateToProps, mapDispatchToProps)(List);