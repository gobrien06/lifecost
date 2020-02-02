import React, {Fragment, useState} from 'react';
import './App.css';
import About from './web/components/About/About';
import TopBar from './web/components/TopBar/TopBar';
import Salary from './web/components/Salary/Salary';
import CostCalculator from './web/components/CostCalculator/CostCalculator';
import MakeIt from './web/components/MakeIt/MakeIt';


function App() {
  const [city, setCity] = useState('Where do you want to go?');

  const styles={
    width:'15%',
    margin:'auto',
  }


  function handleChange(newCity){
    console.log("inside parent handlechange with: " + newCity);
    setCity(newCity);
  }

  return (
    <Fragment>
    <TopBar />
    <CostCalculator changeProp={handleChange} city = {city}/>
    <br/>
    <hr style={styles}/>
    <About />
    <hr style={styles}/>
    <Salary city = {city}/>
    <hr style={styles}/>
    <MakeIt city={city}/>
    </Fragment>
  );
}


export default App;
