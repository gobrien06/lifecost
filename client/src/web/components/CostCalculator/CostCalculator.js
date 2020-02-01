import React, {Component} from 'react';
import {TextField, Card,  CardContent, Typography} from '@material-ui/core';
import './Bills/Bills.css';
import {motion} from 'framer-motion';
import './CostCalculator.css';
import axios from 'axios';

class CostCalculator extends Component{
  constructor(){
    super();
    this.state={
      city:'Enter Your City',
      rent:'',
      tax:'',
    }
  }

  getData(){
    const url = '/'+this.state.city+'/all/';
    axios.get(process.env.REACT_APP_BASE_URL + url)
    .then((response)=>{
      this.setState({
        tax: response.data[this.state.city].tax,
        rent:response.data[this.state.city].rent,
      })
    },
    (error)=>{
      console.log(error);
      this.setState({
        tax: 'No data found',
        rent: 'No data found',
      })
    }
    )
  }

    handleKeyPress=(e)=>{
    if (e.key === 'Enter') {
      this.handleChange(e);
      console.log("pressed");
      this.getData();
    }
    }

    handleChange = (e) => {
      e.preventDefault();
      console.log(e.target.value);
      this.setState({
        city:e.target.value,
      });
    };


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

    const styles = {
      color:'#2F2F2F',
     borderColor:'#2F2F2F',
    }


    return(
    <motion.ul
    className="container"
    variants={container}
    initial="hidden"
    animate="visible"
    >
    <Card className="costs">
    <CardContent>
    <Typography variant="h4" color="primary">
  {this.state.city}
    </Typography>
    <br/>
    <CardContent className="entry">
    <TextField id="filled-basic"   InputProps={{style:{color:"#FFF"}}} InputLabelProps={{ style: { color: '#fff' },}}  label="Enter City" variant="filled" className="enterfield" onKeyDown={this.handleKeyPress}/>
    </CardContent>
    <br/>
    <motion.li variants={item}>
    <Typography variant="h5">
    Rent:{'\t\t\t\t'}
    {this.state.rent}
    </Typography>

    </motion.li>
    <motion.li variants={item}>
    <Typography variant="h5">
    Sales Tax:{'\t\t\t\t'}
    {this.state.tax}
    </Typography>
    </motion.li>
  <motion.li variants={item}>
  <Typography variant="h5">
    Income Tax:
  </Typography>
  </motion.li>
  <hr style={styles}/>
  </CardContent>
    </Card>
    </motion.ul>
  )
  }
}

export default CostCalculator;
