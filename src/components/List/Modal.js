import React from 'react';
import Modal from 'react-modal';

export const ModalForm = (props) => { 
    console.log(props);

    const {modalIsOpen, data} = props.valueModal;

    return (
        <Modal isOpen={modalIsOpen} ariaHideApp={false} className="modal-dialog modal-lg">
            <div className="modal-content">
                <div className="modal-header">
                    <h4 className="modal-title">Edit Form</h4>
                    <button type="button" className="close" onClick={props.close}>&times;</button>
                </div>

                <form className="modal-body">
                    <div className="d-flex flex-row flex-wrap">
                    { Object.keys(data).map((item, index) => (
                        <div key={index} className="col-sm-6">
                            <label className="col-form-label">{(item.charAt(0).toUpperCase() + item.slice(1)).split('_').join(' ')}</label>
                            <input type="text" className="form-control" name={item} value={data[item]} onChange={props.change} />
                        </div>
                    ))}   
                    </div>     
                    
                    <button type="submit" className="btn btn-primary" style={{marginTop: '15px'}} onClick={props.save}>Save Changes</button>                                        
                </form>
            </div>
        </Modal>
    )
}