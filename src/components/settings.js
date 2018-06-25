import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Navigation from './navigation';

import requiresLogin from './requires-login';
import background from '../media/whiteHoriz.jpg';
import { changeTheme } from '../actions/auth';
import ChangePasswordForm from './change-password';

const sectionStyle = {
    backgroundSize: "100% 100%",
    height: "100VH",
    backgroundRepeat: "no-repeat",
    backgroundImage: `url(${background})`
  };

export class Settings extends React.Component {

    componentDidMount() {
        if (this.props.selectedTab === 'dashboard') {
            return <Redirect to='/dashboard' />
        }
    }

    changeTheme(value) {
        if (value !== 'null') {
            this.props.dispatch(changeTheme(this.props.authToken, value, this.props.currentUser.id))
            window.location.reload();
        }
    }

    render() {
        return (
            <section className="settings" style={ sectionStyle }>
                <Navigation/>
                <div className="settings__change-theme">
                    <h2 className="settings__change-theme__header">Select Theme</h2>
                    <select onChange={(event) => this.changeTheme(event.target.value)} className="settings__change-theme__drop-down">
                        <option className="settings__change-theme__option" value="null"></option>
                        <option className="settings__change-theme__option" value="light">Light</option>
                        <option className="settings__change-theme__option" value="dark">Dark</option>
                    </select>
                </div>
                <div className="settings__change-password">
                    <h2 className="settings__change-password__header" >Change Password</h2>
                    <ChangePasswordForm authToken={this.props.authToken} userId={this.props.currentUser.id} />
                </div>
            </section>
        )
    }
}

const mapStateToProps = state => {
    return {
        authToken: state.auth.authToken,
        currentUser: state.auth.currentUser,
        selectedDate: state.calendarReducer.selectedDate,
        selectedTab: state.tabsReducer.selectedTab
    }
};

export default requiresLogin()(connect(mapStateToProps)(Settings));
