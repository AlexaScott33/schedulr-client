import React from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import { selectDate } from '../actions/calendar';

export class Dates extends React.Component {

    render() {
        const component = this;
        const currentYear = String(this.props.selectedYear);
        const fixedCurrentYear = moment().format('YYYY');
        const currentMonth = String(this.props.selectedMonth);
        const fixedCurrentMonth = moment().format('MM');
        const maxDays = moment(`${currentYear}-${currentMonth}-01`).daysInMonth()
        const firstDayOfMonth = moment(`${currentYear}-${currentMonth}-01`).startOf('month').format('e');
        const previousMonthDate = moment(`${currentYear}-${currentMonth}-01`).subtract(1, 'months').endOf('month').format('YYYY-MM-DD')
        const maxDaysPrevious = moment(`${previousMonthDate}`).daysInMonth();
        const previousMonth = previousMonthDate.slice(5, 7);

        let dateArray = [];

        if (fixedCurrentYear > currentYear) {
            //First Push the previous month's days
            for (let i=maxDaysPrevious; i>maxDaysPrevious-firstDayOfMonth; i--) {
                dateArray.push({
                    value: `${currentYear}-${previousMonth}-${i}`,
                    day: `${i}`,
                    ref: 'previous',
                    month: 'previous'
                });
            }
            dateArray.reverse();

            //Push the amount of days in current month
            for (let i=1; i<=maxDays; i++) {
                if (i<10) {
                    dateArray.push({value: `${currentYear}-${currentMonth}-0${i}`, day: `0${i}`, ref: 'current', month: 'previous'})
                } else {
                    dateArray.push({value: `${currentYear}-${currentMonth}-${i}`, day: `${i}`, ref: 'current', month: 'previous'})
                }
            }

            //Push the remaining days for the next month
            let nextMonth = String(Number(currentMonth) + 1);
            const remainingBlocks = 35 - dateArray.length;
            if (nextMonth < 10) {
                nextMonth = '0' + nextMonth;
            }
            for (let i=1; i<=remainingBlocks; i++) {
                dateArray.push(
                {
                    value: `${currentYear}-${nextMonth}-0${i}`,
                    day: `0${i}`,
                    ref: 'next',
                    month: 'previous'
                }
                )
            }
        } else if (fixedCurrentYear === currentYear) {
    
            //If selected month is present month.
            if (fixedCurrentMonth === currentMonth) {
                //First Push the previous month's days
                for (let i=maxDaysPrevious; i>maxDaysPrevious-firstDayOfMonth; i--) {
                    dateArray.push({
                        value: `${currentYear}-${previousMonth}-${i}`,
                        day: `${i}`,
                        ref: 'previous',
                        month: 'current'
                    });
                }
                dateArray.reverse();
    
                //Push the amount of days in current month
                for (let i=1; i<=maxDays; i++) {
                    if (i<10) {
                        dateArray.push({value: `${currentYear}-${currentMonth}-0${i}`, day: `0${i}`, ref: 'current', month: 'current'})
                    } else {
                        dateArray.push({value: `${currentYear}-${currentMonth}-${i}`, day: `${i}`, ref: 'current', month: 'current'})
                    }
                }
    
                //Push the remaining days for the next month
                let nextMonth = String(Number(currentMonth) + 1);
                const remainingBlocks = 35 - dateArray.length;
                if (nextMonth < 10) {
                    nextMonth = '0' + nextMonth;
                }
                for (let i=1; i<=remainingBlocks; i++) {
                    dateArray.push(
                    {
                        value: `${currentYear}-${nextMonth}-0${i}`,
                        day: `0${i}`,
                        ref: 'next',
                        month: 'current'
                    }
                    )
                }
            }
    
                if (fixedCurrentMonth > currentMonth) {
                //First Push the previous month's days
                for (let i=maxDaysPrevious; i>maxDaysPrevious-firstDayOfMonth; i--) {
                    dateArray.push({
                        value: `${currentYear}-${previousMonth}-${i}`,
                        day: `${i}`,
                        ref: 'previous',
                        month: 'previous'
                    });
                }
                dateArray.reverse();
    
                //Push the amount of days in current month
                for (let i=1; i<=maxDays; i++) {
                    if (i<10) {
                        dateArray.push({value: `${currentYear}-${currentMonth}-0${i}`, day: `0${i}`, ref: 'current', month: 'previous'})
                    } else {
                        dateArray.push({value: `${currentYear}-${currentMonth}-${i}`, day: `${i}`, ref: 'current', month: 'previous'})
                    }
                }
    
                //Push the remaining days for the next month
                let nextMonth = String(Number(currentMonth) + 1);
                const remainingBlocks = 35 - dateArray.length;
                if (nextMonth < 10) {
                    nextMonth = '0' + nextMonth;
                }
                for (let i=1; i<=remainingBlocks; i++) {
                    dateArray.push(
                    {
                        value: `${currentYear}-${nextMonth}-0${i}`,
                        day: `0${i}`,
                        ref: 'next',
                        month: 'previous'
                    }
                    )
                }
                }
                //If the selected month is a future month of the current year.
                if (fixedCurrentMonth < currentMonth) {
                    //First Push the previous month's days
                for (let i=maxDaysPrevious; i>maxDaysPrevious-firstDayOfMonth; i--) {
                    dateArray.push({
                        value: `${currentYear}-${previousMonth}-${i}`,
                        day: `${i}`,
                        ref: 'previous',
                        month: 'future'
                    });
                }
                dateArray.reverse();
    
                //Push the amount of days in current month
                for (let i=1; i<=maxDays; i++) {
                    if (i<10) {
                        dateArray.push({value: `${currentYear}-${currentMonth}-0${i}`, day: `0${i}`, ref: 'current', month: 'future'})
                    } else {
                        dateArray.push({value: `${currentYear}-${currentMonth}-${i}`, day: `${i}`, ref: 'current', month: 'future'})
                    }
                }
    
                //Push the remaining days for the next month
                let nextMonth = String(Number(currentMonth) + 1);
                const remainingBlocks = 35 - dateArray.length;
                if (nextMonth < 10) {
                    nextMonth = '0' + nextMonth;
                }
                for (let i=1; i<=remainingBlocks; i++) {
                    dateArray.push(
                    {
                        value: `${currentYear}-${nextMonth}-0${i}`,
                        day: `0${i}`,
                        ref: 'next',
                        month: 'future'
                    }
                    )
                }
                }
            }
            //Else if the selected year is a future year.
            else if (fixedCurrentYear < currentYear) {
                    //First Push the previous month's days
                for (let i=maxDaysPrevious; i>maxDaysPrevious-firstDayOfMonth; i--) {
                    dateArray.push({
                        value: `${currentYear}-${previousMonth}-${i}`,
                        day: `${i}`,
                        ref: 'previous',
                        month: 'future'
                    });
                }
                dateArray.reverse();
    
                //Push the amount of days in current month
                for (let i=1; i<=maxDays; i++) {
                    if (i<10) {
                        dateArray.push({value: `${currentYear}-${currentMonth}-0${i}`, day: `0${i}`, ref: 'current', month: 'future'})
                    } else {
                        dateArray.push({value: `${currentYear}-${currentMonth}-${i}`, day: `${i}`, ref: 'current', month: 'future'})
                    }
                }
    
                //Push the remaining days for the next month
                let nextMonth = String(Number(currentMonth) + 1);
                const remainingBlocks = 35 - dateArray.length;
                if (nextMonth < 10) {
                    nextMonth = '0' + nextMonth;
                }
                for (let i=1; i<=remainingBlocks; i++) {
                    dateArray.push(
                    {
                        value: `${currentYear}-${nextMonth}-0${i}`,
                        day: `0${i}`,
                        ref: 'next',
                        month: 'future'
                    }
                    )
                }
            }
    
            //Force Stop at 35 blocks
            dateArray = dateArray.slice(0, 35);
            const appointments = component.props.currentUser.appointments;
            const buildJSX = dateArray.map((date) => {
                let found = null;
                appointments.forEach((appointment) => {
                    if (moment(appointment.time).format('YYYY-MM-DD') === date.value) {
                        found = appointment;
                    }
                })
                if (component.props.selectedDate === date.value) {
                    if (found !== null) {
                        if (moment(date.value).valueOf() > moment().valueOf()) {
                            if (date.ref === 'previous' || date.ref === 'next') {
                                return (
                                    <a onClick={(event) => component.props.dispatch(selectDate(date.value))} className="selected-date calendar__blocks-row__blocks appointment-date other-month-date" value={date.value} ref={date.ref} key={date.value}>
                                        {date.day}
                                    </a>
                                    )
                            }
                            return (
                            <a onClick={(event) => component.props.dispatch(selectDate(date.value))} className="selected-date calendar__blocks-row__blocks appointment-date" value={date.value} ref={date.ref} key={date.value}>
                                {date.day}
                            </a>
                            )
                        }
                        if (moment().format('YYYY MM DD') === moment(date.value).format('YYYY MM DD')) {
                            return (
                                <a onClick={(event) => component.props.dispatch(selectDate(date.value))} className="calendar__blocks-row__blocks current-day" value={date.value} ref={date.ref} key={date.value}>
                                    {date.day}
                                </a>
                                )
                        }
                        if (date.ref === 'previous' || date.ref === 'next') {
                            return (
                                <a onClick={(event) => component.props.dispatch(selectDate(date.value))} className="selected-date calendar__blocks-row__blocks previous-appointment-date other-month-date" value={date.value} ref={date.ref} key={date.value}>
                                    {date.day}
                                </a>
                                )
                        }
                        return (
                            <a onClick={(event) => component.props.dispatch(selectDate(date.value))} className="selected-date calendar__blocks-row__blocks previous-appointment-date" value={date.value} ref={date.ref} key={date.value}>
                                {date.day}
                            </a>
                        )
                    }
                    if (moment().format('YYYY MM DD') === moment(date.value).format('YYYY MM DD')) {
                        return (
                            <a onClick={(event) => component.props.dispatch(selectDate(date.value))} className="calendar__blocks-row__blocks current-day" value={date.value} ref={date.ref} key={date.value}>
                                {date.day}
                            </a>
                            )
                    }
                    return (
                        <a onClick={(event) => component.props.dispatch(selectDate(date.value))} className="selected-date calendar__blocks-row__blocks" value={date.value} ref={date.ref} key={date.value}>
                            {date.day}
                        </a>
                    )
                }
                if (found !== null) {
                    if (moment(date.value).valueOf() > moment().valueOf()) {
                        if (date.ref === 'previous' || date.ref === 'next') {
                            return (
                                <a onClick={(event) => component.props.dispatch(selectDate(date.value))} className="calendar__blocks-row__blocks appointment-date other-month-date" value={date.value} ref={date.ref} key={date.value}>
                                    {date.day}
                                </a>
                                )
                        }
                        return (
                        <a onClick={(event) => component.props.dispatch(selectDate(date.value))} className="calendar__blocks-row__blocks appointment-date" value={date.value} ref={date.ref} key={date.value}>
                            {date.day}
                        </a>
                        )
                    }
                    if (moment().format('YYYY MM DD') === moment(date.value).format('YYYY MM DD')) {
                        return (
                            <a onClick={(event) => component.props.dispatch(selectDate(date.value))} className="calendar__blocks-row__blocks current-day" value={date.value} ref={date.ref} key={date.value}>
                                {date.day}
                            </a>
                            )
                    }
                    if (date.ref === 'previous' || date.ref === 'next') {
                        return (
                            <a onClick={(event) => component.props.dispatch(selectDate(date.value))} className="calendar__blocks-row__blocks previous-appointment-date other-month-date" value={date.value} ref={date.ref} key={date.value}>
                                {date.day}
                            </a>
                            )
                    }
                    return (
                        <a onClick={(event) => component.props.dispatch(selectDate(date.value))} className="calendar__blocks-row__blocks previous-appointment-date" value={date.value} ref={date.ref} key={date.value}>
                            {date.day}
                        </a>
                    )
                }
                if (date.ref === 'previous' || date.ref === 'next') {
                    return (
                        <a onClick={(event) => component.props.dispatch(selectDate(date.value))} className="calendar__blocks-row__blocks other-month-date" value={date.value} ref={date.ref} key={date.value}>
                            {date.day}
                        </a>
                        )
                }
                if (moment().format('YYYY MM DD') === moment(date.value).format('YYYY MM DD')) {
                    return (
                        <a onClick={(event) => component.props.dispatch(selectDate(date.value))} className="calendar__blocks-row__blocks current-day" value={date.value} ref={date.ref} key={date.value}>
                            {date.day}
                        </a>
                        )
                }
                return (
                    <a onClick={(event) => component.props.dispatch(selectDate(date.value))} className="calendar__blocks-row__blocks" value={date.value} ref={date.ref} key={date.value}>
                        {date.day}
                    </a>
                )
            })
            return (
                <div className="calendar__blocks-row">
                    {buildJSX}
                </div>
            )
    }

}

const mapStateToProps = state => {
    return {
        selectedMonth: state.calendarReducer.selectedMonth,
        selectedYear: state.calendarReducer.selectedYear,
        selectedDate: state.calendarReducer.selectedDate,
        currentUser: state.auth.currentUser
    }
};

export default connect(mapStateToProps)(Dates);