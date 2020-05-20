import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LanguageSelect from '../LanguageSelect/LanguageSelect';
import { Box, Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding : theme.spacing(2)
    }
}));

function Footer(props) {
    const classes = useStyles()
    return (
        <Box className={classes.paper}>
            <Grid container>
                <Grid item xs={12}>
                    <LanguageSelect />
                </Grid>
            </Grid>
        </Box>
    );
}


export default Footer;