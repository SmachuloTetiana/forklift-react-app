import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { myFirebase } from '../../firebase';
import { getForklift } from '../../actions';

const List = ({ currentUser, item }) => {
    const dispatch = useDispatch();
    const [product, setProduct] = useState({
        title: '',
        description: ''
    });

    const handleChangeInput = event => {
        event.preventDefault();
        setProduct({
            [event.target.name]: event.target.value
        })
    }

    const getForkliftsList = () => {
        myFirebase.database().ref('items')
            .on('value', snap => {
                dispatch(getForklift(snap.val()));
                setProduct(snap.val())
            });
    }
    

    return (
        <div className="container">
            <div className="Items-list">
                <h2 className="title text-center">Навантажувачі власного виробництва</h2>
                {
                    currentUser ? (
                        <div>
                            <p>You are logged in as {currentUser.user.email}. Now you can add some products of this list!</p>
                            <form>
                                <div className="form-group">
                                    <label htmlFor="title">Title</label>
                                    <input 
                                        type="text"
                                        placeholder="Enter ttitle"
                                        className="form-control"
                                        name="title"
                                        value={product.title}
                                        onChange={handleChangeInput} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="description">Description</label>
                                    <textarea 
                                        type="text"
                                        placeholder="Enter description"
                                        className="form-control"
                                        name="description"
                                        value={product.description}
                                        onChange={handleChangeInput}>
                                    </textarea>
                                </div>
                                <button
                                    type="button"
                                    className="btn btn-primary">
                                    Add product
                                </button>
                            </form>
                        </div>
                    ) : (
                        <p>You are logged out, please sign in to add some products.</p>
                    )
                }
                <button 
                    type="button" 
                    style={{
                        'marginBottom': '15px',
                        'marginTop': '15px'
                    }}
                    className="btn btn-primary"
                    onClick={getForkliftsList}>
                        Get List
                </button>
                <ul>
                    {
                        product.title !== '' && product.description !== '' ? (
                            Object.keys(product).map((el, index) => {
                                return (
                                    <li key={index}> 
                                        <span>{item[el].title}</span>
                                        <p>{item[el].description}</p>
                                    </li>
                                )
                            })
                        ) : null
                    }
                </ul>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    currentUser: state.auth.currentUser,
    item: state.forklift.item
});

export default connect(mapStateToProps)(List);