import React from 'react';
import {connect} from 'react-redux';
import IconPoster from 'material-ui/svg-icons/device/wallpaper'
import IconBanner from 'material-ui/svg-icons/action/picture-in-picture';
import IconInfo from 'material-ui/svg-icons/action/info';
import IconBoard from 'material-ui/svg-icons/notification/live-tv';
import IconButton from 'material-ui/IconButton';

//import { Route , Link } from 'react-router';

class myIcon extends React.Component {
	constructor(props){
		super(props);
		}
		render() {
      var color;
     if(this.props.step === "Banner"){
      if(this.props.index === 0)
      color = 'green';
      else 
      color = 'black';
			return (
    		<IconButton tooltip="Banner" touch={true} tooltipPosition="bottom-right">
          <IconBanner color={color} />
        </IconButton>
			);
    }
  
    else if(this.props.step === "InfoDesk"){
      if(this.props.index === 1)
      color = 'green';
      else 
      color = 'black';

      return (
        <IconButton tooltip="InfoDesk" touch={true} tooltipPosition="bottom-right">
         <IconInfo color={color}  />
        </IconButton>
      );
    }
    else if(this.props.step ==="Digital Board"){
      if(this.props.index === 2)
      color = 'green';
      else 
      color = 'black';
      return (
      <IconButton tooltip="Digital Board" touch={true} tooltipPosition="bottom-right">
        <IconBoard color={color}  />
      </IconButton>
      );
    }
    else if(this.props.step === "Poster"){
      if(this.props.index === 3)
      color = 'green';
      else 
      color = 'black';
      return (
      <IconButton tooltip="Poster" touch={true} tooltipPosition="bottom-right">
       <IconPoster color={color} />
      </IconButton>
      );
    }
    else 
      return (
        <div> </div>
      );
		}
	}
	function mapStateToProps(state) {
  const {isMobile} = state.toggler
  const {user} = state.authentication
  return {
    isMobile,
    user
  }
}

export default connect(mapStateToProps)(myIcon);