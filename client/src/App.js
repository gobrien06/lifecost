import React, {Fragment, useState} from 'react';
import './App.css';
import About from './web/components/About/About';
import TopBar from './web/components/TopBar/TopBar';
import Salary from './web/components/Salary/Salary';
import CostCalculator from './web/components/CostCalculator/CostCalculator';
import MakeIt from './web/components/MakeIt/MakeIt';
import Opinion from './web/components/Opinion/Opinion';


function App() {
  const [city, setCity] = useState('Where do you want to go?');

  const styles={
    width:'15%',
    margin:'auto',
  }

  return (
    <Fragment>
    <TopBar />
    <CostCalculator change={setCity} city = {city}/>
    <br/>
    <hr style={styles}/>
    <About />
    <hr style={styles}/>
    <Salary city = {city}/>
    <hr style={styles}/>
    <MakeIt />
    </Fragment>
  );
}


export default App;
