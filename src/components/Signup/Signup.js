import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signupActions } from '../../_actions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { appLogger } from '../../_helpers/logger';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useTranslation } from "react-i18next";
import { Paper } from '@material-ui/core';



const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2)
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2)
    },
    avatar: {
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    spinner: {
        marginRight: theme.spacing(1)
    },
    link: {
        textDecoration: 'none',
        color: theme.palette.primary.linkColor
    },
}));

function Signup() {
    const classes = useStyles();
    const { t } = useTranslation();

    const [inputs, setInputs] = useState({
        username: null,
        password: null,
        confirmPassword: null
    });
    const [errors, setErrors] = useState({
        usernameError: null,
        passwordError: null,
        confirmPasswordError: null
    });

    const registering = useSelector(state => state.signup.registering);
    const [isFormValid, setIsFormValid] = useState(false)
    const dispatch = useDispatch();
    useEffect(() => {
        appLogger('inputs->', inputs);
        let usernameError;
        let passwordError;
        let confirmPasswordError;
        let validation = false
        if (inputs.username !== null) {
            if (inputs.username === '') {
                usernameError = t("Username required")
            }
        }
        if (inputs.password !== null) {
            if (inputs.password === '') {
                passwordError = t("Password required")
            }
        }
        if (inputs.confirmPassword !== null) {
            if (inputs.confirmPassword === '') {
                confirmPasswordError = t("Confirm password required")
            }
            if (inputs.confirmPassword !== inputs.password) {
                confirmPasswordError = t("Password missmatch")
            }
        }
        if (!usernameError && !passwordError && !confirmPasswordError && inputs.username && inputs.password && inputs.confirmPassword) {
            validation = true;
        }
        setIsFormValid(validation)
        setErrors({ usernameError, passwordError, confirmPasswordError })
    }, [inputs, t]);


    function handleChange(e) {
        const { name, value } = e.target;
        setInputs(inputs => ({ ...inputs, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(signupActions.register(inputs.username, inputs.password));
    }
    return (
        <Grid container justify="center" className={classes.container}>
            <Grid item xs={12} sm={6}  >
                <Paper className={classes.paper}>

                    <Typography component="h1" variant="h5">
                        {t("Sign Up")}
                    </Typography>
                    <form className={classes.form} noValidate>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    margin="dense"
                                    required
                                    fullWidth
                                    id="username"
                                    label={t("Username")}
                                    name="username"
                                    autoComplete="username"
                                    autoFocus
                                    disabled={registering}
                                    error={!!errors.usernameError}
                                    helperText={errors.usernameError}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    margin="dense"
                                    required
                                    fullWidth
                                    name="password"
                                    label={t("Password")}
                                    disabled={registering}
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    onChange={handleChange}
                                    error={!!errors.passwordError}
                                    helperText={errors.passwordError}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    margin="dense"
                                    required
                                    fullWidth
                                    name="confirmPassword"
                                    label={t("Confirm password")}
                                    disabled={registering}
                                    type="password"
                                    id="confirmPassword"
                                    autoComplete="current-password"
                                    onChange={handleChange}
                                    error={!!errors.confirmPasswordError}
                                    helperText={errors.confirmPasswordError}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            disabled={(!isFormValid) || registering}
                            className={classes.submit}
                            onClick={handleSubmit}
                        >

                            {registering && <CircularProgress className={classes.spinner} thickness={5} size={15} />}
                            <Typography>
                                {t("Sign Up")}
                            </Typography>
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link className={classes.link} to="/login" variant="body2">
                                    {t("Already have an account? Sign in")}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default Signup;