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

    const [select, setSelect] = useState({
        options: [
            {
                value: 'forklift',
                label: 'Forklift'
            }, 
            {
                value: 'spare parts',
                label: 'Spare Parts'
            }
        ],
        chooseValue: ''
    })

    const handleChangeSelect = e => {
        e.preventDefault();
        setSelect({
            ...select,
            chooseValue: e.target.value
        })
    }
    console.log(select);

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
                const response = await axios.get('https://forklift-bb1ea.firebaseio.com/items.json');
                setData({
                    users: response.data,
                    isFetching: false
                })
                console.log(response.data);
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
    }, []);

    return (
        <div className="container">
            <div className="Items-list">

                <div className="form-group">
                    <label className="col-form-label">Choose type of product:</label>
                    <select className="form-control" onChange={handleChangeSelect}>
                        {
                            select.options.map((item, key) => (
                                <option value={item.value} key={key}>
                                    {item.label}
                                </option>
                            ))
                        }
                    </select>
                </div>

                {
                    !props.currentUser ? (
                        <div className={`${select.chooseValue === 'forklift' ? 'd-block' : 'd-none'}`}>
                            {/* <p>You are logged in as {props.currentUser.user.email}. Now you can add some products of this list!</p> */}
                            <form>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="title">Model:</label>
                                        <input 
                                            type="text"
                                            placeholder="Enter Model"
                                            className="form-control"
                                            name="model"
                                            value={product.title}
                                            onChange={handleChangeInput} />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="title">Capacity, kg:</label>
                                        <input 
                                            type="text"
                                            placeholder="Enter Capacity"
                                            className="form-control"
                                            name="capacity"
                                            value={product.title}
                                            onChange={handleChangeInput} />
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="title">Power Type:</label>
                                        <input 
                                            type="text"
                                            placeholder="Power Type"
                                            className="form-control"
                                            name="power"
                                            value={product.title}
                                            onChange={handleChangeInput} />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="title">Type of transmision:</label>
                                        <input 
                                            type="text"
                                            placeholder="Type of transmision"
                                            className="form-control"
                                            name="transmision"
                                            value={product.title}
                                            onChange={handleChangeInput} />
                                    </div>
                                </div>

                                <div className="form-row">                                
                                    <div className="form-group col-md-6">
                                        <label htmlFor="title">Lift height, mm:</label>
                                        <input 
                                            type="text"
                                            placeholder="Lift height"
                                            className="form-control"
                                            name="lift_height"
                                            value={product.title}
                                            onChange={handleChangeInput} />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="title">Free lift (+/-), mm:</label>
                                        <input 
                                            type="text"
                                            placeholder="Free lift"
                                            className="form-control"
                                            name="free_lift"
                                            value={product.title}
                                            onChange={handleChangeInput} />
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="title">Tyres type:</label>
                                        <input 
                                            type="text"
                                            placeholder="Tyres type"
                                            className="form-control"
                                            name="tyres"
                                            value={product.title}
                                            onChange={handleChangeInput} />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="title">Fork, mm:</label>
                                        <input 
                                            type="text"
                                            placeholder="Fork"
                                            className="form-control"
                                            name="fork"
                                            value={product.title}
                                            onChange={handleChangeInput} />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="description">Detail information:</label>
                                    <textarea 
                                        type="text"
                                        placeholder="Detail information"
                                        className="form-control"
                                        name="description"
                                        value={product.description}
                                        onChange={handleChangeInput}>
                                    </textarea>
                                </div>

                                <div className="d-flex justify-content-start">
                                    <button
                                        type="button"
                                        className="btn btn-primary">
                                        Add product
                                    </button>
                                </div>
                            </form>
                        </div>
                    ) : (
                        <p>You are logged out, please sign in to add some products.</p>
                    )
                }

                <h2 className="title text-center" style={{marginTop: '50px', marginBottom: '30px'}}>Forklifts of own production</h2>

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