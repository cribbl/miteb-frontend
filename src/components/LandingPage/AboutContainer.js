import React, { Component } from 'react'
import Collapsible from 'react-collapsible';
import Paper from 'material-ui/Paper'
import {faqData} from './faqData'

class AboutContainer extends Component {
  render () {
    return (
      <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
      <div>
      <h1>About Us</h1>
      </div>
    	<div style={{display: 'flex', width: '90%'}}>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '50%', backgroundColor: ''}}>
        <img src={require('./../../assets/kids1.png')} style={{width: '70%', height: '70%'}}/>
      </div>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '50%', backgroundColor: ''}}>
        <p>We are a team comprising of well experienced professionals from reputed institutes and companies and a highly intelligent mother of two little kids. We have tested our methods with superb results on these two kids. Encouraged by the beautiful results we saw in brain development of kids, we now want to share this method with the world and help realize the potential of millions of kids around the globe. It’s a journey of million miles which we have started with the first steps!</p>
      </div>
        </div>
      </div>
    )
  }
}

export default AboutContainer
