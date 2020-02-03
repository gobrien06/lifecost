import React, {Fragment, Component} from 'react';
import './App.css';
import About from './web/components/About/About';
import TopBar from './web/components/TopBar/TopBar';
import Salary from './web/components/Salary/Salary';
import CostCalculator from './web/components/CostCalculator/CostCalculator';
import MakeIt from './web/components/MakeIt/MakeIt';


class App extends Component {
  constructor(){
    super();
    this.state={
      city:'Just say where to go.',
      career:'default career',
    }
  }


  handleChange=(newCity)=>{
    console.log("inside parent handlechange with: " + newCity);
    this.setState({
      city: newCity,
    })
  }

   handleCareer=(newCareer)=>{
    console.log("inside parent handleCAREER with: " + newCareer);
      (async () => {
        await this.setState({
          career:newCareer,
          });
        console.log("career from inside the parent" + this.state.career);
      })();
  }

  render(){
    const styles={
      width:'15%',
      margin:'auto',
    }

    return (
      <Fragment>
      <TopBar />
      <About />
      <br/>
      <hr style={styles}/>
      <CostCalculator changeProp={this.handleChange} city = {this.state.city} />
      <hr style={styles}/>
      <Salary city = {this.state.city} changeCareer={(newcar)=>this.handleCareer(newcar)} career={this.state.career}/>
      <hr style={styles}/>
      <MakeIt city={this.state.city} career={this.state.career}/>
      </Fragment>
    );
  }
}


export default App;
