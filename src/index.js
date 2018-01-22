import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import LandingPage from './components/LandingPage/LandingPage'
import LoginComponent from './components/LoginComponent/LoginComponent'
import DrawerComponent from './components/DrawerComponent/DrawerComponent'


import ClassroomComponent from './components/ClassroomComponent/ClassroomComponent'
import AnalyticsComponent from './components/ClassroomComponent/AnalyticsComponent/AnalyticsComponent'
import CoursesComponent from './components/ClassroomComponent/CoursesComponent/CoursesComponent'
import DashboardComponent from './components/ClassroomComponent/DashboardComponent/DashboardComponent'
import NewsComponent from './components/ClassroomComponent/NewsComponent/NewsComponent'

import ProfileComponent from './components/ClassroomComponent/ProfileComponent/ProfileComponent'
import ProfileBillingComponent from './components/ClassroomComponent/ProfileComponent/ProfileBilling/ProfileBillingComponent'
import ProfileGeneralComponent from './components/ClassroomComponent/ProfileComponent/ProfileGeneral/ProfileGeneralComponent'

import ScoresComponent from './components/ClassroomComponent/ScoresComponent/ScoresComponent'
import SettingsComponent from './components/ClassroomComponent/SettingsComponent/SettingsComponent'
import SupportComponent from './components/ClassroomComponent/SupportComponent/SupportComponent'
import UpdatesComponent from './components/ClassroomComponent/UpdatesComponent/UpdatesComponent'

import Reg from './components/LoginComponent/Reg'
import {store} from './store'

import { Provider } from 'react-redux'

import './index.css';

import { Router, Route, IndexRoute, hashHistory } from 'react-router'

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
    	<Route path="/" component={App}>
    	<IndexRoute component={Reg}></IndexRoute>
        	<Route path="auth" component={Reg}>
    			<IndexRoute component={LoginComponent} />
    			<Route path="signin" component={LoginComponent}></Route>
    		</Route>
        <Route path="classroom" component={ClassroomComponent}>
            <IndexRoute component={DashboardComponent}></IndexRoute>
            <Route path="analytics" component={AnalyticsComponent}></Route>
            <Route path="courses" component={CoursesComponent}></Route>
            <Route path="news" component={NewsComponent}></Route>
            <Route path="profile" component={ProfileComponent}>
                <IndexRoute component={ProfileGeneralComponent} />
                <Route path="billing" component={ProfileBillingComponent} />
            </Route>
            <Route path="scores" component={ScoresComponent}></Route>
            <Route path="settings" component={SettingsComponent}></Route>
            <Route path="support" component={SupportComponent}></Route>
            <Route path="updates" component={UpdatesComponent}></Route>
        </Route>
    	</Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
