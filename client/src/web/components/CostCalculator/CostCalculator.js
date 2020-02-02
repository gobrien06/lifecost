import React, {Component} from 'react';
import {TextField, Card,  CardContent, Typography, CircularProgress, Grid} from '@material-ui/core';
import './Bills/Bills.css';
import {motion} from 'framer-motion';
import './CostCalculator.css';
import axios from 'axios';

class CostCalculator extends Component{
  constructor(props){
    super(props);
    this.state={
      rent:'',
      tax:'',
      animate:'hidden',
      loading:false,
    }
  }

  getData(){
    console.log("Getting data with" + this.props.city);
    const url = '/'+this.props.city+'/all/';
    axios.get('http://localhost:3001'+ url)
    .then((response)=>{
      this.setState({
        loading:false,
        tax: response.sales_tax,
        rent:response.cost,
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
      this.setState({
        animate:'hidden',
      })
    if (e.key === 'Enter') {
      this.handleChange(e);
      console.log("pressed");
    }
    }

    handleChange = (e) => {
      e.preventDefault();
      console.log(e.target.value);
      console.log("props"+this.props.city);
      this.setState({
        animate:"visible",
      });
      (async () => {
        await this.props.changeProp(e.target.value);
        this.getData()
      })();
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


    const paraStyles={
      margin:'0',
      padding:'0',
      fontWeight:'300',
    }

    if(this.state.loading) return <CircularProgress color="primary"/>
    return(
    <div>
    <Grid container justify="center">
    <motion.ul
    className="ccontainer"
    variants={container}
    initial="hidden"
    animate="visible"
    justify="center"
    >
    <Card className="costs">
    <CardContent>
    <Typography variant="h3" color="primary">
    <p style={paraStyles}>
    {this.props.city}
    </p>
    </Typography>
    <br/>
    <CardContent className="entry">
    <TextField id="filled-basic"   InputProps={{style:{color:"#FFF"}}} InputLabelProps={{ style: { color: '#fff' },}}  label="Enter City" variant="filled" className="enterfield" onKeyDown={this.handleKeyPress}/>
    </CardContent>
    <br/>
    <motion.li variants={item}
    animate={this.state.animate}>
    <Typography variant="h5">
    Rent:{'\t\t\t\t'}
    {this.state.rent}
    </Typography>

    </motion.li>
    <motion.li variants={item}
    animate={this.state.animate}>
    <Typography variant="h5">
    Sales Tax:{'\t\t\t\t'}
    {this.state.tax}
    </Typography>
    </motion.li>
  </CardContent>
    </Card>

    <Typography variant="h3" className="bot">
    We scrape the web so you don't have to.
    </Typography>
    </motion.ul>

    </Grid>
    </div>
  )
  }
}

export default CostCalculator;
