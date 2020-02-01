import React, {Fragment} from 'react';
import './App.css';
import About from './web/components/About/About';
import Salary from './web/components/Salary/Salary';
import TopBar from './web/components/TopBar/TopBar';
import CostCalculator from './web/components/CostCalculator/CostCalculator';
import MakeIt from './web/components/MakeIt/MakeIt';
import Opinion from './web/components/Opinion/Opinion';


function App() {
  const styles={
    width:'30%',
    margin:'auto',
  }
  return (
    <Fragment>
    <TopBar />
    <CostCalculator/>
    <hr style={styles}/>
    <About />
    <Salary />
    <hr style={styles}/>
    <MakeIt />
    <Opinion />
    </Fragment>
  );
}


export default App;
