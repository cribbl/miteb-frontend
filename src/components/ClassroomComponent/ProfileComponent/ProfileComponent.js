import React, {Component} from 'react'
import {hashHistory} from 'react-router'

import Paper from 'material-ui/Paper'
import {List, ListItem} from 'material-ui/List';

import './ProfileComponent.css'
import {connect} from 'react-redux'

const tabsStyle = {
  width: '30%',
  minHeight: 500,
  paddingTop: 100,
  paddingLeft: 30
}

const m_tabsStyle = {
  width: '80%',
  paddingTop: 10,
  paddingLeft: 0,
  margin: '0px auto'
}

const childStyle = {
  width: '70%',
  backgroundColor: 'yellow'
}

const m_childStyle = {
  width: '100%',
  backgroundColor: 'yellow'
}

const active = {
  backgroundColor: '#EEEEEE'
}

class ProfileComponent extends Component {
  constructor (props) {
    super(props)
    this.listItemClicked = this.listItemClicked.bind(this)

    this.state = {
      generalActive: true,
      billingActive: false,
      currentlyActive: 'generalActive'
    }
  }

  listItemClicked (url, activator) {
    hashHistory.push(url)
    this.setState
    
    this.setState({[this.state.currentlyActive]: false})
    this.setState({currentlyActive: activator})
    this.setState({[activator]: true})
  }

  render() {
    return (
    	<div style={{display: 'flex', flexDirection: this.props.isMobile ? 'column' : 'row'}}>
      		<div style={this.props.isMobile ? m_tabsStyle : tabsStyle} className="list">
          
            <List>
              <h5 style={{marginTop: 10}}>Account</h5>
                  <ListItem
                    style={this.state.generalActive ? active : null}
                    primaryText="Personal Information"
                    innerDivStyle={{padding: 10}}
                    onClick={() =>  this.listItemClicked('/classroom/profile', 'generalActive')}
                  />
                  <ListItem
                    primaryText="Password"
                    innerDivStyle={{padding: 10}}
                  />
              <h5 style={{marginTop: 10}}>Enrollments</h5>
                  <ListItem
                    primaryText="Courses"
                    innerDivStyle={{padding: 10}}
                  />
                  <ListItem
                    style={this.state.billingActive ? active : null}
                    primaryText="Billing"
                    innerDivStyle={{padding: 10}}
                    onClick={() => this.listItemClicked('/classroom/profile/billing', 'billingActive')}
                  />
                </List>
          

          </div>
          
          <div style={this.props.isMobile ? m_childStyle : childStyle}>
            {this.props.children}
          </div>
	    </div>
    );
  }
}

function mapStateToProps (state) {
  const {isMobile} = state.toggler
  return {
    isMobile
  }
}

export default connect(mapStateToProps)(ProfileComponent)