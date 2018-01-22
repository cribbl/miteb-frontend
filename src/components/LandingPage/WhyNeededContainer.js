import React, { Component } from 'react'
import Collapsible from 'react-collapsible';
import Paper from 'material-ui/Paper'
import {faqData} from './faqData'

class WhyNeededContainer extends Component {
  render () {
    return (
      <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
      <div>
      <h1>Why is it needed?</h1>
      </div>
    	<div style={{display: 'flex', width: '90%'}}>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'start', width: '50%', backgroundColor: ''}}>
      <p style={{margin: 5}}>School curriculum is overloaded with information. However, they seriously lack development of critical thinking by relying more on rote learning. This program when supplemented with school curriculum will help a kid bring out the true potential by becoming a more aware and thinking human.</p>
      <p style={{margin: 5}}>Think of the time when your kid would have graduated. Can you predict the types of job that would be available then? Many of the jobs we see today would not be there 15-20 years from now. The only way to survive and prosper in an ever changing world is to help a child develop the faculties of logical and critical thinking along with whole brain development.</p>

      </div>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'start', width: '50%', backgroundColor: ''}}>
        <p style={{margin: 5}}>Unfortunately, our current education system relies too much on rote learning and too little on whole brain development. As a result, we are depriving our kids of much of their hidden potential.<br /><br /></p>
        <p style={{margin: 5}}>Once the age pass by the development of neural networks in the brain slows down and eventually stops growing. For optimizing brain performance, a child must be exposed to things and experiences that help grow the neural networks exponentially inside brain. If a child misses rapid development of neural network, s/he will never be able to regrow them in later years affecting their career and life performance.</p>
      </div>
        </div>
      </div>
    )
  }
}

export default WhyNeededContainer
