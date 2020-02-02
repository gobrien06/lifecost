import React, {Component}  from 'react';
import {Grid, TextField, Typography, Button} from '@material-ui/core';
import './Salary.css';
import axios from 'axios';
import {motion} from 'framer-motion';

export default class Salary extends Component{
  constructor(){
    super();
    this.state={
      career:'Enter your career',
      senior:'No data found',
      junior:'No data found',
      average:'No data found',
      animate:'hidden',
      loading:false,
    }
  }

  handleKeyPress=(e)=>{
    this.setState({
      animate:'hidden',
    })
    if (e.key === 'Enter'){
      this.handleChange(e);
    }
  }

  getJob(){
    const url = '/'+this.props.city+'/' + '/'+this.state.career +'/' + '/all/';
    axios.get('http://localhost:3001'+ url)
    .then((response)=>{
      this.setState({
        loading:false,
        senior:response.senior_salary,
        junior:response.junior_salary,
        average:response.mid_salary,
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
      animate:"visible",
    });
    this.getJob();
  }

  handleClick=(e)=>{
    window.scrollTo({top: 0, behavior: 'smooth' });
  }


  render(){
      const container = {
        hidden: { opacity: 1, scale: 0 },
        visible: {
          opacity: 1,
          scale: 1,
          transition: {
            delay: 0.3,
            when: "beforeChildren",
            staggerChildren: 0.1
          }
        }
      };

      const item = {
        hidden: { y: 20, opacity: 0 },
        visible: {
          y: 0,
          opacity: 1
        }
      };

      if(this.props.city === 'Where do you want to go?'){
        return(
          <div className="salary">
          <Typography variant="h2" color="primary" align="center">
          Anyjob, anywhere.
          </Typography>
          <br/>
          <br/>
          <Grid container justify="center">
          <TextField id="filled-basic" InputProps={{style:{color:"#FFF"}}} InputLabelProps={{ style: { color: '#fff' },}}  label="Enter Job" variant="filled" className="enterfield" onKeyDown={this.handleKeyPress}/>
          </Grid>
          <Grid container justify="center" className="bottom">
          <Button variant="contained" color="primary" className="bot" onClick={this.handleClick}>
          Enter City
          </Button>
          </Grid>
          </div>
        )
      }
      else{
        return(
          <div className="salary">
          <Typography variant="h2" color="primary" align="center">
          Any job, anywhere.
          </Typography>
          <br/>
          <br/>
          <Grid container justify="center">
          <TextField id="filled-basic" InputProps={{style:{color:"#FFF"}}} InputLabelProps={{ style: { color: '#fff' },}}  label="Enter Job" variant="filled" className="enterfield" onKeyDown={this.handleKeyPress}/>
          </Grid>
          <Grid container justify="center" className="bottom">
          <br/><br/><br/><br/>
          <motion.ul
          className="container"
          variants={container}
          initial="hidden"
          animate={this.state.animate}
          >
          <Typography variant="h4">
          <motion.li
          variants={item}
          >
          Junior:{'\t'}{this.state.junior}
          </motion.li>
          <motion.li
          variants={item}
          >
          Mid:{'\t'}{this.state.average}
          </motion.li>
          <motion.li
          variants={item}
          >
          Senior:{'\t'}{this.state.senior}
          </motion.li>
          </Typography>
          </motion.ul>
          </Grid>

          </div>
        )
      }
  }
}
