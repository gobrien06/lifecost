import React, {Component}  from 'react';
import {Grid, TextField, Typography, Button, CardContent} from '@material-ui/core';
import './Salary.css';
import axios from 'axios';
import {motion} from 'framer-motion';

export default class Salary extends Component{
  constructor(){
    super();
    this.state={
      job:'No data found',
      senior:'No data found',
      junior:'No data found',
      average:'No data found',
      animate:'hidden',
      loading:false,
    }
  }

  componentWillReceiveProps(newProps){
    if(this.props.city !== newProps.city){
      this.setState({
        animate:'hidden',
      })
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
    if(this.props.city==="Where do you want to go?"){
      this.setState({
        animate:'hidden',
      })
    }
    const url = '/'+this.props.city+'/' + this.props.career + '/all/';
    axios.get('http://localhost:80'+ url)
    .then((response)=>{
      this.setState({
        loading:false,
        job:response.data.job,
        senior:response.data.senior_salary,
        junior:response.data.entry_salary,
        average:response.data.mid_salary,
      })
    },
    (error)=>{
      console.log(error);
    }
    )
  }

  handleChange=(e)=>{
    e.preventDefault();
    this.setState({
      animate:"visible",
    });
    (async () => {
      await this.props.changeCareer(e.target.value);
      this.getJob();
    })();

  }

  //need to change
  handleClick=(e)=>{
    window.scrollTo(0,this.refs.costs);
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

      if(this.props.city === 'Just say where to go.'){
        return(
          <div className="salary">
          <Typography variant="h2" color="primary" align="center">
          Any job, anywhere.
          </Typography>
          <br/>
          <br/>
          <Grid container justify="center">
          <CardContent className="entry" justify="middle">
          <Grid container justify="center">
          <TextField id="filled-basic" InputProps={{style:{color:"#FFF"}}} InputLabelProps={{ style: { color: '#fff' },}}  label="Enter Job" variant="filled" className="enterfield" onKeyDown={this.handleKeyPress}/>
          </Grid>
          </CardContent>
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
           <p>Any job, anywhere.</p>
          </Typography>
          <br/>
          <br/>
          <Grid container justify="center">
          <CardContent className="entry" justify="middle">
          <Grid container justify="center">
          <TextField id="filled-basic" InputProps={{style:{color:"#FFF"}}} InputLabelProps={{ style: { color: '#fff' },}}  label="Enter Job" variant="filled" className="enterfield" onKeyDown={this.handleKeyPress}/>
          </Grid>
          </CardContent>
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
          Job Title:{'\t'}{this.state.job}
          </motion.li>
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
