import React from "react";
import TimeData from "../components/Timeline/index";
// import { makeStyles } from "@material-ui/core/styles";
// import { Grid, Paper } from "@material-ui/core";
// import PieChart from "../components/PieChart/PieChart";

// const useStyles = makeStyles((theme) => ({
//   grid: {
//     width: '100%',
//     margin: '0px'
//   },
//   paper: {
//     padding: theme.spacing(2),
//     textAlign: 'center',
//     color: '#ffffff',
//     background: '#444444',
//     fontFamily: 'Rubik',
//     fontWeight: '500',
//     fontSize: '1.5rem',
//     letterSpacing: '1.5px',
//     padding: '2rem'
//   }
// }));

export default function Home() {
  // const classes = useStyles();

  return (
    <main>
      <TimeData />
    </main>
  );
}
{/* <Grid container spacing={6} className={classes.grid}>
        <Grid item xs={6} md={6} lg={4}>
          <Paper className={classes.paper}>This is for the timer aspect of the Zombie Parent App.</Paper>
        </Grid>
        <Grid item xs={6} md={6} lg={4}>
          <Paper className={classes.paper}>Number of naps taken today.</Paper>
        </Grid>
        <Grid item xs={6} md={6} lg={4}>
          <Paper className={classes.paper}>Circle Chart showing a percentage of all actions done that day.
          <PieChart />
          </Paper>
        </Grid>
        <Grid item xs={6} md={6} lg={12}>
          <Paper className={classes.paper}>Visual representation of the day.</Paper>
        </Grid>
      </Grid> */}