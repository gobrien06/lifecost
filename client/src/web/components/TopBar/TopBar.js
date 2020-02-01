import React from 'react';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import './TopBar.css';

function click(){
  window.scrollTo({top: 0, behavior: 'smooth' });
  console.log("zoom");
}

function TopBar(){
  return(
    <AppBar position="sticky" className="topbar" title="LifeCost">
    <Typography variant="h4">
    LifeCost
    <KeyboardArrowUpIcon className="icon" fontSize='large' onClick={click}/>
    </Typography>
    </AppBar>
  )
}


export default TopBar;
