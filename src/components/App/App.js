import React, { useEffect, useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import { Router as Switch, Route, Router, Redirect } from "react-router-dom"; // eslint-disable-line
import { HashRouter } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { create } from 'jss';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';
import Notification from '../Notification/Notification';
import NavBar from '../NavBar/NavBar';
import { history } from '../../_helpers';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../_actions';
import { useTranslation } from 'react-i18next';
import Login from '../Login/Login';
import Signup from '../Signup/Signup';
import Home from '../Home/Home';
import { Box } from '@material-ui/core';
import { PrivateRoute } from '../PrivateRoute/PrivateRoute'
import Dashboard from '../Dashboard/Dashboard';
import Footer from '../Footer/Footer';
// eslint-disable-next-line no-unused-vars
import i18n from '../../_localization/index'
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });


const themeObject = {
  direction: 'ltr',
  palette: {
    type: 'light',
    primary: {
      main: '#3F88C5',
      bodyBackground: '#fafafa'
    },
    secondary: {
      main: '#ffba08'
    }
  },
}

const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  drawerHeader: theme.mixins.toolbar
}));

function App() {
  const classes = useStyles();
  const dispach = useDispatch();
  const { i18n } = useTranslation();
  const currentUser = useSelector(state => state.authentication.user);
  const fetchingCurrent = useSelector(state => state.authentication.fetchingCurrent);
  const currentLanguage = useSelector(state => state.languageSelect.language);
  const [theme, setTheme] = useState(createMuiTheme(themeObject))
  document.body.style.backgroundColor = theme.palette.primary.bodyBackground;

  useEffect(() => {
    if (currentLanguage) {
      const languageDir = i18n.dir(currentLanguage)
      i18n.changeLanguage(currentLanguage);
      document.body.dir = languageDir;
      themeObject.direction = languageDir
      setTheme(createMuiTheme(themeObject))
    }
  }, [currentLanguage, i18n]);

  if ((localStorage.getItem('user')) && (!currentUser) && (!fetchingCurrent)) {
    dispach(userActions.fetchCurrent())
  }
  return (
    <div className={classes.root}>
      <StylesProvider jss={jss}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Notification />
          <HashRouter history={history}>
            <NavBar />
            <Box className={classes.root}>
              <Box className={classes.content}>
                <Box className={classes.toolbar} />
                <Route exact path='/' component={Home} />
                <Route path='/login' component={Login} />
                <Route path='/signup' component={Signup} />
                <PrivateRoute path='/dashboard' component={Dashboard} />
                <Footer />
              </Box>
            </Box>
          </HashRouter>
        </ThemeProvider>
      </StylesProvider>
    </div>
  );
}


export default App;