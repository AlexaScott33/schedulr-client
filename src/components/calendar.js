import React from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import { changeMonth, changeYear, toggleCalendar } from '../actions/calendar';
import Days from './days';
import Dates from './dates';
import SvgIcon from '@material-ui/core/SvgIcon';
import IconButton from '@material-ui/core/IconButton';

class Calendar extends React.Component {

    toggleCalendar() {
        console.log(this)
        this.props.dispatch(toggleCalendar('weekly'))
    }

    render() {
        let currentMonth = this.props.selectedMonth;
        let currentYear = this.props.selectedYear;
        const component = this;
        const monthYear = moment(String(`${currentYear}-${currentMonth}`)).format('MMMM YYYY');
        function increment() {
            currentMonth ++
            if (currentMonth > 12) {
                currentMonth = 1
                component.props.dispatch(changeYear(Number(currentYear) + 1))
            }
            if (currentMonth < 10) {
                currentMonth = '0' + currentMonth
            }
            component.props.dispatch(changeMonth(currentMonth))
        }
        function decrement() {
            currentMonth --
            if (currentMonth < 1) {
                currentMonth = 12
                component.props.dispatch(changeYear(Number(currentYear) - 1))
            }
            if (currentMonth < 10) {
                currentMonth = '0' + currentMonth
            }
            component.props.dispatch(changeMonth(currentMonth))
        }
        return (
            <div className="calendar">
                <button onClick={() => this.toggleCalendar()}className="btn login-button">Weekly</button>
                <div className="calendar__header-row">
                <IconButton aria-label="next month" onClick={decrement}>
                    <SvgIcon>
                    <path xmlns="http://www.w3.org/2000/svg" d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                    </SvgIcon>
                </IconButton>
                    <h2 className="calendar__header-row__header">{monthYear}</h2>
                <IconButton aria-label="next month" onClick={increment}>
                    <SvgIcon>
                    <path xmlns="http://www.w3.org/2000/svg" d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
                    </SvgIcon>
                </IconButton>
                </div>
                <Days/>
                <Dates/>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        authToken: state.auth.authToken,
        currentUser: state.auth.currentUser,
        selectedMonth: state.calendarReducer.selectedMonth,
        selectedYear: state.calendarReducer.selectedYear,
        calendar: state.calendarReducer.calendar        
    }
};

export default connect(mapStateToProps)(Calendar);