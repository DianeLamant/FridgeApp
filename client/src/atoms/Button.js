import React from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    button: {
      margin: theme.spacing(1),
      fontSize: '1rem',
      fontWeight: 'bold'
    },
}));

function SendButton(props) {

    const { value, handleSubmit } = props;

    const classes = useStyles();


    return <Button 
        variant="contained" 
        color="primary" 
        size='large' 
        className={classes.button}
        onClick={handleSubmit}
        >
    {value}
    </Button>

}

export default SendButton;