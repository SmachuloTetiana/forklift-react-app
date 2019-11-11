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
                {
                    !props.currentUser ? (
                        <div>
                            {/* <p>You are logged in as {props.currentUser.user.email}. Now you can add some products of this list!</p> */}
                            <form>
                                <div className="form-group row">
                                    <label htmlFor="title" className="col-md-3">Name</label>
                                    <input 
                                        type="text"
                                        placeholder="Enter Name"
                                        className="form-control col-md-9"
                                        name="title"
                                        value={product.title}
                                        onChange={handleChangeInput} />
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="title" className="col-md-3">Вантажопідйомність, кг</label>
                                    <input 
                                        type="text"
                                        placeholder="Enter Name"
                                        className="form-control col-md-9"
                                        name="title"
                                        value={product.title}
                                        onChange={handleChangeInput} />
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="title" className="col-md-3">Тип двигуна</label>
                                    <input 
                                        type="text"
                                        placeholder="Enter Name"
                                        className="form-control col-md-9"
                                        name="title"
                                        value={product.title}
                                        onChange={handleChangeInput} />
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="title" className="col-md-3">Тип трансмісії</label>
                                    <input 
                                        type="text"
                                        placeholder="Enter Name"
                                        className="form-control col-md-9"
                                        name="title"
                                        value={product.title}
                                        onChange={handleChangeInput} />
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="title" className="col-md-3">Висота підйому, мм</label>
                                    <input 
                                        type="text"
                                        placeholder="Enter Name"
                                        className="form-control col-md-9"
                                        name="title"
                                        value={product.title}
                                        onChange={handleChangeInput} />
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="title" className="col-md-3">Вільний хід (+/-), мм</label>
                                    <input 
                                        type="text"
                                        placeholder="Enter Name"
                                        className="form-control col-md-9"
                                        name="title"
                                        value={product.title}
                                        onChange={handleChangeInput} />
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="title" className="col-md-3">Тип шин</label>
                                    <input 
                                        type="text"
                                        placeholder="Enter Name"
                                        className="form-control col-md-9"
                                        name="title"
                                        value={product.title}
                                        onChange={handleChangeInput} />
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="title" className="col-md-3">Довжина вил, мм</label>
                                    <input 
                                        type="text"
                                        placeholder="Enter Name"
                                        className="form-control col-md-9"
                                        name="title"
                                        value={product.title}
                                        onChange={handleChangeInput} />
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="description" className="col-md-3">Description</label>
                                    <textarea 
                                        type="text"
                                        placeholder="Enter Description"
                                        className="form-control col-md-9"
                                        name="description"
                                        value={product.description}
                                        onChange={handleChangeInput}>
                                    </textarea>
                                </div>
                                <button
                                    style={{'marginBottom': '50px'}}
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

                <h2 className="title text-center">Навантажувачі власного виробництва</h2>

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
    currentUser: state.auth.currentUser
});

export default connect(mapStateToProps)(List);