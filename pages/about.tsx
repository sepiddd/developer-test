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
                  About Me
                </Typography>
                <Typography variant="body1" component="p" gutterBottom>
                  Charles Duchemin is the editor of an internationally known restaurant guide, for which he still personally performs numerous restaurant tests using an assortment of elaborate disguises to escape detection by the restaurant owners. After being appointed to the Académie française, Duchemin decides to retire as a restaurant critic and trains his son Gérard to continue the family business. However, unbeknownst to Charles, Gérard is more interested in his true passion—working as a clown in a small circus which he has co-founded and supports financially. 
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
