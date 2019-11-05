import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { myFirebase } from '../../firebase';
import { getForklift } from '../../actions';

const List = ({item}) => {

    const dispatch = useDispatch();

    const getForkliftsList = event => {
        event.preventDefault();
        myFirebase.database().ref('items')
            .on('value', snap => {
                dispatch(getForklift(snap.val()));
            });
    }

    return (
        <div className="container">
            <div className="Items-list">
                <h2 className="title text-center">Навантажувачі власного виробництва</h2>
                <button 
                    type="button" 
                    style={{'marginBottom': '15px'}}
                    className="btn btn-primary"
                    onClick={getForkliftsList}>
                        Get List
                </button>
                <ul>
                    {
                        item ? (
                            Object.keys(item).map((el, index) => {
                                return (
                                    <li key={index}> 
                                        <span>{item[el].title}</span>
                                        <p>{item[el].description}</p>
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
    item: state.forklift.item
});

export default connect(mapStateToProps)(List);