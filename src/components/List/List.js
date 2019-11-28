import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
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

    const [ value, setValue ] = useState();

    const dataRef = myFirebase.database().ref('items');

    const handleChangeSelect = e => {
        e.preventDefault();
        setSelect({
            ...select,
            chooseValue: e.target.value
        })
    }

    const handleAddForklift = event => {
        event.preventDefault();
        try {
            dataRef.push({
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
    }

    const handleChangeValue = event => {
        event.preventDefault();
        setValue({
            ...value,
            obj: {                
                [event.target.name]: event.target.value
            }
        })
    }

    const saveEditValue = () => {
        myFirebase.database().ref(`items/${value.id}`).update({
            capacity: value.obj.capacity
        });
    }

    function editProduct(id, obj) {
        setValue({id, obj})
    }

    useEffect(() => {
        const fetchUsers = () => {
            try {
                setData({
                    products: data.products,
                    isFetching: true
                })

                dataRef.on('value', snapshot => {
                    setData({
                        products: snapshot.val(),
                        isFetching: false
                    })
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

    const filterList = newFilter => {
        if(newFilter) {
            setData({
                products: Object.values(data.products).filter(key => key.power && key.power.toLowerCase().search(newFilter.toLowerCase()) !== -1)
            })
        } else {
            dataRef.on('value', snapshot => {
                setData({
                    products: snapshot.val()
                })
            })
        }
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
                        <form onSubmit={handleAddForklift}>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="model">Model:</label>
                                    <input 
                                        type="text"
                                        placeholder="Model"
                                        className="form-control"
                                        name="model"
                                        required
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
                                    type="submit"
                                    className="btn btn-primary">
                                    Add Forklift
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className={`${select.chooseValue === 'spare_parts' ? 'd-block' : 'd-none'}`}>
                        <form>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="model">Model:</label>
                                    <input 
                                        type="text"
                                        name="model"
                                        required
                                        placeholder="Model"
                                        className="form-control" />
                                </div>

                                <div className="form-group col-md-6">
                                    <label htmlFor="producer">Producer:</label>
                                    <input 
                                        type="text"
                                        name="producer"
                                        placeholder="Producer"
                                        className="form-control"/>
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="description">Detail information:</label>
                                <textarea 
                                    type="text"
                                    name="description"
                                    placeholder="Detail information"
                                    className="form-control">
                                </textarea>
                            </div>

                            <div className="d-flex justify-content-start">
                                <button
                                    type="submit"
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
                        <input type="text" placeholder="Filter by type" className="form-control" onChange={e => filterList(e.target.value)}/>
                    </form>
                </div>

                {value ? (
                    <React.Fragment>
                    { Object.keys(value.obj).map((item, i) => (
                        <div key={i}>
                            <input type="text" name={item} value={value.obj[item]} onChange={handleChangeValue} />
                        </div>
                    ))}
                    
                    <button type="submit" onClick={saveEditValue}>Save Changes</button>

                    </React.Fragment>                 
                ) : null}

                <ul className="Product_list">
                    {data.products ? (
                        Object.keys(data.products).map((key) => {
                            return (
                                <li key={key} className="d-flex flex-row align-items-center justify-content-between"> 
                                    <div className="Product_list__information">
                                        <span>{data.products[key].title || data.products[key].model}</span>
                                        {data.products[key].capacity ? <p><strong>Capacity, kg:</strong> {data.products[key].capacity}</p> : ''}
                                        {data.products[key].power ? <p><strong>Power type:</strong> {data.products[key].power}</p> : ''}
                                        {data.products[key].transmision ? <p><strong>Type of transmision:</strong> {data.products[key].transmision}</p> : ''}
                                        {data.products[key].lift_height ? <p><strong>Lift height, mm:</strong> {data.products[key].lift_height}</p> : ''}
                                        {data.products[key].free_lift ? <p><strong>Free lift (+/-), mm:</strong> {data.products[key].free_lift}</p> : ''}
                                        {data.products[key].tyres ? <p><strong>Tyres type:</strong> {data.products[key].tyres}</p> : ''}
                                        {data.products[key].fork ? <p><strong>Fork, mm:</strong> {data.products[key].fork}</p> : ''}
                                        {data.products[key].description ? <p><strong>Detail information: </strong> {data.products[key].description}</p> : ''}
                                    </div>

                                    {props.currentUser ? (
                                        <div className="d-flex flex-row btn-container">
                                            <button 
                                                type="button" 
                                                className="btn btn-primary"
                                                onClick={() => editProduct(key, data.products[key])}>
                                                    Edit
                                            </button>

                                            <button 
                                                type="button" 
                                                className="btn btn-primary delete-btn"
                                                onClick={() => deleteProduct(key)}>
                                                    Delete
                                            </button>
                                        </div>
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