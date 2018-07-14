import React, { Component } from 'react'

// import { Carousel } from 'react-responsive-carousel';
// import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';

import './LandingPage.css';

import FaqContainer from './FaqContainer'
import AboutContainer from './AboutContainer'
import WhyNeededContainer from './WhyNeededContainer'

class LandingPage extends Component {
    constructor(props) {
        super()
    }

  render () {
    return (
    	<div>
    	<div className="carousel">
      	{/*}
            <Carousel autoPlay interval={5000} infiniteLoop showArrows={false} showIndicators={false}  showThumbs={false} showStatus={false}>
                <div>
                    <img src={require('../../assets/banner2.jpg')}/>
                </div>
                <div>
                    <img src={require('../../assets/banner1.jpg')}/>
                </div>
                <div>
                    <img src={require('../../assets/banner3.jpg')}/>
                </div>
       		</Carousel>
        */}
        </div>

        <AboutContainer />
        
        <WhyNeededContainer />
        
        <FaqContainer />
        
        <div style={{minHeight: 300, backgroundColor: 'grey'}}>
        </div>

        </div>
    )
  }
}

export default LandingPage
