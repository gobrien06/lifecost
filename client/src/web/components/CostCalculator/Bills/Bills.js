import React, {Component} from 'react';
import {Grow, List, ListItem, Typography} from '@material-ui/core';
import './Bills.css';

export default class Bills extends Component{
constructor(props){
  super(props)
  this.state={
    checked:false,
  }
}

componentDidMount(){
  this.handleChange();
}

handleChange = () => {
  this.setState({
    checked: !this.state.checked,
  });
};

render(){
  return(
    <Grow in={this.state.checked}>
    <List className="nearby">
    <ListItem divider>
          <Typography variant="h3">
          {this.props.city}
          </Typography>
      </ListItem>
    <ListItem divider>
      <Typography variant="h5">
      One Room Rent:
      </Typography>
    </ListItem>
    <ListItem>
    <Typography variant="h5">
    Sales Tax:
    </Typography>
  </ListItem>
    </List>
    </Grow>
  );
}

}
