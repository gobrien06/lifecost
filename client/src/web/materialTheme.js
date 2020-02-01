import { createMuiTheme } from '@material-ui/core/styles';
import brown from '@material-ui/core/colors/brown';
import green from '@material-ui/core/colors/green';

const theme = createMuiTheme({
  palette: {
    text: {
      primary: "#ffffff",
      secondary: "#00000",
  },
    primary: green,
    secondary: brown,
  },
  status: {
    danger: 'orange',
  },
  typography:{
    primary:green,
  },
});

export default theme;
