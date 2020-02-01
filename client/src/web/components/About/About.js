import React, { useRef } from 'react';
import {Canvas, useFrame} from 'react-three-fiber';
import {Grid, Typography} from '@material-ui/core';
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
  <coneBufferGeometry attach="geometry" args={[2,5.5,5]} />
  <meshStandardMaterial attach="material" color={'#3f51b5'} />
  </mesh>
  )

}


function About(){
    return(
      <Grid container className="about">
        <Grid item xs={6}>
        <Typography variant="h2" color="primary"> What we do. </Typography>
            <ul>We make moving easy.
              <li> -  Find out your estimated cost of living</li>
              <li> -  Discover your monthly payments</li>
              <li> -  See what real residents think</li>
            </ul>
        </Grid>

        <Grid item xs={6}>
          <Canvas className = "treeCanvas">
          <ambientLight />
          <pointLight position={[15, 10, 5]} />
          <Cone position={[0,1,0]}/>
          <Base position={[0,-2,0]}/>
          </Canvas>
        </Grid>

      </Grid>
    )
}

export default About;
