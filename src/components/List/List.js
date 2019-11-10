import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

const List = ({item}) => {
    const [data, setData] = useState({
        users: {},
        isFetching: false
    });

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setData({
                    users: data.users,
                    isFetching: true
                })
                const responce = await axios.get('https://forklift-bb1ea.firebaseio.com/items.json');
                setData({
                    users: responce.data,
                    isFetching: false
                })
                console.log(responce.data);
            }
            catch (e) {
                console.log(e);
                setData({
                    users: data.users,
                    isFetching: false
                })
            }
        }
        fetchUsers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="container">
            <div className="Items-list">
                <h2 className="title text-center">Навантажувачі власного виробництва</h2>
                <button 
                    type="button" 
                    style={{'marginBottom': '15px'}}
                    className="btn btn-primary">
                        Get List
                </button>
                <ul>
                    {
                        Object.keys(data.users).map((el, index) => {
                            return (
                                <li key={index}> 
                                    <span>{data.users[el].title}</span>
                                    <p>{data.users[el].description}</p>
                                </li>
                            )
                        })
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