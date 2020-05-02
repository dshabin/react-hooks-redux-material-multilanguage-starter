import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../_actions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useTranslation } from "react-i18next";
import { Paper } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding : theme.spacing(2)
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
  }
}));

function Login() {
  const classes = useStyles();
  const [errors, setErrors] = useState({
    usernameError: null,
    passwordError: null,
  });
  const [inputs, setInputs] = useState({
    username: null,
    password: null
  });
  const { t } = useTranslation();
  const [isFormValid, setIsFormValid] = useState(false)
  const loggingIn = useSelector(state => state.authentication.loggingIn);
  const dispatch = useDispatch();
  useEffect(() => {
    let usernameError;
    let passwordError;
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
    if (!usernameError && !passwordError && inputs.username && inputs.password) {
      validation = true;
    }
    setIsFormValid(validation)
    setErrors({ usernameError, passwordError })
  }, [inputs, t]);

  function handleChange(e) {
    const { name, value } = e.target;
    setInputs(inputs => ({ ...inputs, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(userActions.login(inputs.username, inputs.password));

  }
  return (
    <Grid container justify="center">
      <Grid item xs={12} sm={6}  >
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h5">
            {t("Sign In")}
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
                  disabled={loggingIn}
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
                  disabled={loggingIn}
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={handleChange}
                  error={!!errors.passwordError}
                  helperText={errors.passwordError}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={(!isFormValid) || loggingIn}
              className={classes.submit}
              onClick={handleSubmit}
            >

              {loggingIn && <CircularProgress className={classes.spinner} thickness={5} size={15} />}
              <Typography>
                {t("Sign In")}

              </Typography>
            </Button>
            <Grid container>
              <Grid item>
                <Link style={{ textDecoration: 'none' }} to="/signup" variant="body2">
                  {t("Don't have an account? Sign Up")}
                </Link>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>
    </Grid>

  )
}

export default Login;