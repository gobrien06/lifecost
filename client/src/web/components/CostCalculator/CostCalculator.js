import React, {Component} from 'react';
import NearbyCity from './NearbyCity/NearbyCity';
import {Grid} from '@material-ui/core';
import Bills from './Bills/Bills';
import './CostCalculator.css';
import axios from 'axios';

class CostCalculator extends Component{
  constructor(){
    super();
    this.state={
      city:'Enter Your City',
      rent:'',
      nearbyCities:['Get started above'],
    }
    this.updateCity = this.updateCity.bind(this);
  }

  componentDidMount(){
    this.getNearby();
  }

  getNearby(){
    const url = '/cities/'+this.state.city;
    axios.get(process.env.REACT_APP_BASE_URL + url)
    .then((response)=>{
      for(let i=0;i<3;i++){
        this.setState({
          nearbyCities: this.state.nearbyCities.concat(response.data[i]),
        })
      }
    },
    (error)=>{
      console.log(error);
    }
    )
  }

  updateCity(newCity){
    this.setState({
      city:newCity,
    })
    this.getNearby();
  }

  render(){
    return(
      <Grid container className="costs">
        <Grid item xs={4} >
        <NearbyCity nearbyCities={this.state.nearbyCities} update={this.updateCity}/>
        </Grid>
        <Grid item xs />
        <Grid item xs={7}>
        <Bills city={this.state.city} rent={this.state.rent} tax={this.state.tax}/>
        </Grid>
      </Grid>
    )
  }
}

export default CostCalculator;
