import React from 'react'
import { Card, CardTitle, CardText } from 'material-ui/Card'
import Divider from 'material-ui/Divider'
import CircularProgress from 'material-ui/CircularProgress'

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
      let rooms = ''
      props.eventDetails.rooms.forEach((room) => {
        rooms += room + ', '
      })
      rooms = rooms.replace(/,\s*$/, '')
      return (
        <Card>
          <CardTitle style={{ fontWeight: 'bold' }} title={props.eventDetails.clubName} subtitle={props.eventDetails.title} />
          <CardText>
            <p><b> Starts </b> {props.eventDetails.startDate}</p>
            <Divider style={{ margin: '5px' }} />
            <p><b> Ends </b> {props.eventDetails.endDate}</p>
            <Divider style={{ margin: '5px' }} />
            <p><b> Rooms </b> {rooms} </p>
            <Divider style={{ margin: '5px' }} />
            <p><b> Contact </b> {props.eventDetails.booker_name} : {props.eventDetails.booker_contact} </p>
          </CardText>
        </Card>
      )
    }
  }

  return null
}
