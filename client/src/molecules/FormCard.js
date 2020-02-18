import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActionArea, CardContent, Typography } from '@material-ui/core';

const useStyles = makeStyles({
    card: {
        width: '90%',
        maxWidth: '300px',
        margin: '2em auto',
    },
});

function FormCard(props) {
    
    const classes = useStyles();
    const { text, handleClick } = props;

    return <Card className={classes.card}>
        <CardActionArea onClick={handleClick}>
            <CardContent>
                <Typography>{text}</Typography>
            </CardContent>
        </CardActionArea>
    </Card>
}

export default FormCard;