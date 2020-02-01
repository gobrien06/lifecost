import React, {Component}  from 'react';
import {Box, TextField, List, ListItem, Typography} from '@material-ui/core';
import './Salary.css';
import axios from 'axios';


export default class Salary extends Component{
  constructor(){
    super();
    this.state={
      career:'Enter your career',
      senior:'...',
      junior:'...',
      average:'...',
    }
  }

  handleKeyPress=(e)=>{
    if (e.key === 'Enter'){
      this.handleChange(e);
      console.log("pressed");
    }
  }

  getJob(){
    const url = '/careers/'+this.state.career;
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
      <Box className="salary">
      <TextField id="filled-basic" label="I am a:" variant="filled" onKeyPress={this.handleKeyPress}/>
      <List className="light">
      <ListItem className="salaryHold">
      <Typography variant="h4">
      Junior
      </Typography>
      <div className="salaryval">
      {this.state.junior}
      </div>
      </ListItem>
      <ListItem  className="salaryHold">
      <Typography variant="h4">
      Average
      </Typography>
      <div className="salaryval">
      {this.state.average}
      </div>
      </ListItem>
      <ListItem  className="salaryHold">
      <Typography variant="h4">
      Senior
      </Typography>
      <div className="salaryval">
      {this.state.senior}
      </div>
      </ListItem>
      </List>
      </Box>
    )
  }
}
