import React from 'react';
import { HashRouter } from 'react-router-dom';
import Settings from '../Settings/Settings';
import Overview from '../Overview/Overview';

import { Router as Switch, Route, Router, Redirect } from "react-router-dom"; // eslint-disable-line

function Dashboard(props) {

    return (
        <HashRouter>
        <Route path='/dashboard/overview' component={Overview} />
        <Route path='/dashboard/settings' component={Settings} />
    </HashRouter>
    );
}


export default Dashboard;