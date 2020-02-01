import React, {Component} from 'react';
import {List, ListItem, ListItemText, TextField, Grow} from '@material-ui/core';
import './NearbyCity.css';

export default class  NearbyCity extends Component{
  constructor(){
    super();
    this.state={
      checked:false,
    }
  }

  componentDidMount(){
    this.handleCheck();
  }

  handleCheck = () => {
    this.setState({
      checked: !this.state.checked,
    });
  };

  handleKeyPress=(e)=>{
      if (e.key === 'Enter') {
        this.handleChange(e);
        console.log("pressed");
      }
  }

  handleChange = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    this.props.update(e.target.value);
  };

  render(){
    return(
      <Grow in={this.state.checked}>
      <List className="nearby"
      aria-labelledby="nested-list-subheader">
        <ListItem>
          <TextField id="filled-basic" label="Enter City" variant="filled" onKeyPress={this.handleKeyPress} />
        </ListItem>
        <ListItem divider>
          <ListItemText primary={this.props.nearbyCities[0]} />
        </ListItem>
        <ListItem  divider>
        <ListItemText primary={this.props.nearbyCities[1]} />
        </ListItem>
        <ListItem  divider>
        <ListItemText primary={this.props.nearbyCities[2]} />
        </ListItem>
        <ListItem>
        <ListItemText primary={this.props.nearbyCities[3]} />
        </ListItem>
      </List>
      </Grow>
    )
  }
}

/*
     <Button variant="contained" color="primary" type="submit" onSubmit={this.handleChange}>
        Submit
        </Button>
        */
