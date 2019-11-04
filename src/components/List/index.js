import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

const List = ({currentUser}) => {

    const getList = () => {
        axios.get('https://forklift-bb1ea.firebaseio.com/items.json').then(items => {
            console.log(items.data);
            const forklifts = [];
            for(let key in items.data) {
                forklifts.push(items.data[key])
            }
        })
    }

    getList();
    
    return (
        <div className="container">
            <div className="Items-list">
                <h2 className="title text-center">Навантажувачі власного виробництва</h2>

                <ul>
                    <li>
                        <span>Title</span>
                        <p>Description</p>
                    </li>
                </ul>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    currentUser: state.auth.currentUser
});

export default connect(mapStateToProps)(List);