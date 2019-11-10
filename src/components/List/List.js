import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

const List = (props) => {
    const [data, setData] = useState({
        users: {},
        isFetching: false
    });
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

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setData({
                    users: data.users,
                    isFetching: true
                })
                const responce = await axios.get('https://forklift-bb1ea.firebaseio.com/items.json');
                setData({
                    users: responce.data,
                    isFetching: false
                })
                console.log(responce.data);
            }
            catch (e) {
                console.log(e);
                setData({
                    users: data.users,
                    isFetching: false
                })
            }
        }
        fetchUsers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="container">
            <div className="Items-list">
                <h2 className="title text-center">Навантажувачі власного виробництва</h2>
                {
                    props.currentUser ? (
                        <div>
                            <p>You are logged in as {props.currentUser.user.email}. Now you can add some products of this list!</p>
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
                    className="btn btn-primary">
                        Get List
                </button>
                <ul>
                    {
                        Object.keys(data.users).map((el, index) => {
                            return (
                                <li key={index}> 
                                    <span>{data.users[el].title}</span>
                                    <p>{data.users[el].description}</p>
                                </li>
                            )
                        })
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