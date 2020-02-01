import React, {useState} from 'react';
import {Grid, Typography} from '@material-ui/core';
import './Opinion.css';


function Opinion(){
  const opinion = useState("Favorable");
  const styles={
    color:'#3f51b5',
    padding : '0',
    margin : '0',
  }
  return(
    <Grid container className="opinion">
    <Grid item xs={4}>
    <Typography variant = "h2">
    Overall Opinion: <p style={styles}>{opinion}</p>
    </Typography>
    </Grid>
    <Grid item xs={8}>

    </Grid>
    </Grid>
  )


}
/*
<PieChart width={1300} height={400}>
    <Pie data={data01} dataKey="value" nameKey="approve" cx="50%" cy="50%" outerRadius={140} fill="#8884d8" />
    <Pie data={data02} dataKey="value" nameKey="disapprove" cx="50%" cy="50%" innerRadius={120} outerRadius={140} fill="#82ca9d" label />
    </PieChart>
    */
export default Opinion;
