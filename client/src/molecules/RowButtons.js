import React from 'react';
import { ListItemSecondaryAction, IconButton } from '@material-ui/core';

function RowButtons(props) {

    const { icons } = props;

    console.log(icons)
    console.log(icons[0].action);
    
    return <ListItemSecondaryAction>

        {icons.map((data,i) => (
            <IconButton key={i} edge="end" aria-label="edit" onClick={data.action}>
               {data.icon}
            </IconButton>

        ))}
    </ListItemSecondaryAction>
}

export default RowButtons;