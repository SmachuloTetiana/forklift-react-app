import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { myFirebase } from '../../firebase';

const List = (props) => {
    const [data, setData] = useState({
        products: {},
        isFetching: false
    });

    const [product, setProduct] = useState({
        model: '',
        capacity: '',
        power: '',
        transmision: '',
        lift_height: '',
        free_lift: '',
        tyres: '',
        fork: '',
        description: '',
    });

    const [select, setSelect] = useState({
        options: [
            {
                value: 'choose_type',
                label: 'Choose type'
            }, 
            {
                value: 'forklift',
                label: 'Forklift'
            }, 
            {
                value: 'spare_parts',
                label: 'Spare Parts'
            }
        ],
        chooseValue: ''
    });

    const itemsRef = myFirebase.database().ref('items');

    const handleChangeSelect = e => {
        e.preventDefault();
        setSelect({
            ...select,
            chooseValue: e.target.value
        })
    }

    const handleAddForklift = async event => {
        event.preventDefault();
        try {
            const itemsRef = await myFirebase.database().ref('items');

            itemsRef.push({
                model: product.model,
                capacity: product.capacity,
                power: product.power,
                transmision: product.transmision,
                lift_height: product.lift_height,
                free_lift: product.free_lift,
                tyres: product.tyres,
                fork: product.fork,
                description: product.description,
            });

            itemsRef.on('value', snapshot => {
                setData({
                    products: snapshot.val()
                })
            });

            console.log('add product successful')
        }
        catch (e) {
            console.log(e.message)
        }
    }

    const handleChangeInput = event => {
        event.preventDefault();
        setProduct({
            ...product,
            [event.target.name]: event.target.value
        })
    }

    function deleteProduct(id) {
        myFirebase.database().ref(`items/${id}`).remove();

        itemsRef.on('value', snapshot => {
            setData({
                products: snapshot.val()
            })
        })
    }

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setData({
                    products: data.products,
                    isFetching: true
                })
                const response = await axios.get('https://forklift-bb1ea.firebaseio.com/items.json');
                setData({
                    products: response.data,
                    isFetching: false
                })
            }
            catch (e) {
                console.log(e);
                setData({
                    products: data.products,
                    isFetching: false
                })
            }
        }
        fetchUsers();
    }, []);

    const filterList = event => {
        event.preventDefault();
        const item = data.products;
        setData({
            products: Object.values(item).filter(key => key.power && key.power.toLowerCase().search(event.target.value.toLowerCase()) !== -1)
        })
        console.log(data.products)
    }

    return (
        <div className="container">
            <div className="Items-list">

                {props.currentUser ? (
                
                <div>
                    <h4>You are logged in as {props.currentUser.email}. Now you can add some products of this list!</h4>

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

                    <div className={`${select.chooseValue === 'forklift' ? 'd-block' : 'd-none'}`}>
                        <form>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="model">Model:</label>
                                    <input 
                                        type="text"
                                        placeholder="Model"
                                        className="form-control"
                                        name="model"
                                        value={product.model}
                                        onChange={handleChangeInput} />
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="capacity">Capacity, kg:</label>
                                    <input 
                                        type="text"
                                        placeholder="Capacity"
                                        className="form-control"
                                        name="capacity"
                                        value={product.capacity}
                                        onChange={handleChangeInput} />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="power">Power Type:</label>
                                    <input 
                                        type="text"
                                        placeholder="Power Type"
                                        className="form-control"
                                        name="power"
                                        value={product.power}
                                        onChange={handleChangeInput} />
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="transmision">Type of transmision:</label>
                                    <input 
                                        type="text"
                                        placeholder="Type of transmision"
                                        className="form-control"
                                        name="transmision"
                                        value={product.transmision}
                                        onChange={handleChangeInput} />
                                </div>
                            </div>

                            <div className="form-row">                                
                                <div className="form-group col-md-6">
                                    <label htmlFor="lift_height">Lift height, mm:</label>
                                    <input 
                                        type="text"
                                        placeholder="Lift height"
                                        className="form-control"
                                        name="lift_height"
                                        value={product.lift_height}
                                        onChange={handleChangeInput} />
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="free_lift">Free lift (+/-), mm:</label>
                                    <input 
                                        type="text"
                                        placeholder="Free lift"
                                        className="form-control"
                                        name="free_lift"
                                        value={product.free_lift}
                                        onChange={handleChangeInput} />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="tyres">Tyres type:</label>
                                    <input 
                                        type="text"
                                        placeholder="Tyres type"
                                        className="form-control"
                                        name="tyres"
                                        value={product.tyres}
                                        onChange={handleChangeInput} />
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="fork">Fork, mm:</label>
                                    <input 
                                        type="text"
                                        placeholder="Fork"
                                        className="form-control"
                                        name="fork"
                                        value={product.fork}
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
                                    className="btn btn-primary"
                                    onClick={handleAddForklift}>
                                    Add Forklift
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className={`${select.chooseValue === 'spare_parts' ? 'd-block' : 'd-none'}`}>
                        <form>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label>Model:</label>
                                    <input 
                                        type="text"
                                        placeholder="Model"
                                        className="form-control" />
                                </div>

                                <div className="form-group col-md-6">
                                    <label>Producer:</label>
                                    <input 
                                        type="text"
                                        placeholder="Producer"
                                        className="form-control"/>
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Detail information:</label>
                                <textarea 
                                    type="text"
                                    placeholder="Detail information"
                                    className="form-control">
                                </textarea>
                            </div>

                            <div className="d-flex justify-content-start">
                                <button
                                    type="button"
                                    className="btn btn-primary">
                                    Add Spare Part
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
                ) : (
                    <h4>You are logged out, please sign in to add some products.</h4>
                )
                }

                <h2 className="title text-center" style={{marginTop: '50px', marginBottom: '30px'}}>Own production forklifts</h2>

                <div className="toolbar">
                    <form>
                        <label>Filter by power type:</label>
                        <input type="text" placeholder="Search" onChange={filterList}/>
                    </form>
                </div>

                <ul className="Product_list">
                    {data.products ? (
                        Object.keys(data.products).map((el, key) => {
                            return (
                                <li key={key} className="d-flex flex-row align-items-center"> 
                                    <div className="Product_list__information">
                                        <span>{data.products[el].title || data.products[el].model}</span>
                                        {data.products[el].capacity ? <p><strong>Capacity, kg:</strong> {data.products[el].capacity}</p> : ''}
                                        {data.products[el].power ? <p><strong>Power type:</strong> {data.products[el].power}</p> : ''}
                                        {data.products[el].transmision ? <p><strong>Type of transmision:</strong> {data.products[el].transmision}</p> : ''}
                                        {data.products[el].lift_height ? <p><strong>Lift height, mm:</strong> {data.products[el].lift_height}</p> : ''}
                                        {data.products[el].free_lift ? <p><strong>Free lift (+/-), mm:</strong> {data.products[el].free_lift}</p> : ''}
                                        {data.products[el].tyres ? <p><strong>Tyres type:</strong> {data.products[el].tyres}</p> : ''}
                                        {data.products[el].fork ? <p><strong>Fork, mm:</strong> {data.products[el].fork}</p> : ''}
                                        {data.products[el].description ? <p><strong>Detail information: </strong> {data.products[el].description}</p> : ''}
                                    </div>

                                    {props.currentUser ? (
                                        <button 
                                            type="button" 
                                            className="btn btn-primary delete-btn"
                                            onClick={() => deleteProduct(el)}>
                                                Delete
                                        </button>
                                    ) : null}
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
    currentUser: state.auth.currentUser
});

export default connect(mapStateToProps)(List);