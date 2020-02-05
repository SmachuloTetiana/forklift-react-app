import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { database } from '../../firebase';

const validationSchema = Yup.object({
    title: Yup.string().required('Required'),
    model: Yup.string().required('Required'),
    capacity: Yup.number().positive().required('Required'),
    power: Yup.string().required('Required'),
    transmision: Yup.string().required(''),
    lift_height: Yup.number().required(''),
    free_lift: Yup.number().required(''),
    tyres: Yup.string().required(''),
    fork: Yup.number().required(''),
    price: Yup.number().required(''),
    description: Yup.string()
});

const AddForklift = () => {
    const { handleSubmit, handleChange, handleReset, values, errors } = useFormik({
        initialValues: {
            title: '',
            model: '',
            capacity: '',
            power: '',
            transmision: '',
            lift_height: '',
            free_lift: '',
            tyres: '',
            fork: '',
            price: '',
            description: ''
        },
        validationSchema,
        onSubmit(values) {
            database.ref('forklift').push(values);

            handleReset({
                initialValues: {
                    title: '',
                    model: '',
                    capacity: '',
                    power: '',
                    transmision: '',
                    lift_height: '',
                    free_lift: '',
                    tyres: '',
                    fork: '',
                    price: '',
                    description: ''
                }
            })
        }
    });

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-row">
                <div className="form-group col-md-6">
                    <label htmlFor="model">Title:</label>
                    <input 
                        className="form-control" 
                        name="title" 
                        onChange={handleChange}
                        value={values.title} />
                    { errors.title && <p className="error-message mt-1">{errors.title}</p> }
                </div>

                <div className="form-group col-md-6">
                    <label htmlFor="model">Model:</label>
                    <input 
                        className="form-control" 
                        name="model" 
                        onChange={handleChange}
                        value={values.model} />
                    { errors.model && <p className="error-message mt-1">{errors.model}</p> }
                </div>
            </div>
            
            <div className="form-row">
                <div className="form-group col-md-6">
                    <label htmlFor="capacity">Capacity:</label>
                    <input 
                        className="form-control" 
                        name="capacity" 
                        onChange={handleChange}
                        value={values.capacity} />
                    { errors.capacity && <p className="error-message mt-1">{errors.capacity}</p> }
                </div>

                <div className="form-group col-md-6">
                    <label htmlFor="power">Power:</label>
                    <input 
                        className="form-control" 
                        name="power" 
                        onChange={handleChange}
                        value={values.power} />
                    { errors.power && <p className="error-message mt-1">{errors.power}</p> }
                </div>
            </div>

            <div className="form-row">
                <div className="form-group col-md-6">
                    <label htmlFor="transmision">Transmision:</label>
                    <input 
                        className="form-control" 
                        name="transmision" 
                        onChange={handleChange}
                        value={values.transmision} />
                    { errors.transmision && <p className="error-message mt-1">{errors.transmision}</p> }
                </div>

                <div className="form-group col-md-6">
                    <label htmlFor="lift_height">Lift height:</label>
                    <input 
                        className="form-control" 
                        name="lift_height" 
                        onChange={handleChange}
                        value={values.lift_height} />
                    { errors.lift_height && <p className="error-message mt-1">{errors.lift_height}</p> }
                </div>
            </div>

            <div className="form-row">
                <div className="form-group col-md-6">
                    <label htmlFor="free_lift">Free lift:</label>
                    <input 
                        className="form-control" 
                        name="free_lift" 
                        onChange={handleChange}
                        value={values.free_lift} />
                    { errors.free_lift && <p className="error-message mt-1">{errors.free_lift}</p> }
                </div>

                <div className="form-group col-md-6">
                    <label htmlFor="tyres">Tyres:</label>
                    <input 
                        className="form-control" 
                        name="tyres" 
                        onChange={handleChange}
                        value={values.tyres} />
                    { errors.tyres && <p className="error-message mt-1">{errors.tyres}</p> }
                </div>
            </div>

            <div className="form-row">
                <div className="form-group col-md-6">
                    <label htmlFor="fork">Fork:</label>
                    <input 
                        className="form-control" 
                        name="fork" 
                        onChange={handleChange}
                        value={values.fork} />
                    { errors.fork && <p className="error-message mt-1">{errors.fork}</p> }
                </div>

                <div className="form-group col-md-6">
                    <label htmlFor="price">Price:</label>
                    <input 
                        className="form-control" 
                        name="price" 
                        onChange={handleChange}
                        value={values.price} />
                    { errors.price && <p className="error-message mt-1">{errors.price}</p> }
                </div>
            </div>

            <div className="form-row">
                <label htmlFor="description">Detail information:</label>
                <textarea 
                    className="form-control"
                    name="description"
                    onChange={handleChange}
                    value={values.description}></textarea>
            </div>

            <button type="submit" className="btn btn-primary mt-3">Add Forklift</button>
        </form>
    )
}

export default AddForklift;