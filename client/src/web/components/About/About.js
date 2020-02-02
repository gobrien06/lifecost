import React, { useRef } from 'react';
import {Canvas, useFrame} from 'react-three-fiber';
import {Grid, Typography} from '@material-ui/core';
import Particles from 'react-particles-js';
import './About.css';

const Base = (props) => {
  const mesh = useRef()
  useFrame(() => (mesh.current.rotation.y += 0.01));
  return (
    <mesh
      {...props}
      ref={mesh}>
      <boxBufferGeometry attach="geometry" args={[.7, 2, .7]} />
      <meshStandardMaterial attach="material" color={'#674A45'} />
    </mesh>
  )
}

const Cone = (props) => {
  const mesh = useRef()
  useFrame(() => (mesh.current.rotation.y += 0.01))

  return(
  <mesh
  {...props}
  ref={mesh}>
  <coneBufferGeometry attach="geometry" args={[2,4.5,5]} />
  <meshStandardMaterial attach="material" color={'#3f51b5'} />
  </mesh>
  )

}


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
