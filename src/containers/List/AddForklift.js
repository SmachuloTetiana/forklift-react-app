import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { database } from '../../firebase';

const validationSchema = Yup.object({
    title: Yup.string().required('Required'),
    model: Yup.string().required('Required'),
    capacity: Yup.number().required('Required')
});

const AddForklift = () => {
    const { handleSubmit, handleChange, values, errors } = useFormik({
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
            database.ref('forklift').push({
                title: values.title,
                model: values.model,
                capacity: values.capacity
            })
        }
    });

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-row">
                <div className="form-group col-md-4">
                    <label htmlFor="model">Title:</label>
                    <input 
                        className="form-control" 
                        name="title" 
                        onChange={handleChange}
                        values={values.title} />
                    { errors.title && <p className="error-message mt-1">{errors.title}</p> }
                </div>

                <div className="form-group col-md-4">
                    <label htmlFor="model">Model:</label>
                    <input 
                        className="form-control" 
                        name="model" 
                        onChange={handleChange}
                        values={values.model} />
                    { errors.model && <p className="error-message mt-1">{errors.model}</p> }
                </div>

                <div className="form-group col-md-4">
                    <label htmlFor="capacity">Capacity:</label>
                    <input 
                        className="form-control" 
                        name="capacity" 
                        onChange={handleChange}
                        values={values.capacity} />
                    { errors.capacity && <p className="error-message mt-1">{errors.capacity}</p> }
                </div>
            </div>

            <button type="submit" className="btn btn-primary mt-2">Add Forklift</button>
        </form>
    )
}

export default AddForklift;