import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Copyright from '../src/Copyright';
import { Card, CardContent } from '@material-ui/core';
import Navigation from '../src/Navigation';

export default function Index() {
  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Grid
          container
          direction="column"
          justify="flex-start"
          alignItems="stretch"
          spacing={2}
        >
          <Grid item>
            <Typography variant="h4" component="h1" align="center" gutterBottom>
              ⭐ Duchemin Guide ⭐
            </Typography>
          </Grid>
          <Grid item>
            <Navigation />
          </Grid>
          <Grid item>
            <Card>
              <CardContent>
                <Typography variant="body2" color="secondary" gutterBottom>
                  Main
                </Typography>
                <Typography variant="body1" component="h1" gutterBottom>
                  Welcome to my Guide de Duchemin. Please check out my reviews.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item>
            <Copyright />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
