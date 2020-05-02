import React, { useEffect } from 'react';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import AppBar from '@material-ui/core/AppBar';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Router as Switch, Route, Router, Redirect } from "react-router-dom"; // eslint-disable-line
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../_actions';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import GroupIcon from '@material-ui/icons/Group';
import DashboardIcon from '@material-ui/icons/Dashboard';
import SettingsIcon from '@material-ui/icons/Settings';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Box } from '@material-ui/core';
import { useTranslation } from "react-i18next";
import Button from '@material-ui/core/Button';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    loginBtn: {
        marginRight: theme.spacing(1)
    },
    languageSelect: {
        marginRight: theme.spacing(1)
    },
    drawerHeader: theme.mixins.toolbar
}));


function NavBar(props) {
    const { t } = useTranslation();
    const { container } = props;
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const classes = useStyles();
    const currentUser = useSelector(state => state.authentication.user);
    const fetchingCurrent = useSelector(state => state.authentication.fetchingCurrent);
    const dispach = useDispatch()
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const location = useLocation();
    useEffect(() => {
        const currentPath = location.pathname;
        if (currentPath === '/dashboard') {
            setSelectedIndex(0)
        }
        // use include to handle nested routes
        if (currentPath.includes('/dashboard/settings')) {
            setSelectedIndex(2)
        }
        if (currentPath.includes('/dashboard/users')) {
            setSelectedIndex(1)
        }
    }, [location]);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const handleCloseDrawer = () => {
        setMobileOpen(false);
    };
    const handleLogout = () => {
        dispach(userActions.logout())
        setMobileOpen(false);
    }
    if ((localStorage.getItem('user')) && (!currentUser) && (!fetchingCurrent)) {
        dispach(userActions.fetchCurrent())
    }

    const drawer = (
        <Box>
            <List disablePadding>
                {/* <div className={classes.toolbar} /> */}
                <ListItem className={classes.drawerHeader}>
                    <Typography variant="h5">
                        LOGO
                    </Typography>
                </ListItem>
                <Divider />
                <ListItem
                    button
                    key={'DASHBOARD'}
                    selected={selectedIndex === 0}
                    component={Link}
                    to="/dashboard"
                    onClick={handleCloseDrawer}
                >
                    <ListItemIcon>
                        <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText primary={t("Dashboard")} />
                </ListItem>
                <ListItem button key={'USERS'}
                    selected={selectedIndex === 1}
                    component={Link}
                    to="/dashboard/users"
                    onClick={handleCloseDrawer}
                >
                    <ListItemIcon>
                        <GroupIcon />
                    </ListItemIcon>
                    <ListItemText primary={t("Users")} />
                </ListItem>
                <ListItem button key={'SETTINGS'}
                    selected={selectedIndex === 2}
                    component={Link}
                    to="/dashboard/settings"
                    onClick={handleCloseDrawer}
                >
                    <ListItemIcon>
                        <SettingsIcon />
                    </ListItemIcon>
                    <ListItemText primary={t("Settings")} />
                </ListItem>
                <ListItem button onClick={handleLogout} key={'LOGOUT'}>
                    <ListItemIcon>
                        <ExitToAppIcon />
                    </ListItemIcon>
                    <ListItemText primary={t("Logout")} />
                </ListItem>

            </List>
        </Box>
    );
    return (
        <div>
            <AppBar elevation={1} position="fixed" className={classes.appBar}>
                <Toolbar>
                    {currentUser && <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>}
                    <Typography style={{ flexGrow: 1 }} component="h6" variant="h6">
                        APP
                    </Typography>
                    {!currentUser &&
                        <>
                            <Box className={classes.loginBtn}>
                                <Link to='/login' style={{ textDecoration: 'none' }}>
                                    <Button size="small" variant="contained" color="secondary">
                                        <Typography variant="caption">
                                            {t("Sign In")}
                                        </Typography>
                                    </Button>
                                </Link>
                            </Box>
                            <Link to='/signup' style={{ textDecoration: 'none' }}>
                                <Button size="small" variant="contained" color="secondary">
                                    <Typography variant="caption">
                                        {t("Sign Up")}
                                    </Typography>
                                </Button>
                            </Link>
                        </>
                    }
                </Toolbar>
            </AppBar>
            <Box className={classes.drawer}>
                {currentUser && <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                >
                    {drawer}
                </Drawer>}
            </Box>
        </div>
    );
}


export default NavBar;