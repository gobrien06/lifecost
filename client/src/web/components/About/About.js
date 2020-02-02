import React from 'react';
import {Grid, Typography} from '@material-ui/core';
import Particles from 'react-particles-js';
import './About.css';



function About(){
    return(
      <Grid container className="about">
        <Grid item xs={7}>
        <Typography variant="h2" color="primary"> What we do. </Typography>
            <ul>We make moving easy.
              <li> -  Find out your estimated expenses</li>
              <li> -  Discover your potential salaries</li>
              <li> -  See what real residents think</li>
            </ul>
        </Grid>

        <Grid item xs={5}>
        <Particles
          params={{
              "particles": {
                  "number": {
                      "value": 35
                  },
                  "size": {
                      "value": 5
                  }
              },
              "interactivity": {
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "repulse"
                    }
                  }
                }

    }} />
              }
            }
          }
          }/>
        </Grid>

      </Grid>
    )
}

export default About;
