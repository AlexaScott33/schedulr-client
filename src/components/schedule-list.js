import React from 'react';
import {connect} from 'react-redux';
// import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ConfirmDelete from './ConfirmDelete';
import EditForm from './EditForm';
import moment from 'moment';
import AptForm from './AptForm';

function ScheduleList(props) {
  
  let buildList;
  try {    
    let appointments;
    if (props.selectedAppointment !== null && props.calendar === 'weekly') {
      appointments = [props.selectedAppointment];
    } else {
      appointments = props.currentUser.appointments.filter((apt) => {
        if (moment(apt.time).format('YYYY MM DD') === moment(props.selectedDate).format('YYYY MM DD')) {
          return apt;
        }
      });
    }
    console.log(appointments)
    
    buildList = appointments.map((apt) => {
      return (
      // <ListItem key={apt.id} button>
      //   <ListItemText
      //   primary={
        <div className="appointments">
        
            <ul className="appointments__list schedule-li">
              <li className="appointments__list__item">{moment(apt.time).format('MMMM Do, h:mm A')}</li>              
              <li className="appointments__list__item">{apt.client.name}</li>              
              <li className="appointments__list__item">{apt.client.phone}</li>
              <li className="appointments__list__item">{apt.client.email}</li>
              <li className="appointments__list__item">{apt.notes}</li>
            </ul>
          <EditForm aptTime={moment(apt.time).format('YYYY MM DD HH mm')} aptInfo={apt} aptId={apt.id} />
          <ConfirmDelete aptId={apt.id} />
        </div>
      //   } />
      // </ListItem>
      )
    })
    return (
      <div className="appointments-part2">
        <AptForm />
        <List component="nav" className="appointments__schedule-list">
          {buildList}
        </List>
      </div>
    );
  } catch(err){
    return (
      <div >
        <List component="nav">
          <span>No Appointments to show</span>
        </List>
      </div>
    );
  }



}

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser,
  selectedDate: state.calendarReducer.selectedDate,
  selectedAppointment: state.appointmentReducer.selectedAppointment,
  calendar: state.calendarReducer.calendar
});

export default connect(mapStateToProps)(ScheduleList);
