import React from 'react';
import {Grid, Typography, Box} from '@material-ui/core';
import './MakeIt.css';
import PieChart from './PieChart/PieChart';

function MakeIt(props){
  return(
    <Grid container className="makeit" >
      <Grid item xs={8} lassName="chart" >
        <Typography variant="h2" color="primary">
        Rise to the top.
        </Typography>
        <br/>
        <br/>
        <PieChart city={props.city} career={props.career}/>
      </Grid>
      <Grid item xs={4}>
      <Box height={300}/>
      <Typography variant="h4" className="right">
        See the distrubution of jobs amongst senior, junior, and mid-level positions.
      </Typography>
      </Grid>
    </Grid>
  )
}

export default MakeIt;
