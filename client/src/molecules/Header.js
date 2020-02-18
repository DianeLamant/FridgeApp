import React from 'react';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import ArrowIcon from '@material-ui/icons/ArrowBack';

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      height: '56px'
    },
    navBar: {
        backgroundColor: 'deepskyblue'
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      fontWeight: 'bold'
    },
    icon: {
        color: 'inherit'
    }
  }));

function Header(props) {

    const classes = useStyles();
    const { title, icon, path, goBack } = props;

    return  <div className={classes.root} >
        
        <AppBar position="fixed" className={classes.navBar}>
            <Toolbar>
                {goBack &&
                    <Link to={goBack} className={classes.icon}>
                        <IconButton 
                            edge="start" 
                            className={classes.menuButton} 
                            color="inherit" 
                            aria-label="menu"
                            >
                            <ArrowIcon />
                        </IconButton>
                    </Link>
                }
                <Typography 
                    variant="h6" 
                    className={classes.title}
                    >
                {title}
                </Typography>
                <div>
                    {icon &&
                    <Link to={path} className={classes.icon}>
                        <IconButton
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            color="inherit"
                            >
                            {icon}
                        </IconButton>
                    </Link>
                    }
                
                </div>
            </Toolbar>
        </AppBar>
    </div>    
    
}

export default Header;