import React, { useEffect } from 'react';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import AppBar from '@material-ui/core/AppBar';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Router as Switch, Route, Router, Redirect } from "react-router-dom"; // eslint-disable-line
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { navbarActions } from '../../_actions';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import DashboardIcon from '@material-ui/icons/Dashboard';
import SettingsIcon from '@material-ui/icons/Settings';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Box } from '@material-ui/core';
import { useTranslation } from "react-i18next";
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import logo from '../../assets/imgs/logo.png'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    drawerPaper: {
        width: drawerWidth,
    },
    appBar: {
        backgroundColor: theme.palette.primary.appBarColor,
        borderBottom: '2px solid ' + theme.palette.primary.main,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    menuButton: {
        //marginRight: theme.spacing(2),
    },
    loginBtn: {
        marginRight: theme.spacing(1),
        display: 'inline'
    },
    languageSelect: {
        marginRight: theme.spacing(1)
    },
    balance: {
        color: "#388e3c"
    },
    drawerHeader: theme.mixins.toolbar,
    spinner: {
        marginRight: theme.spacing(1),
        lineHeight: '0px'
    },
    menuButtonContainer: {
        flexGrow: 1
    },

}));


function NavBar(props) {
    const { t } = useTranslation();
    const { container } = props;
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const classes = useStyles();
    const currentUser = useSelector(state => state.navbar.user);
    const fetchingCurrent = useSelector(state => state.navbar.fetchingCurrent);

    const dispach = useDispatch()
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const location = useLocation();
    useEffect(() => {
        const currentPath = location.pathname;
        if (currentPath.includes('/dashboard/overview')) {
            setSelectedIndex(0)
        }
        // use include to handle nested routes
        if (currentPath.includes('/dashboard/settings')) {
            setSelectedIndex(1)
        }

    }, [location]);

    useEffect(() => {
        if (localStorage.getItem('user')) {
            dispach(navbarActions.fetchCurrent());
        }     // eslint-disable-next-line
    }, []);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const handleCloseDrawer = () => {
        setMobileOpen(false);
    };
    const handleLogout = () => {
        dispach(navbarActions.logout())
        setMobileOpen(false);
    }

    const drawer = (
        <Box>
            <List disablePadding>
                {/* <div className={classes.toolbar} /> */}
                <ListItem className={classes.drawerHeader}>
                    {/* <Typography variant="h5">
                        LOGO
                    </Typography> */}
                </ListItem>
                <Divider />
                <ListItem
                    button
                    key={'OVERVIEW'}
                    selected={selectedIndex === 0}
                    component={Link}
                    to="/dashboard/overview"
                    onClick={handleCloseDrawer}
                >
                    <ListItemIcon>
                        <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText primary={t("Overview")} />
                </ListItem>

                <ListItem button key={'SETTINGS'}
                    selected={selectedIndex === 1}
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
                    <Box className={classes.menuButtonContainer}>

                        {fetchingCurrent &&
                            <div className={classes.spinner}>
                                <CircularProgress thickness={6} size={16} />
                            </div>
                        }
                        {!currentUser && !fetchingCurrent &&
                            <>
                                <Box className={classes.loginBtn}>
                                    <Link to='/login' style={{ textDecoration: 'none' }}>
                                        <Button size="small" variant="contained" color="primary">
                                            {t("Sign In")}
                                        </Button>
                                    </Link>
                                </Box>
                                <Link to='/signup' style={{ textDecoration: 'none' }}>
                                    <Button size="small" variant="contained" color="primary">
                                        {t("Sign Up")}
                                    </Button>
                                </Link>
                            </>
                        }
                        {currentUser && <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            className={classes.menuButton}
                        >
                            <MenuIcon />
                        </IconButton>}
                    </Box>
                    <Box>
                        <a href="/">
                            <img width="120" alt="logo" src={logo} />
                        </a>
                    </Box>
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