import React from 'react';
import {Grid, Typography, Box} from '@material-ui/core';
import './MakeIt.css';
import PieChart from './PieChart/PieChart';

function MakeIt(){
  return(
    <Grid container className="makeit" position="relative">
      <Grid item xs={8}>
        <Typography variant="h2" color="primary">
        Don't break it, make it.
        </Typography>
      </Grid>
      <Grid item xs={4}>
      <Box height={250}/>
      <Typography variant="h4" className="right">
        See your salary before you get the job.
      </Typography>
      </Grid>
    </Grid>
  )
}

export default MakeIt;
