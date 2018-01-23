import React, {Component} from 'react';
import {
  Table,
  TableBody,
  TableFooter,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import Paper from 'material-ui/Paper'
import {tableData} from './data'

import {connect} from 'react-redux'
import {firebaseDB} from '../../../firebaseConfig'
import SearchSortContainer from './SearchSortContainer'

class MyEventsComponent extends Component {
 state = {
    fixedHeader: true,
    fixedFooter: false,
    stripedRows: false,
    showRowHover: true,
    showCheckboxes: false,
  };

  componentWillMount() {
    var arr = [];
        firebaseDB.ref('/clubs/Fq10VDgTdAf7t4o4sEUrgY08rGg2').on('value',
          function(snapshot) {
            console.log('club change')
            let events = snapshot.val().my_events
            for(event in events) {
              firebaseDB.ref('/events/' + events[event]).on('value',
              function(snapshot) {
                console.log('event change')
                arr.push(snapshot.val())
              })
            }
          })
    this.setState({myArr: arr})
}


  render() {
    return (
      <div style={{display: 'flex', justifyContent: 'start', flexDirection: 'column', alignItems: 'center', backgroundColor: '', height: '100%'}}>
      
      <div style={{minWidth: '98%', backgroundColor: 'yellow', marginTop: 20}}>
        <SearchSortContainer />
      </div>
      
      <Paper style={{width: '98%', height: 500, overflow: 'hidden'}} zDepth={2}>
        <Table
          style={{backgroundColor: ''}}
          height={'440px'}
          fixedHeader={this.state.fixedHeader}
          fixedFooter={this.state.fixedFooter}
          selectable={this.state.selectable}
          multiSelectable={this.state.multiSelectable}
        >
          <TableHeader
            displaySelectAll={this.state.showCheckboxes}
            adjustForCheckbox={this.state.showCheckboxes}
            enableSelectAll={this.state.enableSelectAll}
          >
            <TableRow style={{backgroundColor: '#EFF0F2'}}>
              <TableHeaderColumn style={{color: '#000', fontWeight: 700}} >TITLE</TableHeaderColumn>
              <TableHeaderColumn style={{color: '#000', fontWeight: 700}} >START DATE</TableHeaderColumn>
              <TableHeaderColumn style={{color: '#000', fontWeight: 700}} >STATUS</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={this.state.showCheckboxes}
            deselectOnClickaway={this.state.deselectOnClickaway}
            showRowHover={this.state.showRowHover}
            stripedRows={this.state.stripedRows}
          >

          
          {this.state.myArr.map( (row, index) => (
              <TableRow key={index}>
                <TableRowColumn>{row.start_date}</TableRowColumn>
                <TableRowColumn>{row.title}</TableRowColumn>
                <TableRowColumn>{row.status}</TableRowColumn>
              </TableRow>
              ))
            }

{/*            {tableData.map( (row, index) => (
              <TableRow key={index}>
                <TableRowColumn>{index}</TableRowColumn>
                <TableRowColumn>{row.name}</TableRowColumn>
                <TableRowColumn>{row.status}</TableRowColumn>
              </TableRow>
              ))}
*/}
          </TableBody>
        </Table>
        </Paper>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {openSideNav, isMobile} = state.toggler
  const {user, verified} = state.authentication
  return {
    user,
    openSideNav,
    verified,
    isMobile
  }
}

export default connect(mapStateToProps)(MyEventsComponent)