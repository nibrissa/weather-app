import React from 'react';
import './layout.sass'

import cloud from "./../../assets/img/Cloud.png"
import cloudRain from "./../../assets/img/cloud with rain.png"
import moon from "./../../assets/img/Moon.png"
import sunRain from "./../../assets/img/sun rain.png"
import sunCloud from "./../../assets/img/Sun-BehindCloud.png"
import umbrella from "./../../assets/img/UmbrellaRain.png"
import sun from "./../../assets/img/Sun.png"

function Layout({ children }) {
    return (
        <div className='backgroundWrapper'>

            <div className='header'>

                <h3 className='header__title'>МетеоХаб</h3>
            </div>


            <img className="cloud__img" src={cloud}/>
            <img className="cloudRain__img" src={cloudRain}/>
            <img className="moon__img" src={moon}/>
            <img className="sunRain__img" src={sunRain}/>
            <img className="sunCloud__img" src={sunCloud}/>
            <img className="umbrella__img" src={umbrella}/>
            <img className="sun__img" src={sun}/>

            <div className="contentWrapper">
                <div className="content">
                    <div className="content__inner">
                        { children }
                    </div>

                </div>

            </div>

        </div>
    )
}

export default Layout;