import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { database } from '../../firebase';

const validationSchema = Yup.object({
    model: Yup.string().required('Please enter the name of the product.'),
    producer: Yup.string().required('Input field must not be empty.'),
    description: Yup.string()
});

const AddSparePart = () => {
    const { handleSubmit, handleChange, handleReset, values, errors } = useFormik({
        initialValues: {
            model: '',
            producer: '',
            description: ''
        },
        validationSchema,
        onSubmit(values) {
            database.ref('spare_part').push(values);

            handleReset({
                initialValues: {
                    model: '',
                    producer: '',
                    description: ''             
                }
            })
        }
    })
    return (
        <form onSubmit={handleSubmit}>
            <div className="form-row">
                <div className="form-group col-md-6">
                    <label htmlFor="model">Model:</label>
                    <input 
                        className="form-control" 
                        name="model"
                        onChange={handleChange}
                        value={values.model} />
                    { errors.model && <p className="error-message mt-1">{errors.model}</p> }
                </div>

                <div className="form-group col-md-6">
                    <label htmlFor="producer">Producer:</label>
                    <input 
                        className="form-control" 
                        name="producer"
                        onChange={handleChange}
                        value={values.producer} />
                    { errors.producer && <p className="error-message mt-1">{errors.producer}</p> }
                </div>
            </div>

            <div className="form-row">
                <div className="form-group col-md-12">
                    <label>Detail information:</label>
                    <textarea 
                        className="form-control"
                        name="description"
                        onChange={handleChange}
                        value={values.description}></textarea>
                </div>
            </div>

            <button type="submit" className="btn btn-primary mt-3">Add Spare Part</button>
        </form>
    )
}

export default AddSparePart;