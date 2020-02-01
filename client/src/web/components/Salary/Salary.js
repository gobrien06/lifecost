import React, {Component}  from 'react';
import {Grid, TextField, Typography} from '@material-ui/core';
import './Salary.css';
import axios from 'axios';

export default class Salary extends Component{
  constructor(){
    super();
    this.state={
      career:'Enter your career',
      senior:'',
      junior:'',
      average:'',
    }
  }

  handleKeyPress=(e)=>{
    if (e.key === 'Enter'){
      this.handleChange(e);
      console.log("pressed");
    }
  }

  getJob(){
    const url = this.state.career + '/careers/';
    axios.get(process.env.REACT_APP_BASE_URL + url)
    .then((response)=>{
      this.setState({
        senior:response.data[0],
        junior:response.data[1],
        average:response.data[2],
      })
    },
    (error)=>{
      console.log(error);
    }
    )
  }

  handleChange=(e)=>{
    e.preventDefault();
    console.log(e.target.value);
    this.setState({
      career: e.target.value,
    });
    this.getJob();
  }


  render(){
      return(
        <div>
        <Typography variant="h5" color="white">
        Do your job well.
        </Typography>
        <Grid container justify="center">
        <TextField id="filled-basic"   InputProps={{style:{color:"#FFF"}}} InputLabelProps={{ style: { color: '#fff' },}}  label="Enter Job" variant="filled" className="enterfield" onKeyDown={this.handleKeyPress}/>
        </Grid>
        </div>
      )
  }
}
