import React, { useEffect, useState } from 'react';
import { ModalForm } from '../../components/List/Modal';
import { database } from '../../firebase';

const List = ({ currentUser, items, setItems }) => {
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
        producer: ''
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

    const handleChangeSelect = event => {
        event.preventDefault();
        setSelect({
            ...select,
            chooseValue: event.target.value
        })
    }

    const handleAddForklift = event => {
        event.preventDefault();
        database.ref('forklift').push({
            model: product.model,
            capacity: product.capacity,
            power: product.power,
            transmision: product.transmision,
            lift_height: product.lift_height,
            free_lift: product.free_lift,
            tyres: product.tyres,
            fork: product.fork,
            description: product.description
        });
        resetFormFields();
    }

    const handleAddSparePart = event => {
        event.preventDefault();
        try {
            database.ref('spare_part').push({
                model: product.model,
                producer: product.producer,
                description: product.description
            })
            resetFormFields();
        } catch (e) {
            // TODO: it would be great if in case of error there will be some notification for user
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

    const resetFormFields = () => {
        setProduct({
            model: '',
            capacity: '',
            power: '',
            transmision: '',
            lift_height: '',
            free_lift: '',
            tyres: '',
            fork: '',
            description: '',
            producer: ''
        })
    }

    useEffect(() => {
        database.ref('/').on('value', snapshot => {                 
            setItems(snapshot.val())
        })
    }, []);
    
    const deleteItem = (child, id) => {
        database.ref(`${child}/${id}`).remove();
    }

    const [modal, setModal] = useState({
        modalIsOpen: false,
        data: {}
    });

    const handleChangeModalValue = event => {
        event.preventDefault();
        setModal({
            ...modal,
            data: {
                ...modal.data,
                [event.target.name]: event.target.value
            }
        })
    }

    const editItem = (db, id, value) => {
        setModal({
            modalIsOpen: true,
            dbName: db,
            dbId: id,
            data: value
        });
    }

    const saveModalValue = event => {
        event.preventDefault();
        database.ref(`${modal.dbName}/${modal.dbId}`).update(modal.data);
        closeModal();
    }

    function closeModal() {
        setModal({
            modalIsOpen: false
        })
    }

    const filterItems = event => {
        Object.keys(items).map(dbKey => (
            Object.keys(items[dbKey]).map(data => (
                Object.values(items[dbKey][data]).filter(i => i.toLowerCase().search(event.toLowerCase()) !== -1)                
            ))
        ))
    }

    return (
        <div className="container">
            <div className="Items-list">

                {currentUser ? (
                
                <div>
                    <h4>You are logged in as {currentUser.email}. Now you can add some products of this list!</h4>

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
                        <form onSubmit={handleAddSparePart}>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="model">Model:</label>
                                    <input 
                                        type="text"
                                        name="model"
                                        required
                                        value={product.model}
                                        onChange={handleChangeInput}
                                        placeholder="Model"
                                        className="form-control" />
                                </div>

                                <div className="form-group col-md-6">
                                    <label htmlFor="producer">Producer:</label>
                                    <input 
                                        type="text"
                                        name="producer"
                                        value={product.producer}
                                        onChange={handleChangeInput}
                                        placeholder="Producer"
                                        className="form-control"/>
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="description">Detail information:</label>
                                <textarea 
                                    type="text"
                                    name="description"
                                    value={product.description}
                                    onChange={handleChangeInput}
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
                        <input 
                            type="text" 
                            placeholder="Search" 
                            className="form-control" 
                            onChange={(e) => filterItems(e.target.value)}/>
                    </form>
                </div>

                {
                    modal.modalIsOpen ? <ModalForm valueModal={modal} close={closeModal} save={saveModalValue} change={handleChangeModalValue} /> : null
                }

                <ul className="Product_list">
                    {items ?
                        Object.entries(items).map(([child, value]) => (                            
                            Object.keys(value).map(key => (
                                <li key={key} className="d-flex flex-row align-items-center justify-content-between"> 
                                    <div className="Product_list__information">
                                        <span>{value[key].title || value[key].model}</span>
                                        {value[key].capacity ? <p><strong>Capacity, kg:</strong> {value[key].capacity}</p> : ''}
                                        {value[key].power ? <p><strong>Power type:</strong> {value[key].power}</p> : ''}
                                        {value[key].transmision ? <p><strong>Type of transmision:</strong> {value[key].transmision}</p> : ''}
                                        {value[key].lift_height ? <p><strong>Lift height, mm:</strong> {value[key].lift_height}</p> : ''}
                                        {value[key].free_lift ? <p><strong>Free lift (+/-), mm:</strong> {value[key].free_lift}</p> : ''}
                                        {value[key].tyres ? <p><strong>Tyres type:</strong> {value[key].tyres}</p> : ''}
                                        {value[key].fork ? <p><strong>Fork, mm:</strong> {value[key].fork}</p> : ''}
                                        {value[key].producer ? <p><strong>Producer:</strong> {value[key].producer}</p> : ''}
                                        {value[key].description ? <p><strong>Detail information: </strong> {value[key].description}</p> : ''}
                                    </div>

                                    {currentUser ? (
                                        <div className="d-flex flex-row btn-container">
                                            <button 
                                                type="button" 
                                                className="btn btn-primary"
                                                onClick={() => editItem(child, key, value[key])}>
                                                    Edit
                                            </button>

                                            <button 
                                                type="button" 
                                                className="btn btn-primary delete-btn"
                                                onClick={() => deleteItem(child, key)}>
                                                    Delete
                                            </button>
                                        </div>
                                    ) : null}
                                </li>
                            ))
                        )) : null
                    }
                </ul>
            </div>
        </div>
    )
}

export default List;