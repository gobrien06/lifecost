import React from 'react';
import {Grid, Typography} from '@material-ui/core';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import './MakeIt.css';

function MakeIt(){
  return(
    <Grid container className="about" position="relative">
      <Grid item xs={8}>
        <Typography variant="h2" color="primary">
        Don't break it, make it.
        </Typography>
        <MonetizationOnIcon fontSize="large" className="rotating" color="primary"/>
      </Grid>
      <Grid item xs={4}>
      <Typography variant="h4" className="right">
        See your salary before you get the job.
      </Typography>
      </Grid>
    </Grid>
  )
}

export default MakeIt;
