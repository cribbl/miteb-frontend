import React from 'react'
import { Card, CardTitle, CardText } from 'material-ui/Card'
import Divider from 'material-ui/Divider'
import CircularProgress from 'material-ui/CircularProgress'

function getRoomsString (rooms) {
  let roomList = ''
  // determines the academic block according to the first digit as array index
  const roomBlock = ['AB-1', 'AB-2', 'NLH', 'IC', 'AB-5']
  // Handle 53101 (5310A) and 53102 (5310B) as special cases.
  rooms.forEach(function (room) {
    let block
    let roomNo
    if (room === 53101 || room === 53102) {
      block = roomBlock[4]
      roomNo = room === 53101 ? '310A' : '310B'
    } else {
      block = Math.floor(room / 1000) - 1
      roomNo = room % 1000
      block = roomBlock[block]
    }
    roomList += block + '-' + roomNo + ', '
  })
  roomList = roomList.replace(/,\s*$/, '')
  return roomList
}

export const EventDetails = (props) => {
  if (props.isRoomSelected) {
    if (props.fetchingEventData) {
      return (
        <div>
          <p>Fetching Event...</p>
          <CircularProgress size={60} />
        </div>
      )
    } else {
      return (
        <Card>
          <CardTitle style={{ fontWeight: 'bold' }} title={props.eventDetails.clubName} subtitle={props.eventDetails.title} />
          <CardText>
            <p><b> Starts </b> {props.eventDetails.startDate}</p>
            <Divider style={{ margin: '5px' }} />
            <p><b> Ends </b> {props.eventDetails.endDate}</p>
            <Divider style={{ margin: '5px' }} />
            <p><b> Rooms </b> {getRoomsString(props.eventDetails.rooms)} </p>
            <Divider style={{ margin: '5px' }} />
            <p><b> Contact </b> {props.eventDetails.booker_name} : {props.eventDetails.booker_contact} </p>
          </CardText>
        </Card>
      )
    }
  }

  return null
}
