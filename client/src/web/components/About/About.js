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
        <Grid item xs={8}>
        <Typography variant="h2" color="primary"> What we do. </Typography>
            <ul>We make moving easy.
              <li> -  Find out your estimated expenses</li>
              <li> -  Discover your potential salaries</li>
              <li> -  See what real residents think</li>
            </ul>
        </Grid>

        <Grid item xs={4}>
        <Particles
          params={{
            "particles": {
            "number": {
                "value": 400,
                "density": {
                    "enable": true,
                    "value_area": 1803.4120608655228
                }
            },
            "color": {
                "value": "#ffffff"
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 20,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 4
                },
                "image": {
                    "src": "img/github.svg",
                    "width": 200,
                    "height": 200
                }
            },
            "opacity": {
                "value": 0.4008530152163807,
                "random": false,
                "anim": {
                    "enable": false,
                    "speed": 2,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 1.5,
                "random": true,
                "anim": {
                    "enable": false,
                    "speed": 80,
                    "size_min": 0.5,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 0,
                "color": "#ffffff",
                "opacity": 0.3687847739990702,
                "width": 0.6413648243462091
            },
            "move": {
                "enable": true,
                "speed": 20,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
              }
        },
        "retina_detect": true
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
