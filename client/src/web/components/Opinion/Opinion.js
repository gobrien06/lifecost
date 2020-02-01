import React, {useState} from 'react';
import {Grid, Typography} from '@material-ui/core';
import {PieChart, Pie} from 'recharts';
import Particles from 'react-particles-js';

import './Opinion.css';


function Opinion(){
  const opinion = useState("Unfavorable");

  const data01 = [
    { name: 'Group A', value: 400 }, { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 }, { name: 'Group D', value: 200 },
  ];
  const data02 = [
    { name: 'A1', value: 100 },
    { name: 'A2', value: 300 },
    { name: 'B1', value: 100 },
    { name: 'B2', value: 80 },
    { name: 'B3', value: 40 },
    { name: 'B4', value: 30 },
    { name: 'B5', value: 50 },
    { name: 'C1', value: 100 },
    { name: 'C2', value: 200 },
    { name: 'D1', value: 150 },
    { name: 'D2', value: 50 },
  ];

  return(
    <Grid container className="opinion">
    <Grid item xs={4}>
    <Typography variant = "h2">
    Overall Opinion: {opinion}
    </Typography>

    </Grid>
    <Grid item xs={8}>
    <PieChart width={1300} height={400} className="">
    <Pie data={data01} dataKey="value" nameKey="approve" cx="50%" cy="50%" outerRadius={140} fill="#8884d8" />
    <Pie data={data02} dataKey="value" nameKey="disapprove" cx="50%" cy="50%" innerRadius={120} outerRadius={140} fill="#82ca9d" label />
    </PieChart>
    </Grid>

    </Grid>
  )


}

export default Opinion;
