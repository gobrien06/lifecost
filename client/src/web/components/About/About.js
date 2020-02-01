import React, {useState, useRef} from 'react';
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
  const [hovered, setHover] = useState(false)
  useFrame(() => (mesh.current.rotation.y += 0.01))

  return(
  <mesh
  {...props}
  ref={mesh}
  onPointerOver={e => setHover(true)}
  onPointerOut={e => setHover(false)}>
  <coneBufferGeometry attach="geometry" args={[2,5.5,5]} />
  <meshStandardMaterial attach="material" color={hovered ? '#CBFB65' : 'green'} />
  </mesh>
  )

}


function About(){
    return(
      <Grid container className="about">
        <Grid item xs={7}>
        <Typography variant="h2" color="primary"> What we do. </Typography>
        <Typography variant="h4">
            <ul>We make moving easy.
              <li> Find out your estimated cost of living</li>
              <li> Discover your monthly payments</li>
              <li> See what real residents think</li>
            </ul>
            </Typography>
        </Grid>

        <Grid item xs={5}>
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
