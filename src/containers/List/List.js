import React, { useEffect, useState } from 'react';
import { ModalForm } from 'components/List/Modal';
import { database } from '../../firebase';
import AddForklift from './AddForklift';
import AddSparePart from './AddSparePart';

const List = ({ currentUser, items, setItems }) => {
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
        if(event) {
            var filterObj = Object.keys(items).reduce((obj, key) => {
                obj[key] = Object.values(items[key]).filter(el => el.power && el.power.toLowerCase().search(event.toLowerCase()) !== -1);
                return obj;
            }, {});
    
            setItems(filterObj)
        } else {
            database.ref('/').on('value', snapshot => {
                setItems(snapshot.val())
            })
        }
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
                        <AddForklift />
                    </div>

                    <div className={`${select.chooseValue === 'spare_parts' ? 'd-block' : 'd-none'}`}>
                        <AddSparePart />
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
                            placeholder="Search by power type diesel/electric..." 
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