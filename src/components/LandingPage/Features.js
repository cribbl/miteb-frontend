import React, {Component} from 'react';
import { connect } from 'react-redux'
import { Link, hashHistory } from 'react-router'
import PhoneIcon from 'material-ui/svg-icons/communication/phone'
class Features extends Component {
    constructor(props) {
        super()
    }

  render () {
    return (        
      <div style={{backgroundColor: '', display: 'flex', flexDirection: this.props.isMobile ? 'column' : 'row', justifyContent: 'space-around', width: this.props.isMobile ? '100%' : '80%', textAlign: 'left'}}>
        <div style={{width: this.props.isMobile ? '98%' : '50%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          
          <div className="flex-row" style={{width: this.props.isMobile ? '100%' : '80%', justifyContent: 'space-evenly', minHeight: 200}}>
            <img src={require("../../assets/profiles.png")} style={{height: 60, width: 60, margin: 20}} />
            <div className="flex-col">
              <h4>Portfolio</h4>
              <p>An eye-catching way to flaunt your achievements and showcase your skills through Web based CV, Resume, V-card or Portfolio</p>
            </div>
          </div>

          <div className="flex-row" style={{width: this.props.isMobile ? '100%' : '80%', justifyContent: 'space-evenly', minHeight: 200}}>
            <img src={require("../../assets/food.png")} style={{height: 60, width: 60, margin: 20}} />
            <div className="flex-col">
              <h4>Food</h4>
              <p>We'll help you spread your food-joint to a greater dimension by featuring your delicacies, ambience and uphold your uniqueness to a wider range of foodies</p>
            </div>
          </div>

          <div className="flex-row" style={{width: this.props.isMobile ? '100%' : '80%', justifyContent: 'space-evenly', minHeight: 200}}>
            <img src={require("../../assets/profiles.png")} style={{height: 60, width: 60, margin: 20}} />
            <div className="flex-col">
              <h4>Handmade craft</h4>
              <p>Let the world witness your creativity in shaping ordinary things into extra-ordinary. We'll help you increase your sales, be it cards, gifts and craft</p>
            </div>
          </div>

        </div>
        <div style={{width: this.props.isMobile ? '98%' : '50%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          
          <div className="flex-row" style={{width: this.props.isMobile ? '100%' : '80%', justifyContent: 'space-evenly', minHeight: 200}}>
            <img src={require("../../assets/profiles.png")} style={{height: 60, width: 60, margin: 20}} />
            <div className="flex-col">
              <h4>Art &amp; Photography</h4>
              <p>Send us your work and we'll showcase your creativity before the world and help you reach out to a greater audience</p>
            </div>
          </div>

          <div className="flex-row" style={{width: this.props.isMobile ? '100%' : '80%', justifyContent: 'space-evenly', minHeight: 200}}>
            <img src={require("../../assets/profiles.png")} style={{height: 60, width: 60, margin: 20}} />
            <div className="flex-col">
              <h4>Occasions or Invites</h4>
              <p>Feature your ocassion and reach out to your friends and relatives much faster and in a classy way through personalised websites</p>
            </div>
          </div>

          <div className="flex-row" style={{width: this.props.isMobile ? '100%' : '80%', justifyContent: 'space-evenly', minHeight: 200}}>
            <img src={require("../../assets/profiles.png")} style={{height: 60, width: 60, margin: 20}} />
            <div className="flex-col">
              <h4>Shoppee</h4>
              <p>Put all your products under one website and cater to your customers in a user-friendly way and let them choose from the variety.</p>
            </div>
          </div>

        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const {isMobile} = state.toggler
  return {
    isMobile
  }
}

export default connect(mapStateToProps)(Features)