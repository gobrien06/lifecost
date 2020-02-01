import React from 'react';
import theme from './web/materialTheme';
import { MuiThemeProvider } from '@material-ui/core/styles';
import './App.css';
import About from './web/components/About/About';
import Salary from './web/components/Salary/Salary';
import TopBar from './web/components/TopBar/TopBar';
import CostCalculator from './web/components/CostCalculator/CostCalculator';
import MakeIt from './web/components/MakeIt/MakeIt';
import Opinion from './web/components/Opinion/Opinion';


function App() {
  return (
    <MuiThemeProvider theme={theme}>
    <TopBar />
    <CostCalculator/>
    <About />
    <Salary />
    <MakeIt />
    <Opinion />
    </MuiThemeProvider>
  );
}


export default App;
