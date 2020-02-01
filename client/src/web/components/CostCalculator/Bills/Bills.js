import React, {Component} from 'react';
import {TextField, Card, CardHeader, CardContent, CardMedia, ListItem, Typography} from '@material-ui/core';
import './Bills.css';
import {motion} from 'framer-motion';


function Bills(){
  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };



  return(
    <motion.ul
    className="container"
    variants={container}
    initial="hidden"
    animate="visible"
    >
    <TextField id="filled-basic" label="Enter City" variant="filled"/>
    <Card className="nearby">

    <CardContent>
    <motion.li variants={item}>
    <Typography variant="h5">
    Rent:
    </Typography>
    </motion.li>
    <motion.li variants={item}>
    <Typography variant="h5">
    Sales Tax:
    </Typography>
    </motion.li>
  <motion.li variants={item}>
  <Typography variant="h5">
    Income Tax:
  </Typography>
  </motion.li>
  </CardContent>
    </Card>
    </motion.ul>
  );

}

export default Bills;
