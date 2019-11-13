import React from 'react';
import mikro_f_office from '../../images/main_office_of_mikro_f.jpg';

const AboutUs = () => {
    return (
        <div className="row AboutUs">
            <div className="col-lg-7 col-12">
                <h2 className="title">About <span>Us</span></h2>
                <p>Mikro-F Ltd. has been successfully operating in Ukraine and abroad more than 15 years. During this time the company has established itself as a reliable supplier of handling and warehouse equipment world famous companies such as Mitsubishi Nichiyu Forklift, Toyota, Nissan, Mitsubishi, TCM, Linde, Manitou, Caterpillar, Kalmar, Pramac.</p>
                <p>Mikro-F Ltd. is well known as manufacturer of forklift trucks (diesel and gasoline, capacity up to 16 tons).</p>
                <p>We have a wide range of spare parts for all models of equipment known brands from Japan, Europe and USA as well as components (tyres for  forklift trucks, batteries, chargers, spare parts for forklifts) attachments for forklifts</p>
            </div> 

            <div className="col-lg-5 col-12">
                <img src={mikro_f_office} className="img-fluid" alt="Mikro-F Office" />
            </div>
       </div>
    )
}

export default AboutUs;