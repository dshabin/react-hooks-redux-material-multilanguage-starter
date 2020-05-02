import React, { useEffect } from 'react';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { languageSelectActions } from '../../_actions';


const useStyles = makeStyles((theme) => ({
    formControl: {
        minWidth: 80,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

function LanguageSelect(props) {
    const classes = useStyles();
    const [state, setState] = React.useState({
        language: 'en',
    });


    const handleChange = (event) => {
        setState({
            language: event.target.value,
        });
    };
    const dispach = useDispatch()
    useEffect(() => {
        dispach(languageSelectActions.changeLanguage(state.language))
    }, [state, dispach]);

    return (
        <FormControl className={classes.formControl}>
            <Select
            className={classes.select}
                margin="dense"
                onChange={handleChange}
                defaultValue={'en'}
                native
            >
                <option value={'en'}>English</option>
                <option value={'fa'}>فارسی</option>
            </Select>
        </FormControl>
    );
}


export default LanguageSelect;