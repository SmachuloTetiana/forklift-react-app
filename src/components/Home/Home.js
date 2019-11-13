import React from 'react';
import AboutUs from '../About Us/AboutUs';

const Home = () => {
    return (
        <div className="container">
            <div className="Banner">
                <div className="bg-image"></div>
                <p>Manufacturer of forklifts №1 in Ukraine!</p>
            </div>

            <AboutUs />
        </div>
    )
}

export default Home;