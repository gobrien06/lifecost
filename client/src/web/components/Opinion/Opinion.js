import React, {Component} from 'react';
import {Grid, Typography, Popper} from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import './Opinion.css';
import axios from 'axios';


class Opinion extends Component{
  constructor(props){
    super(props);
    this.state={
      opinion:"favorable",
      open:false,
      anchor:'',
    }
  }

  componentDidMount(){
    this.getOpinion();
  }

  getOpinion(){
    const url = '/'+this.props.city+'/' + '/'+this.state.career +'/' + '/all/';
    axios.get('http://localhost:3001' + url)
    .then((response)=>{
      this.setState({
        opinion:response.opinion,
      })
    },
    (error)=>{
      console.log(error);
    }
    )
  }

  handleClick=(e)=>{
    e.preventDefault();
    this.setState({
      open:!this.state.open,
      anchor:e.currentTarget,
    })
  }

  render(){
    const styles={
      color:'#3f51b5',
      padding : '0',
      margin : '0',
    }

    return(
      <Grid container className="opinion">
      <Grid item xs={4}>
      <Typography variant = "h2">
      Overall Opinion: <p style={styles}>{this.state.opinion}  <InfoIcon color="primary" className="info" fontSize="large" onClick={this.handleClick}/></p>
      </Typography>
      <Popper open={this.state.open} anchorEl={this.state.anchor}  className="pop" transition>
      <b>How did we get this conclusion?</b>{'\t'}<br/>
      By looking through recent local Twitter data, we are able to capture the sentiment of users talking about the city from their vocabulary.
      </Popper>
      </Grid>
      <Grid item xs={8} justify="right"  >

      </Grid>
      </Grid>
    )
  }
}
/*
<PieChart width={1300} height={400}>
    <Pie data={data01} dataKey="value" nameKey="approve" cx="50%" cy="50%" outerRadius={140} fill="#8884d8" />
    <Pie data={data02} dataKey="value" nameKey="disapprove" cx="50%" cy="50%" innerRadius={120} outerRadius={140} fill="#82ca9d" label />
    </PieChart>
    */
export default Opinion;
