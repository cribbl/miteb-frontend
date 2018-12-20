import React, { Component } from 'react';
//import Paper from 'material-ui/Paper'
//import AppBar from 'material-ui/AppBar';
//import Typography from 'material-ui/Typography';
//import classes from './Print.css';
import RaisedButton from 'material-ui/RaisedButton';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import { printEvents } from '../../../Services/firebaseStorageService'
import { connect } from 'react-redux'
class PrintComponent extends Component {


constructor (props) {
    super(props)
    this.handlePrintButton = this.handlePrintButton.bind(this)
     this.state = {
      exportMode: ''
    }
  }

handlePrintButton (value) {
    console.log('click');
  
};



render () {
	return (
		<div style={{ display: 'flex', justifyContent: 'center', padding: 15 }}>
        <Paper style={{ background: '', width: this.props.isMobile ? '98%' : '90%', height: '150px', display: 'flex', justifyContent: 'center' }} zDepth={0}>
        	<Paper zDepth={3} style={{ display: 'flex', justifyContent: 'center', width: '100%',height: '150px', padding: 30 }}>
        		<Grid container spacing={16}>
          <Grid item>
            <ButtonBase style={{width: 120,height: 120}}>
              <img alt="printer" src={require('../../../assets/printer.png')} style={{margin: 'auto',display: 'block', maxWidth: '100%',maxHeight: '100%',height:'75px',marginBottom:25}} />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={16} style={{marginTop:25,marginLeft:200}}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1" >
                  Please Click on the Print Button!
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">
                  <RaisedButton className='submitButton' type='submit' label='Print' primary style={{marginTop:25}} onClick={this.handlePrintButton} />
              </Typography>
            </Grid>
          </Grid>
        </Grid>		
        	</Paper>
        </Paper>
        </div> 
	)
}

}

export default PrintComponent